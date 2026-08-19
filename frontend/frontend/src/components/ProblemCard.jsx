import { Link } from "react-router-dom";

import "../styles/problemCard.css";

function ProblemCard({ problem }) {

    return (

        <div className="problem-card">

            <div className="problem-card-top">

                <span
                    className={`difficulty ${problem.difficulty.toLowerCase()}`}
                >
                    {problem.difficulty}
                </span>

            </div>

            <h2>

                {problem.title}

            </h2>

            <p className="problem-description">

                {(problem.short_description || "").length > 140

                    ? problem.short_description.substring(0, 140) + "..."

                    : problem.short_description}

            </p>

            <div className="problem-footer">

                <span>

                    by {problem.author?.username || "Unknown"}

                </span>

                <Link
                    to={`/problems/${problem.slug}`}
                    className="problem-open-btn"
                >

                    Open →

                </Link>

            </div>

        </div>

    );

}

export default ProblemCard;