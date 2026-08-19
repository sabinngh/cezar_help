import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

import { useEffect, useState } from "react";

import ProblemCard from "../components/ProblemCard";

import "../styles/problems.css";

function Problems() {

    const [problems, setProblems] = useState([]);

    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    console.log(user)

    useEffect(() => {

        const fetchProblems = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5001/api/problems"
                );

                const data = await response.json();

                if (response.ok) {

                    setProblems(data);

                }

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        };

        fetchProblems();

    }, []);

    if (loading) {

        return <h2>Loading problems...</h2>;

    }

    return (

        <div className="problems-header">

            <div>

             <div className="problems-title">

                    <h1>Problems</h1>

                    <div className="problems-grid">

                        {problems.map((problem) => (

                            <ProblemCard

                                key={problem.id}

                                problem={problem}

                            />

                        ))}

                    </div>

                </div>

                {user?.role === "admin" && (

                    <div className="admin-actions">

                        <Link
                            to="/problems/new"
                            className="add-problem-btn"
                        >
                            + Add Problem
                        </Link>

                    </div>

                )}

            </div>

        </div>
    );

}

export default Problems;