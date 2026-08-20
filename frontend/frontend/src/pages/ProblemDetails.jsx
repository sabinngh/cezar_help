import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "../styles/problemDetails.css";

function ProblemDetails() {

    const { slug } = useParams();

    const [problem, setProblem] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProblem = async () => {

            try {

                const response = await fetch(

                    `http://localhost:5001/api/problems/${slug}`

                );

                const data = await response.json();

                if (response.ok) {

                    setProblem(data);

                }

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        };

        fetchProblem();

    }, [slug]);

    if (loading) {

        return (

            <div className="problem-loading">

                Loading...

            </div>

        );

    }

    if (!problem) {

        return (

            <div className="problem-loading">

                Problem not found.

            </div>

        );

    }

    return (

        <div className="problem-page">

            <div className="problem-container">

                <h1 className="problem-title">

                    {problem.title}

                </h1>

                <div className="problem-meta">

                    <span
                        className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}
                    >

                        {problem.difficulty}

                    </span>

                </div>

                {problem.short_description && (

                    <p className="problem-short-description">

                        {problem.short_description}

                    </p>

                )}

                {problem.image_url && (

                    <img

                        src={problem.image_url}

                        alt={problem.title}

                        className="problem-image"

                    />

                )}

                <Section

                    title="Problem Statement"

                    content={problem.statement}

                />

                <Section

                    title="Input"

                    content={problem.input_description}

                />

                <Section

                    title="Output"

                    content={problem.output_description}

                />

                <Section

                    title="Constraints"

                    content={problem.constraints}

                />

                <Section

                    title="Examples"

                    content={problem.examples}

                />

                <Section

                    title="Evaluation"

                    content={problem.evaluation}

                />

                <Section

                    title="Hints"

                    content={problem.hints}

                />

                {problem.resource_link && (

                    <div className="problem-section">

                        <h2>

                            🔗 Additional Resource

                        </h2>

                        <a

                            href={problem.resource_link}

                            target="_blank"

                            rel="noreferrer"

                            className="problem-link"

                        >

                            Open Resource

                        </a>

                    </div>

                )}

                <div className="problem-footer">

                    Created by

                    <strong>

                        {" "}
                        {problem.author?.username || "Unknown"}

                    </strong>

                </div>

            </div>

        </div>

    );

}

function Section({ title, content }) {

    if (!content || content.trim() === "") {

        return null;

    }

    return (

        <div className="problem-section">

            <h2>

                {title}

            </h2>

            <p>

                {content}

            </p>

        </div>

    );

}

export default ProblemDetails;