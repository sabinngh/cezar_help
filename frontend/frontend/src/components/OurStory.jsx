import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/our-story.css";

function NeuralNetworkVisual() {
    return (
        <div className="how-visual neural-visual" aria-hidden="true">
            <div className="neural-lines">
                <span className="neural-line nl-1"></span>
                <span className="neural-line nl-2"></span>
                <span className="neural-line nl-3"></span>
                <span className="neural-line nl-4"></span>
                <span className="neural-line nl-5"></span>
                <span className="neural-line nl-6"></span>
            </div>

            <div className="neural-column neural-column-left">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="neural-column neural-column-middle">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="neural-column neural-column-right">
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

function ScatterVisual() {
    return (
        <div className="how-visual scatter-visual" aria-hidden="true">
            <div className="scatter-axis scatter-axis-x"></div>
            <div className="scatter-axis scatter-axis-y"></div>

            <span className="scatter-point point-1"></span>
            <span className="scatter-point point-2"></span>
            <span className="scatter-point point-3"></span>
            <span className="scatter-point point-4"></span>
            <span className="scatter-point point-5"></span>
            <span className="scatter-point point-6"></span>
            <span className="scatter-point point-7"></span>
            <span className="scatter-point point-8"></span>
            <span className="scatter-point point-9"></span>
            <span className="scatter-point point-10"></span>
            <span className="scatter-point point-11"></span>
            <span className="scatter-point point-12"></span>

            <svg
                className="scatter-curve"
                viewBox="0 0 260 130"
                preserveAspectRatio="none"
            >
                <path
                    d="M 12 102
                       C 45 88, 55 48, 92 58
                       C 125 68, 133 112, 168 83
                       C 196 60, 204 30, 248 24"
                />
            </svg>
        </div>
    );
}

function CompetitionVisual() {
    return (
        <div className="how-visual competition-visual" aria-hidden="true">
            <div className="ranking-header">
                <span>LIVE RANKING</span>
                <span className="ranking-status">● ACTIVE</span>
            </div>

            <div className="rank-row rank-row-1">
                <span className="rank-number">01</span>
                <div className="rank-bar">
                    <span></span>
                </div>
                <span className="rank-score">98</span>
            </div>

            <div className="rank-row rank-row-2">
                <span className="rank-number">02</span>
                <div className="rank-bar">
                    <span></span>
                </div>
                <span className="rank-score">91</span>
            </div>

            <div className="rank-row rank-row-3">
                <span className="rank-number">03</span>
                <div className="rank-bar">
                    <span></span>
                </div>
                <span className="rank-score">84</span>
            </div>
        </div>
    );
}

function OurStory() {
    const [storyVisible, setStoryVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({
        x: 50,
        y: 50
    });

    const storyRef = useRef(null);

    useEffect(() => {
        const currentStory = storyRef.current;

        if (!currentStory) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStoryVisible(true);
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        observer.observe(currentStory);

        return () => {
            observer.unobserve(currentStory);
            observer.disconnect();
        };
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x =
            ((e.clientX - rect.left) / rect.width) * 100;

        const y =
            ((e.clientY - rect.top) / rect.height) * 100;

        setMousePosition({
            x,
            y
        });
    };

    return (
        <section
            id="story"
            ref={storyRef}
            className={`our-story ${
                storyVisible ? "story-visible" : ""
            }`}
            onMouseMove={handleMouseMove}
            style={{
                "--mouse-x": `${mousePosition.x}%`,
                "--mouse-y": `${mousePosition.y}%`
            }}
        >
            {/* ==========================================
                PURPLE TRANSITION TICKER
            ========================================== */}

            

            {/* ==========================================
                BACKGROUND
            ========================================== */}

            <div className="how-grid" aria-hidden="true"></div>

            <div className="how-orb how-orb-one" aria-hidden="true"></div>
            <div className="how-orb how-orb-two" aria-hidden="true"></div>

            <span className="how-particle hp-1" aria-hidden="true"></span>
            <span className="how-particle hp-2" aria-hidden="true"></span>
            <span className="how-particle hp-3" aria-hidden="true"></span>
            <span className="how-particle hp-4" aria-hidden="true"></span>
            <span className="how-particle hp-5" aria-hidden="true"></span>

            {/* ==========================================
                INTRO
            ===================================================== */}

            <div
                className="story-intro"
                onMouseMove={handleMouseMove}
                style={{
                    "--mouse-x": `${mousePosition.x}%`,
                    "--mouse-y": `${mousePosition.y}%`
                }}
            >

                <div className="intro-grid"></div>


                <span className="section-tag">
                    01 / OUR STORY
                </span>


                <h2>
                    More than a club.
                    <span> A community.</span>
                </h2>


                <p>
                    Founded in September 2026, sava.py brings together students
                    passionate about data science, algorithms, and artificial
                    intelligence.
                </p>

            </div>


            {/* =====================================================
                TIMELINE
            ===================================================== */}

            <div className="story-timeline">


                {/* =================================================
                    NODE 01
                ================================================= */}

                <div id="practice" className="story-node">

                    <div className="node-point">
                        <span>01</span>
                    </div>


                    <div className="story-card">

                        <span className="story-label">
                            FOUNDATION
                        </span>


                        <h3>
                            Curiosity <span>drives us.</span>
                        </h3>


                        <p>
                            Our core mission is to cultivate curiosity and
                            enthusiasm for computer science, providing members
                            with an environment that fosters deep learning,
                            active collaboration, and intellectual growth.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    NODE 02
                ================================================= */}

                <div id="research" className="story-node">

                    <div className="node-point">
                        <span>02</span>
                    </div>


                    <div className="story-card">

                        <span className="story-label">
                            LEARNING
                        </span>


                        <h3>
                            Learn. <span>Build. Grow.</span>
                        </h3>


                        <p>
                            Through our weekly meetings, members explore
                            fundamental and advanced topics in machine learning
                            and algorithmic thinking, combining theoretical
                            concepts with practical applications.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    NODE 03
                ================================================= */}

                <div id="future" className="story-node">

                    <div className="node-point">
                        <span>03</span>
                    </div>


                    <div className="story-card">

                        <span className="story-label">
                            PRACTICE
                        </span>

            <div className="how-container">

                <header className="how-header">
                    <div className="how-eyebrow">
                        <span className="eyebrow-dot"></span>
                        <span>01 / HOW IT WORKS</span>
                    </div>

                    <h2>
                        From curiosity
                        <br />
                        to <span>capability.</span>
                    </h2>

                    <p>
                        Learn the concepts, turn them into working models,
                        then put your ideas to the test.
                    </p>
                </header>

                {/* ==========================================
                    CARDS
                ========================================== */}

                <div className="how-cards">

                    {/* LEARN */}
                    <article
                        id="practice"
                        className="how-card how-card-learn"
                    >
                        <div className="card-number">01</div>

                        <div className="card-topline">
                            <span className="card-symbol">◇</span>
                            <span className="card-status">
                                KNOWLEDGE
                            </span>
                        </div>

                        <NeuralNetworkVisual />

                        <div className="card-copy">
                            <Link
                                to="/learning"
                                className="card-label card-label-link"
                            >
                                LEARN
                                <span className="card-link-arrow">↗</span>
                            </Link>

                            <h3>
                                Understand
                                <br />
                                <span>the theory.</span>
                            </h3>

                            <p>
                                Explore machine learning, algorithms,
                                neural networks and the ideas behind
                                intelligent systems.
                            </p>
                        </div>

                        <div className="card-footer">
                            <span>01</span>
                            <span>FOUNDATIONS</span>
                        </div>
                    </article>

                    {/* BUILD */}
                    <article
                        id="research"
                        className="how-card how-card-build"
                    >
                        <div className="card-number">02</div>

                        <div className="card-topline">
                            <span className="card-symbol mint">✦</span>
                            <span className="card-status">
                                EXPERIMENT
                            </span>
                        </div>

                        <ScatterVisual />

                        <div className="card-copy">
                            <Link
                                to="/problems"
                                className="card-label card-label-link mint-text"
                            >
                                BUILD
                                <span className="card-link-arrow">↗</span>
                            </Link>

                            <h3>
                                Turn ideas
                                <br />
                                <span className="mint-text">
                                    into models.
                                </span>
                            </h3>

                            <p>
                                Work with datasets, experiment with
                                solutions and transform concepts into
                                practical machine learning projects.
                            </p>
                        </div>

                        <div className="card-footer">
                            <span>02</span>
                            <span>EXPERIMENTATION</span>
                        </div>
                    </article>

                    {/* COMPETE */}
                    <article
                        id="future"
                        className="how-card how-card-compete"
                    >
                        <div className="card-number">03</div>

                        <div className="card-topline">
                            <span className="card-symbol">↗</span>
                            <span className="card-status">
                                CHALLENGE
                            </span>
                        </div>

                        <CompetitionVisual />

                        <div className="card-copy">
                            <span className="card-label">
                                COMPETE
                            </span>

                            <h3>
                                Test your
                                <br />
                                <span>skills.</span>
                            </h3>

                            <p>
                                Solve real challenges, compare results
                                and prepare for competitions such as
                                ROAI and ONIA.
                            </p>
                        </div>

                        <div className="card-footer">
                            <span>03</span>
                            <span>PERFORMANCE</span>
                        </div>
                    </article>

                </div>

                {/* ==========================================
                    LOOP / PIPELINE
                ========================================== */}

                <div className="learning-loop">

                    <div className="loop-title">
                        <span>THE SAVA</span>
                        <strong>ML</strong>
                        <span>LOOP</span>
                    </div>

                    <div className="loop-track">
                        <div className="loop-line">
                            <span className="loop-signal"></span>
                        </div>

                        <div className="loop-step">
                            <span className="loop-dot"></span>
                            <strong>LEARN</strong>
                            <small>01</small>
                        </div>

                        <div className="loop-step">
                            <span className="loop-dot"></span>
                            <strong>BUILD</strong>
                            <small>02</small>
                        </div>

                        <div className="loop-step">
                            <span className="loop-dot"></span>
                            <strong>TEST</strong>
                            <small>03</small>
                        </div>

                        <div className="loop-step">
                            <span className="loop-dot"></span>
                            <strong>IMPROVE</strong>
                            <small>04</small>
                        </div>
                    </div>

                    <p>
                        Every experiment teaches you something new.
                        <span> Then you run it again.</span>
                    </p>

                </div>

            </div>
        </section>
    );
}

export default OurStory;