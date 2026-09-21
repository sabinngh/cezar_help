import { Link } from "react-router-dom";


function ProblemCard({
    problem,
    index,
    isAdmin,
    onDelete
}) {

    const difficultyClass =
        problem.difficulty
            ?.toLowerCase() || "easy";


    return (

        <article className="problem-card">

            <div className="problem-card-line" />


            <div className="problem-card-header">

                <span className="problem-number">
                    {String(index + 1).padStart(2, "0")}
                </span>


                <span
                    className={
                        `problem-difficulty ${difficultyClass}`
                    }
                >
                    <i />

                    {problem.difficulty}
                </span>

            </div>


            <div className="problem-card-body">

                <span className="problem-type">
                    NOTEBOOK CHALLENGE
                </span>


                <h3>
                    {problem.title}
                </h3>


                <p>
                    {problem.short_description}
                </p>

            </div>


            <div className="problem-card-footer">

                <div className="problem-author">

                    <span>
                        CREATED BY
                    </span>

                    <strong>
                        {
                            problem.author?.username ||
                            "savaML"
                        }
                    </strong>

                </div>


                <div className="problem-card-actions">

                    {isAdmin && (

                        <button
                            className="problem-delete"
                            onClick={() =>
                                onDelete(problem)
                            }
                            title="Delete problem"
                        >
                            ×
                        </button>

                    )}


                    <Link
                        to={`/problems/${problem.slug}`}
                        className="problem-open"
                    >
                        OPEN
                        <span>→</span>
                    </Link>

                </div>

            </div>

        </article>

    );
}


export default ProblemCard;