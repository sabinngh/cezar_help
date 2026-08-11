//import "../styles/hero.css";
//import "@google/model-viewer";

function Hero() {
    return (
        <section className="hero-container">

            <div className="hero-section">

                <h1>
                    sava<span>ML</span> Club
                </h1>

                <h4>
                    This is the official website of the savaML Club.
                </h4>

            </div>

            <div className="graphic-fullwidth-frame">

                <model-viewer
                    src="/keyboard.glb"
                    auto-rotate
                    camera-controls
                    disable-zoom
                    min-field-of-view="30deg"
                    field-of-view="60deg"
                />

            </div>

        </section>
    );
}

export default Hero;