import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";
import "../styles/problemDetails.css";


function ProblemDetails() {

    const { slug } = useParams();

    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchProblem = async () => {

            try {

                setError("");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/problems/${slug}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Problem not found."
                    );
                }

                setProblem(data);

            } catch (error) {

                console.error(error);
                setError(error.message);

            } finally {

                setLoading(false);

            }

        };


        fetchProblem();

    }, [slug]);


    if (loading) {
        return (
            <div className="problem-loading">
                Loading problem...
            </div>
        );
    }


    if (error || !problem) {
        return (
            <div className="problem-loading">
                {error || "Problem not found."}
            </div>
        );
    }


    return (

        <main className="problem-details-page">

            <section className="problem-details-header">

                <span className="problem-details-tag">
                    NOTEBOOK CHALLENGE
                </span>

                <h1>
                    {problem.title}
                </h1>

                <div className="problem-details-meta">

                    <span
                        className={
                            `difficulty-badge ${
                                problem.difficulty?.toLowerCase()
                            }`
                        }
                    >
                        {problem.difficulty}
                    </span>

                    {problem.original_filename && (
                        <span>
                            {problem.original_filename}
                        </span>
                    )}

                </div>

                {problem.short_description && (
                    <p>
                        {problem.short_description}
                    </p>
                )}

            </section>


            <section className="problem-notebook">

                <ReactMarkdown

                    remarkPlugins={[
                        remarkMath
                    ]}

                    rehypePlugins={[
                        rehypeKatex
                    ]}

                    components={{

                        code({
                            inline,
                            className,
                            children,
                            ...props
                        }) {

                            const match =
                                /language-(\w+)/.exec(
                                    className || ""
                                );

                            if (!inline && match) {

                                return (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                    >
                                        {
                                            String(children)
                                                .replace(
                                                    /\n$/,
                                                    ""
                                                )
                                        }
                                    </SyntaxHighlighter>
                                );

                            }

                            return (
                                <code
                                    className={className}
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }

                    }}
                >

                    {problem.content || ""}

                </ReactMarkdown>

            </section>


            <footer className="problem-details-footer">

                <span>
                    CREATED BY
                </span>

                <strong>
                    {problem.author?.username || "Unknown"}
                </strong>

            </footer>

        </main>

    );
}


export default ProblemDetails;