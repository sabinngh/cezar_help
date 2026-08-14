import "../styles/hero.css";

function Hero() {
    return (
        <section className="hero-container">

            {/* Animated background */}
            <div className="hero-grid"></div>

            <div className="hero-glow glow-one"></div>
            <div className="hero-glow glow-two"></div>

            {/* Floating AI nodes */}
            <div className="ai-node node-1"></div>
            <div className="ai-node node-2"></div>
            <div className="ai-node node-3"></div>
            <div className="ai-node node-4"></div>
            <div className="ai-node node-5"></div>

            <div className="hero-content">

                <div className="hero-badge">
                    <span className="status-dot"></span>
                    AI / ML COMMUNITY
                </div>

                <h1 className="hero-title">
                    sava<span>ML</span> Club
                </h1>

                <p className="hero-subtitle">
                    Explore Artificial Intelligence.
                    <br />
                    Build. Learn. Innovate.
                </p>

                <div className="hero-buttons">
                    <a href="/learning" className="hero-button primary">
                        Start Learning
                        <span>↗</span>
                    </a>

                    <a href="/problems" className="hero-button secondary">
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

            {/* 3D model */}
            <div className="graphic-fullwidth-frame">

                <div className="model-label">
                    <span className="status-dot"></span>
                    INTERACTIVE MODEL
                </div>

                <model-viewer
                    src="/keyboard.glb"
                    auto-rotate
                    camera-controls
                    disable-zoom
                    min-field-of-view="30deg"
                    field-of-view="60deg"
                />

                <div className="model-corner top-left"></div>
                <div className="model-corner top-right"></div>
                <div className="model-corner bottom-left"></div>
                <div className="model-corner bottom-right"></div>

            </div>

            <div className="scroll-indicator">
                <span>SCROLL TO EXPLORE</span>
                <div className="scroll-line"></div>
            </div>

        </section>
    );
}

export default Hero;