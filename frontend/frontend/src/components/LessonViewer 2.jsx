import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

function LessonViewer({ lesson }) {

    if (!lesson) {
        return (
            <div className="lesson-empty">
                <span>LEARNING / SELECT LESSON</span>

                <h2>Select a lesson.</h2>

                <p>
                    Choose a lesson from the sidebar to start learning.
                </p>
            </div>
        );
    }


    return (
        <article className="lesson-viewer">

            <div className="lesson-viewer-header">

                <span>
                    {lesson.category}
                </span>

                <h1>
                    {lesson.title}
                </h1>

            </div>


            <div className="lesson-markdown">

                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code({ className, children, ...props }) {

                            const match = /language-(\w+)/.exec(
                                className || ""
                            );

                            if (match) {
                                return (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                            margin: "28px 0",
                                            borderRadius: "12px",
                                            padding: "22px",
                                            fontSize: "13px",
                                            lineHeight: "1.65",
                                            background: "#0d0f16",
                                            border:
                                                "1px solid rgba(118, 103, 255, 0.18)"
                                        }}
                                    >
                                        {String(children).replace(/\n$/, "")}
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
                    {lesson.content}
                </ReactMarkdown>

            </div>

        </article>
    );
}


export default LessonViewer;