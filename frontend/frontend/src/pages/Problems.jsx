import { useEffect, useMemo, useState } from "react";

import ProblemCard from "../components/ProblemCard";
import ProblemUpload from "../components/ProblemUpload";

import { useAuth } from "../AuthContext";

import "../styles/problems.css";


function Problems() {

    const { user, token } = useAuth();

    const [problems, setProblems] = useState([]);

    const [difficulty, setDifficulty] =
        useState("All");

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    const loadProblems = async () => {

        try {

            setError("");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/problems`
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Could not load problems."
                );

            }

            setProblems(data);

        } catch (error) {

            console.error(error);
            setError(error.message);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadProblems();

    }, []);


    const handleDelete = async (problem) => {

        const confirmed = window.confirm(
            `Delete "${problem.title}"?`
        );

        if (!confirmed) {
            return;
        }


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/problems/${problem.slug}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Could not delete problem."
                );

                return;

            }


            await loadProblems();

        } catch (error) {

            console.error(error);

            alert(
                "Could not connect to the server."
            );

        }

    };


    const filteredProblems = useMemo(() => {

        return problems.filter((problem) => {

            const matchesDifficulty =
                difficulty === "All" ||
                problem.difficulty === difficulty;


            const query = search
                .trim()
                .toLowerCase();


            const matchesSearch =
                !query ||
                problem.title
                    ?.toLowerCase()
                    .includes(query) ||
                problem.short_description
                    ?.toLowerCase()
                    .includes(query);


            return (
                matchesDifficulty &&
                matchesSearch
            );

        });

    }, [
        problems,
        difficulty,
        search
    ]);


    const easyCount = problems.filter(
        (problem) =>
            problem.difficulty === "Easy"
    ).length;


    const mediumCount = problems.filter(
        (problem) =>
            problem.difficulty === "Medium"
    ).length;


    const hardCount = problems.filter(
        (problem) =>
            problem.difficulty === "Hard"
    ).length;


    return (

        <main className="problems-page">

            <section className="problems-hero">

                <div className="problems-hero-content">

                    <span className="problems-eyebrow">
                        04 / PROBLEM DATABASE
                    </span>

                    <h1>
                        Solve <span>AI.</span>
                    </h1>

                    <p>
                        Practice machine learning,
                        algorithms and artificial
                        intelligence through curated
                        notebook challenges.
                    </p>


                    <div className="problems-hero-stats">

                        <div className="hero-stat total">
                            <strong>{problems.length}</strong>
                            <span>TOTAL</span>
                        </div>

                        <div className="hero-stat easy">
                            <strong>{easyCount}</strong>
                            <span>EASY</span>
                        </div>

                        <div className="hero-stat medium">
                            <strong>{mediumCount}</strong>
                            <span>MEDIUM</span>
                        </div>

                        <div className="hero-stat hard">
                            <strong>{hardCount}</strong>
                            <span>HARD</span>
                        </div>

                    </div>

                    

                </div>


                <div
                    className="problems-graphic"
                    aria-hidden="true"
                >

                    <span className="graphic-label">
                        MODEL / DECISION SPACE
                    </span>

                    <div className="problem-orbit orbit-one" />
                    <div className="problem-orbit orbit-two" />
                    <div className="problem-orbit orbit-three" />

                    <div className="problem-core">
                        f(x)
                    </div>

                    <span className="problem-node node-data">
                        DATA
                    </span>

                    <span className="problem-node node-model">
                        MODEL
                    </span>

                    <span className="problem-node node-loss">
                        LOSS
                    </span>

                    <span className="problem-node node-score">
                        SCORE
                    </span>

                </div>

            </section>


            {user?.role === "admin" && (

                <ProblemUpload
                    onUploaded={loadProblems}
                />

            )}


            <section className="problems-database">

                <div className="problems-database-header">

                    <div>

                        <span className="database-index">
                            01 / CHALLENGES
                        </span>

                        <h2>
                            Problem database
                        </h2>

                    </div>


                    <span className="database-count">
                        {filteredProblems.length}
                        {" "}
                        RESULTS
                    </span>

                </div>


                <div className="problems-toolbar">

                    <div className="difficulty-filters">

                        {[
                            "All",
                            "Easy",
                            "Medium",
                            "Hard"
                        ].map((level) => (

                            <button
                                key={level}
                                type="button"
                                className={
                                    difficulty === level
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setDifficulty(level)
                                }
                            >
                                {level}
                            </button>

                        ))}

                    </div>


                    <div className="problem-search">

                        <span>
                            /
                        </span>

                        <input
                            type="text"
                            value={search}
                            placeholder="SEARCH PROBLEMS"
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                </div>


                {loading && (

                    <div className="problems-state">
                        Loading problems...
                    </div>

                )}


                {!loading && error && (

                    <div className="problems-state error">
                        {error}
                    </div>

                )}


                {!loading &&
                    !error &&
                    filteredProblems.length === 0 && (

                    <div className="problems-state">
                        No problems found.
                    </div>

                )}


                {!loading &&
                    !error &&
                    filteredProblems.length > 0 && (

                    <div className="problems-grid">

                        {filteredProblems.map(
                            (problem, index) => (

                                <ProblemCard
                                    key={problem.id}
                                    problem={problem}
                                    index={index}
                                    isAdmin={
                                        user?.role ===
                                        "admin"
                                    }
                                    onDelete={
                                        handleDelete
                                    }
                                />

                            )
                        )}

                    </div>

                )}

            </section>

        </main>

    );

}


export default Problems;