import { useEffect, useState } from "react";
import "../styles/scrollNavigator.css";

const sections = [
    { id: "hero", label: "HOME" },
    { id: "story", label: "STORY" },
    { id: "practice", label: "PRACTICE" },
    { id: "research", label: "RESEARCH" },
    { id: "future", label: "FUTURE" },
    { id: "goals", label: "GOALS" }
];

function ScrollNavigator() {
    const [activeSection, setActiveSection] = useState("hero");
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScrollProgress = () => {
            const scrollTop =
                window.scrollY ||
                document.documentElement.scrollTop;

            const scrollHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            if (scrollHeight <= 0) {
                setScrollProgress(0);
                return;
            }

            const progress =
                (scrollTop / scrollHeight) * 100;

            setScrollProgress(
                Math.min(
                    Math.max(progress, 0),
                    100
                )
            );
        };

        handleScrollProgress();

        window.addEventListener(
            "scroll",
            handleScrollProgress,
            {
                passive: true
            }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScrollProgress
            );
        };
    }, []);


    useEffect(() => {
        const sectionElements = sections
            .map((section) => ({
                ...section,
                element:
                    document.getElementById(
                        section.id
                    )
            }))
            .filter((section) => section.element);


        const updateActiveSection = () => {
            const viewportAnchor =
                window.innerHeight * 0.42;

            let closestSection =
                sectionElements[0];

            let smallestDistance =
                Infinity;

            sectionElements.forEach((section) => {
                const rect =
                    section.element.getBoundingClientRect();

                const distance =
                    Math.abs(
                        rect.top - viewportAnchor
                    );

                if (
                    distance <
                    smallestDistance
                ) {
                    smallestDistance =
                        distance;

                    closestSection =
                        section;
                }
            });

            if (closestSection) {
                setActiveSection(
                    closestSection.id
                );
            }
        };


        updateActiveSection();

        window.addEventListener(
            "scroll",
            updateActiveSection,
            {
                passive: true
            }
        );

        window.addEventListener(
            "resize",
            updateActiveSection
        );


        return () => {
            window.removeEventListener(
                "scroll",
                updateActiveSection
            );

            window.removeEventListener(
                "resize",
                updateActiveSection
            );
        };
    }, []);


    const scrollToSection = (id) => {
        const element =
            document.getElementById(id);

        if (!element) return;

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };


    return (
        <nav
            className="scroll-nav"
            aria-label="Page sections"
        >

            {/* background vertical line */}

            <div className="scroll-nav-line">

                <div
                    className="scroll-nav-progress"
                    style={{
                        height:
                            `${scrollProgress}%`
                    }}
                />

            </div>


            {/* section markers */}

            <div className="scroll-nav-items">

                {sections.map(
                    (section, index) => {

                        const isActive =
                            activeSection ===
                            section.id;

                        return (
                            <button
                                key={section.id}
                                type="button"
                                className={
                                    isActive
                                        ? "scroll-nav-item active"
                                        : "scroll-nav-item"
                                }
                                onClick={() =>
                                    scrollToSection(
                                        section.id
                                    )
                                }
                                aria-label={
                                    `Go to ${section.label}`
                                }
                                aria-current={
                                    isActive
                                        ? "location"
                                        : undefined
                                }
                            >

                                <span
                                    className="scroll-nav-number"
                                >
                                    {String(
                                        index + 1
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </span>


                                <span
                                    className="scroll-nav-marker"
                                />


                                <span
                                    className="scroll-nav-label"
                                >
                                    {
                                        section.label
                                    }
                                </span>

                            </button>
                        );
                    }
                )}

            </div>

        </nav>
    );
}

export default ScrollNavigator;