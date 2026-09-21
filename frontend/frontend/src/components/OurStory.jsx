import { useEffect, useRef, useState } from "react";
import "../styles/our-story.css";


function OurStory() {
    const [mousePosition, setMousePosition] = useState({
        x: 50,
        y: 50
    });

    const [storyVisible, setStoryVisible] = useState(false);

    const storyRef = useRef(null);


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


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setStoryVisible(entry.isIntersecting);
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -10% 0px"
            }
        );

        const currentStory = storyRef.current;

        if (currentStory) {
            observer.observe(currentStory);
        }

        return () => {
            if (currentStory) {
                observer.unobserve(currentStory);
            }

            observer.disconnect();
        };
    }, []);


    return (
        <section
            id="story"
            ref={storyRef}
            className={`our-story ${
                storyVisible ? "story-visible" : ""
            }`}
        >

            {/* =====================================================
                SLIDING TICKER
            ===================================================== */}

            <div className="story-ticker-wrapper">

                <div className="story-ticker">

                    <div className="story-ticker-track">

                        <div className="story-ticker-group">

                            <span>SAVA.PY</span>
                            <i>✦</i>

                            <span>LEARN AI</span>
                            <i>✦</i>

                            <span>BUILD MODELS</span>
                            <i>✦</i>

                            <span>EXPLORE ML</span>
                            <i>✦</i>

                            <span>SOLVE PROBLEMS</span>
                            <i>✦</i>

                        </div>


                        <div
                            className="story-ticker-group"
                            aria-hidden="true"
                        >

                            <span>SAVA.PY</span>
                            <i>✦</i>

                            <span>LEARN AI</span>
                            <i>✦</i>

                            <span>BUILD MODELS</span>
                            <i>✦</i>

                            <span>EXPLORE ML</span>
                            <i>✦</i>

                            <span>SOLVE PROBLEMS</span>
                            <i>✦</i>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
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


                        <h3>
                            Theory meets <span>reality.</span>
                        </h3>


                        <p>
                            Our platform provides an interactive ecosystem where
                            students tackle real-world AI challenges, analyze
                            datasets and submit solutions for automated
                            evaluation.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    NODE 04
                ================================================= */}

                <div id="goals" className="story-node">

                    <div className="node-point">
                        <span>04</span>
                    </div>


                    <div className="story-card">

                        <span className="story-label">
                            RESEARCH
                        </span>


                        <h3>
                            Explore the <span>unknown.</span>
                        </h3>


                        <p>
                            We provide curated resources covering computer
                            vision, neural networks and advanced AI topics,
                            encouraging students to explore research and
                            innovation.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    NODE 05
                ================================================= */}

                <div id="future" className="story-node">

                    <div className="node-point final">
                        <span>05</span>
                    </div>


                    <div className="story-card final-card">

                        <span className="story-label">
                            THE FUTURE
                        </span>


                        <h3>
                            Ready for <span>the challenge.</span>
                        </h3>


                        <p>
                            Our long-term objective is to prepare students to
                            excel in national AI competitions such as ROAI and
                            ONIA while developing a passion for research and
                            innovation.
                        </p>


                        <div className="competition-tags">

                            <span>ROAI</span>
                            <span>ONIA</span>
                            <span>AI</span>
                            <span>ML</span>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}


export default OurStory;