import { useEffect, useState } from "react";

import { useAuth } from "../AuthContext";

import ProblemForm from "../components/ProblemForm";
import ProblemsTable from "../components/ProblemsTable";

import ConfirmModal from "../components/ConfirmModal";

import "../styles/adminDashboard.css";

function AdminDashboard() {

    const { token, user } = useAuth();

    const [problems, setProblems] = useState([]);

    const [search, setSearch] = useState("");

    const [difficultyFilter, setDifficultyFilter] = useState("All");

    const [sortBy, setSortBy] = useState("Newest");

    const [currentPage, setCurrentPage] = useState(1);

    const problemsPerPage = 10;

    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [editingProblem, setEditingProblem] = useState(null);

    const [deleteProblem, setDeleteProblem] = useState(null);

    const fetchProblems = async () => {

        try {

            const response = await fetch(

                "http://localhost:5001/api/problems",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            const data = await response.json();

            if(response.ok){

                setProblems(data);

            }

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProblems();

    }, []);

    const handleCreate = () => {

        setEditingProblem(null);

        setShowForm(true);

    };

    const handleEdit = (problem) => {

        setEditingProblem(problem);

        setShowForm(true);

    };

    const handleDelete = async () => {

        if(!deleteProblem){

            return;

        }

        const response = await fetch(

            `http://localhost:5001/api/problems/${deleteProblem.slug}`,

            {

                method:"DELETE",

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        if(response.ok){

            fetchProblems();

        }

        setDeleteProblem(null);

    };

    const handleSuccess = () => {

        setShowForm(false);

        setEditingProblem(null);

        fetchProblems();

    };

    useEffect(() => {

        setCurrentPage(1);

    }, [search, difficultyFilter, sortBy]);

    if(user?.role !== "admin"){

        return(

            <div className="admin-page">

                <h1>

                    Access denied.

                </h1>

            </div>

        );

    }

    const filteredProblems = [...problems]

    .filter(problem => {

        const matchesSearch =

            problem.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesDifficulty =

            difficultyFilter === "All"

            ||

            problem.difficulty === difficultyFilter;

        return matchesSearch && matchesDifficulty;

    })

    .sort((a,b)=>{

        switch(sortBy){

            case "Newest":

                return new Date(b.created_at) - new Date(a.created_at);

            case "Oldest":

                return new Date(a.created_at) - new Date(b.created_at);

            case "A-Z":

                return a.title.localeCompare(b.title);

            case "Difficulty":{

                const order={

                    Easy:1,

                    Medium:2,

                    Hard:3

                };

                return order[a.difficulty]-order[b.difficulty];

            }

            default:

                return 0;

        }

    });

    const totalPages = Math.ceil(

        filteredProblems.length / problemsPerPage

    );

    const startIndex =

        (currentPage - 1) * problemsPerPage;

    const currentProblems =

        filteredProblems.slice(

            startIndex,

            startIndex + problemsPerPage

        );

    return(

        <div className="admin-page">

            <div className="admin-container">

                <div className="admin-header">

                    <div>

                        <h1>

                            Admin Dashboard

                        </h1>

                        <p>

                            Manage all platform problems.

                        </p>

                    </div>

                        <button
                            onClick={() => {
                                setEditingProblem(null);
                                setShowForm(true);
                            }}
                        >
                            + New Problem
                        </button>

                </div>

                <div className="dashboard-toolbar">

                    <input

                        type="text"

                        placeholder="Search problems..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                    <select

                        value={difficultyFilter}

                        onChange={(e)=>setDifficultyFilter(e.target.value)}

                    >

                        <option>All</option>

                        <option>Easy</option>

                        <option>Medium</option>

                        <option>Hard</option>

                    </select>

                    <select

                        value={sortBy}

                        onChange={(e)=>setSortBy(e.target.value)}

                    >

                        <option>Newest</option>

                        <option>Oldest</option>

                        <option>A-Z</option>

                        <option>Difficulty</option>

                    </select>

                </div>



                {showForm && (

                    <div className="modal-overlay">

                        <div className="modal-content">

                            <ProblemForm

                                onSuccess={(problem) => {

                                    setProblems(prev => [

                                        problem,

                                        ...prev

                                    ]);

                                    setShowForm(false);

                                }}

                                onCancel={() => {

                                    setShowForm(false);

                                }}

                            />

                        </div>

                    </div>

                )}

                {deleteProblem && (

                    <ConfirmModal

                        title="Delete problem?"

                        message={`Are you sure you want to delete "${deleteProblem.title}"? This action cannot be undone.`}

                        onCancel={() => setDeleteProblem(null)}

                        onConfirm={handleDelete}

                    />

                )}


                {!loading && (

                    <>

                    <ProblemsTable

                        problems={currentProblems}

                        onEdit={(problem) => {
                            setEditingProblem(problem);
                            setShowForm(true);
                        }}

                        onDelete={(problem)=>setDeleteProblem(problem)}

                    />

                    {totalPages > 1 && (

                        <div className="pagination">

                            <button

                                disabled={currentPage === 1}

                                onClick={() =>

                                    setCurrentPage(p => p - 1)

                                }

                            >

                                ← Previous

                            </button>

                            {Array.from(

                                { length: totalPages },

                                (_, i) => (

                                    <button

                                        key={i}

                                        className={

                                            currentPage === i + 1

                                                ? "active"

                                                : ""

                                        }

                                        onClick={() =>

                                            setCurrentPage(i + 1)

                                        }

                                    >

                                        {i + 1}

                                    </button>

                                )

                            )}

                            <button

                                disabled={

                                    currentPage === totalPages

                                }

                                onClick={() =>

                                    setCurrentPage(p => p + 1)

                                }

                            >

                                Next →

                            </button>

                        </div>

                    )}

                    </>

                )}

            </div>

        </div>

    );

}

export default AdminDashboard;