import "../styles/hero.css";

import { useState } from "react";

function Hero() {

    const [hovered, setHovered] = useState(false);

    return (
        
        <section id="hero" className="hero-container">

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="hero-grid"></div>

            <div className="hero-glow glow-one"></div>
            <div className="hero-glow glow-two"></div>
            <div className="hero-glow glow-three"></div>

            {/* Floating AI particles */}

            <div className="ai-node node-1"></div>
            <div className="ai-node node-2"></div>
            <div className="ai-node node-3"></div>
            <div className="ai-node node-4"></div>
            <div className="ai-node node-5"></div>
            <div className="ai-node node-6"></div>


            {/* =====================================================
                HERO CONTENT
            ===================================================== */}

            <div className="hero-content">

                <div className="hero-badge">

                    <span className="status-dot"></span>

                    AI / ML COMMUNITY

                </div>


                <h1 className="hero-title">

                    sava.<span>py</span> Club

                </h1>


                <p className="hero-subtitle">

                    Explore Artificial Intelligence.
                    <br />
                    Build. Learn. Innovate.

                </p>


                <div className="hero-buttons">

                    <a
                        href="/learning"
                        className="hero-button primary"
                    >
                        Start Learning

                        <span>↗</span>

                    </a>


                    <a
                        href="/problems"
                        className="hero-button secondary"
                    >
                        Explore Problems
                    </a>

                </div>


                <div className="hero-tech-line">

                    <span>NEURAL NETWORKS</span>

                    <span>•</span>

                    <span>MACHINE LEARNING</span>

                    <span>•</span>

                    <span>ARTIFICIAL INTELLIGENCE</span>

                </div>

            </div>


            {/* =====================================================
                NEURAL NETWORK HOLOGRAM
            ===================================================== */}

            <div
                className={`graphic-fullwidth-frame ${
                    hovered ? "network-hovered" : ""
                }`}
            >

                {/* =================================================
                    MODEL LABEL
                ================================================= */}

                <div className="model-label">

                    <span className="status-dot"></span>

                    <a
                        href="https://en.wikipedia.org/wiki/Artificial_neural_network"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="model-link"
                    >
                        MODEL: NEURAL_NET
                    </a>

                </div>


                {/* =================================================
                    LEFT HUD
                ================================================= */}

                <div className="hud-stats left-stats">

                    <div className="hud-stat">

                        <span>LAYERS</span>

                        <strong>04</strong>

                    </div>


                    <div className="hud-stat">

                        <span>NODES</span>

                        <strong>128</strong>

                    </div>


                    <div className="hud-stat">

                        <span>WEIGHTS</span>

                        <strong>1.4K</strong>

                    </div>

                </div>


                {/* =================================================
                    RIGHT HUD
                ================================================= */}

                <div className="hud-stats right-stats">

                    <div className="hud-stat">

                        <span>INPUT</span>

                        <strong>784</strong>

                    </div>


                    <div className="hud-stat">

                        <span>HIDDEN</span>

                        <strong>128</strong>

                    </div>


                    <div className="hud-stat">

                        <span>OUTPUT</span>

                        <strong>10</strong>

                    </div>

                </div>


                {/* =================================================
                    NEURAL NETWORK
                ================================================= */}

                <div
                    className="neural-stage"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >

                    <div className="neural-cube">


                        {/* =================================================
                            INPUT LAYER
                        ================================================= */}

                        <div className="network-layer layer-1">

                            <div className="layer-title">

                                <span className="layer-index">
                                    01
                                </span>

                                <span>
                                    INPUT LAYER
                                </span>

                            </div>


                            <div className="layer-subtitle">
                                FEATURE INPUT
                            </div>


                            <div className="network-node n1"></div>
                            <div className="network-node n2"></div>
                            <div className="network-node n3"></div>
                            <div className="network-node n4"></div>
                            <div className="network-node n5"></div>
                            <div className="network-node n6"></div>

                        </div>


                        {/* =================================================
                            HIDDEN LAYER 01
                        ================================================= */}

                        <div className="network-layer layer-2">

                            <div className="layer-title">

                                <span className="layer-index">
                                    02
                                </span>

                                <span>
                                    HIDDEN LAYER
                                </span>

                            </div>


                            <div className="layer-subtitle">
                                FEATURE EXTRACTION
                            </div>


                            <div className="network-node n1"></div>
                            <div className="network-node n2"></div>
                            <div className="network-node n3"></div>
                            <div className="network-node n4"></div>
                            <div className="network-node n5"></div>
                            <div className="network-node n6"></div>
                            <div className="network-node n7"></div>

                        </div>


                        {/* =================================================
                            HIDDEN LAYER 02
                        ================================================= */}

                        <div className="network-layer layer-3">

                            <div className="layer-title">

                                <span className="layer-index">
                                    03
                                </span>

                                <span>
                                    HIDDEN LAYER
                                </span>

                            </div>


                            <div className="layer-subtitle">
                                REPRESENTATION
                            </div>


                            <div className="network-node n1"></div>
                            <div className="network-node n2"></div>
                            <div className="network-node n3"></div>
                            <div className="network-node n4"></div>
                            <div className="network-node n5"></div>
                            <div className="network-node n6"></div>
                            <div className="network-node n7"></div>

                        </div>


                        {/* =================================================
                            OUTPUT LAYER
                        ================================================= */}

                        <div className="network-layer layer-4">

                            <div className="layer-title">

                                <span className="layer-index">
                                    04
                                </span>

                                <span>
                                    OUTPUT LAYER
                                </span>

                            </div>


                            <div className="layer-subtitle">
                                CLASSIFICATION
                            </div>


                            <div className="network-node n1"></div>
                            <div className="network-node n2"></div>
                            <div className="network-node n3"></div>
                            <div className="network-node n4"></div>
                            <div className="network-node n5"></div>

                        </div>


                        {/* =================================================
                            CONNECTIONS
                        ================================================= */}

                        <div className="network-connections">

                            <span className="connection c1"></span>
                            <span className="connection c2"></span>
                            <span className="connection c3"></span>
                            <span className="connection c4"></span>
                            <span className="connection c5"></span>
                            <span className="connection c6"></span>
                            <span className="connection c7"></span>
                            <span className="connection c8"></span>
                            <span className="connection c9"></span>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    HOVER INDICATOR
                ================================================= */}

                <div className="expand-indicator">

                    <span className="expand-dot"></span>

                    <span>
                        {hovered
                            ? "NETWORK EXPANDED"
                            : "HOVER TO EXPAND"}
                    </span>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="model-footer">

                    <span>ARCHITECTURE</span>

                    <div className="footer-line"></div>

                    <span className="active">
                        FEED_FORWARD
                    </span>

                    <div className="footer-line"></div>

                    <span>INTERACTIVE</span>

                </div>


                {/* =================================================
                    CORNERS
                ================================================= */}

                <div className="model-corner top-left"></div>

                <div className="model-corner top-right"></div>

                <div className="model-corner bottom-left"></div>

                <div className="model-corner bottom-right"></div>

            </div>


            {/* =====================================================
                SCROLL
            ===================================================== */}

            <div className="scroll-indicator">

                <span>
                    SCROLL TO EXPLORE
                </span>

                <div className="scroll-line"></div>

            </div>

        </section>
    );
}

export default Hero;