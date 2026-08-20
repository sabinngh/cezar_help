function WordVectorGraphic() {
    return (
        <div className="wordvec-graphic">
            <div className="wordvec-label">
                VECTOR SPACE / WORD2VEC
            </div>

            <svg
                viewBox="0 0 520 320"
                className="wordvec-svg"
                aria-hidden="true"
            >
                {/* AXES */}

                <line
                    x1="250"
                    y1="250"
                    x2="465"
                    y2="285"
                    className="axis-line"
                />

                <line
                    x1="250"
                    y1="250"
                    x2="95"
                    y2="305"
                    className="axis-line"
                />

                <line
                    x1="250"
                    y1="250"
                    x2="250"
                    y2="40"
                    className="axis-line"
                />


                {/* axis arrows */}

                <polyline
                    points="452,278 465,285 451,291"
                    className="axis-arrow"
                />

                <polyline
                    points="107,295 95,305 111,306"
                    className="axis-arrow"
                />

                <polyline
                    points="243,52 250,40 257,52"
                    className="axis-arrow"
                />


                {/* axis labels */}

                <text x="430" y="312" className="axis-text">
                    TECHNIQUE
                </text>

                <text x="55" y="315" className="axis-text">
                    NATURE
                </text>

                <text x="262" y="48" className="axis-text">
                    COSMOS
                </text>


                {/* PURPLE VECTORS */}

                <line
                    x1="250"
                    y1="250"
                    x2="165"
                    y2="185"
                    className="vector-purple"
                />

                <line
                    x1="250"
                    y1="250"
                    x2="195"
                    y2="95"
                    className="vector-purple"
                />

                <line
                    x1="250"
                    y1="250"
                    x2="120"
                    y2="245"
                    className="vector-purple"
                />


                {/* TURQUOISE / MAGENTA SIDE */}

                <line
                    x1="250"
                    y1="250"
                    x2="330"
                    y2="90"
                    className="vector-mint"
                />

                <line
                    x1="250"
                    y1="250"
                    x2="390"
                    y2="155"
                    className="vector-mint"
                />

                <line
                    x1="250"
                    y1="250"
                    x2="455"
                    y2="210"
                    className="vector-mint"
                />


                {/* dashed projections */}

                <line
                    x1="165"
                    y1="185"
                    x2="165"
                    y2="250"
                    className="projection projection-purple"
                />

                <line
                    x1="195"
                    y1="95"
                    x2="195"
                    y2="250"
                    className="projection projection-purple"
                />

                <line
                    x1="330"
                    y1="90"
                    x2="330"
                    y2="250"
                    className="projection projection-mint"
                />

                <line
                    x1="390"
                    y1="155"
                    x2="390"
                    y2="250"
                    className="projection projection-mint"
                />


                {/* points */}

                <circle cx="165" cy="185" r="5" className="point-purple" />
                <circle cx="195" cy="95" r="5" className="point-purple" />
                <circle cx="120" cy="245" r="5" className="point-purple" />

                <circle cx="330" cy="90" r="5" className="point-mint" />
                <circle cx="390" cy="155" r="5" className="point-mint" />
                <circle cx="455" cy="210" r="5" className="point-mint" />


                {/* labels */}

                <text x="108" y="176" className="word-purple">
                    eagle
                </text>

                <text x="130" y="85" className="word-purple">
                    cloud
                </text>

                <text x="64" y="240" className="word-purple">
                    fly
                </text>

                <text x="338" y="83" className="word-mint">
                    astronaut
                </text>

                <text x="398" y="148" className="word-mint">
                    plane
                </text>

                <text x="462" y="205" className="word-mint">
                    robot
                </text>


                {/* origin glow */}

                <circle
                    cx="250"
                    cy="250"
                    r="16"
                    className="origin-glow"
                />

                <circle
                    cx="250"
                    cy="250"
                    r="4"
                    className="origin-point"
                />
            </svg>
        </div>
    );
}

export default WordVectorGraphic;