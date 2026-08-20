import SkillBadge from "./SkillBadge";
import "../styles/founderCard.css";


function HighlightedDescription({
    text,
    highlight
}) {
    if (!highlight || !text.includes(highlight)) {
        return text;
    }

    const parts = text.split(highlight);

    return (
        <>
            {parts[0]}

            <em>
                {highlight}
            </em>

            {parts.slice(1).join(highlight)}
        </>
    );
}


function FounderCard({
    image,
    name,
    age,
    hobby,
    movie,
    description,
    highlight,
    skills
}) {
    return (
        <article className="founder-card">

            {/* IMAGE */}

            <div className="founder-image-area">

                <div className="founder-image-orbit">

                    <img
                        src={image}
                        alt={name}
                        className="founder-image"
                    />

                </div>

                <span className="founder-image-status">
                    <span></span>
                    PROFILE ACTIVE
                </span>

            </div>


            {/* INFO */}

            <div className="founder-info">

                <span className="founder-role">
                    SAVA ML / FOUNDER
                </span>

                <h2>
                    {name}
                </h2>


                {/* META */}

                <div className="founder-meta">

                    <div className="founder-meta-item">
                        <span>AGE</span>
                        <strong>{age}</strong>
                    </div>

                    <div className="founder-meta-item">
                        <span>HOBBY</span>
                        <strong>{hobby}</strong>
                    </div>

                    <div className="founder-meta-item">
                        <span>FILM</span>
                        <strong>{movie}</strong>
                    </div>

                </div>


                {/* DESCRIPTION */}

                <p className="founder-description">

                    <HighlightedDescription
                        text={description}
                        highlight={highlight}
                    />

                </p>


                {/* SKILLS */}

                <div className="founder-skills-section">

                    <div className="skills-header">

                        <span className="skills-title">
                            TECH STACK
                        </span>

                        <span className="skills-count">
                            {String(skills.length).padStart(2, "0")}
                        </span>

                    </div>

                    <div className="skills">

                        {skills.map((skill) => (
                            <SkillBadge
                                key={skill}
                                skill={skill}
                            />
                        ))}

                    </div>

                </div>

            </div>

        </article>
    );
}


export default FounderCard;