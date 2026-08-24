import { useEffect, useRef, useState } from "react";
import "../styles/goals.css";

function Goals() {
    const sectionRef = useRef(null);
    const [transitionActive, setTransitionActive] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTransitionActive(true);
                }
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="goals"
            ref={sectionRef}
            className={`goals-section ${
                transitionActive ? "goals-transition-active" : ""
            }`}
        >
            <div className="goals-transition" aria-hidden="true">
                <div className="goals-transition-haze"></div>
                <div className="goals-scan-line"></div>

                <div className="goals-scan-data">
                    <span>01</span>
                    <span>AI / COMPETITION</span>
                    <span>02</span>
                </div>
            </div>

            <div className="goals-inner">

                <div className="goals-header">

                    <span className="goals-eyebrow">
                        <span className="goals-dot"></span>
                        02 / MAIN GOALS
                    </span>

                    <h2>
                        Learn with purpose.
                        <span> Compete with confidence.</span>
                    </h2>

                    <p>
                        savaML helps students build the knowledge,
                        problem-solving habits and practical experience
                        needed for Romania's main AI competitions.
                    </p>

                </div>


                <div className="goals-grid">

                    {/* =========================
                        ONIA
                    ========================= */}

                    <article className="goal-card goal-card-onia">

                        <span className="goal-index">
                            01
                        </span>

                        <div className="goal-icon">
                            ◇
                        </div>

                        <span className="goal-category">
                            NATIONAL OLYMPIAD
                        </span>

                        <h3>
                            ONIA
                        </h3>

                        <p>
                            The National Artificial Intelligence Olympiad
                            challenges students through algorithmic thinking,
                            machine learning concepts and applied AI tasks.
                        </p>

                        <a
                            className="goal-link"
                            href="https://olimpiada-ai.ro/ro"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit ONIA
                            <span>↗</span>
                        </a>

                        <div
                            className="goal-card-grid"
                            aria-hidden="true"
                        ></div>

                    </article>


                    {/* =========================
                        ROAI
                    ========================= */}

                    <article className="goal-card goal-card-roai">

                        <span className="goal-index">
                            02
                        </span>

                        <div className="goal-icon mint">
                            ✦
                        </div>

                        <span className="goal-category mint-text">
                            AI COMPETITION
                        </span>

                        <h3>
                            ROAI
                        </h3>

                        <p>
                            ROAI gives students the opportunity to solve
                            advanced artificial intelligence problems,
                            experiment with models and improve competitive
                            AI skills.
                        </p>

                        <a
                            className="goal-link goal-link-mint"
                            href="https://olimpiada.nitro-ai.org/ro/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit ROAI
                            <span>↗</span>
                        </a>

                        <div
                            className="goal-card-grid"
                            aria-hidden="true"
                        ></div>

                    </article>

                </div>

            </div>
        </section>
    );
}

export default Goals;