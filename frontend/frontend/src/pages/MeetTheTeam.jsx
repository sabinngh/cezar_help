import founders from "../data/founders";
import FounderCard from "../components/FounderCard";

import "../styles/meetTheTeam.css";

function MeetTheTeam() {
    return (
        <main className="team-page">

            {/* decorative background */}
            <div className="team-orbit team-orbit-one"></div>
            <div className="team-orbit team-orbit-two"></div>

            <div className="team-particle particle-one"></div>
            <div className="team-particle particle-two"></div>
            <div className="team-particle particle-three"></div>


            {/* HERO */}

            <section className="team-hero">

                <span className="team-kicker">
                    04 / FOUNDERS
                </span>

                <h1 className="team-title">
                    Meet the <span>team.</span>
                </h1>

                <p className="team-description">
                    The people behind savaML — building a community around
                    artificial intelligence, machine learning, research and
                    creative problem solving.
                </p>

                <div className="team-status">
                    <span className="team-status-dot"></span>
                    SAVA ML CORE TEAM
                </div>

            </section>


            {/* FOUNDERS */}

            <section className="team-grid">

                {founders.map((founder, index) => (
                    <div
                        className="team-card-wrap"
                        key={founder.id}
                    >

                        <span className="team-card-number">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <FounderCard {...founder} />

                    </div>
                ))}

            </section>

        </main>
    );
}

export default MeetTheTeam;