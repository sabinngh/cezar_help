import "../styles/skillBadge.css";

function SkillBadge({ skill }) {
    return (
        <span className="skill-badge">
            <span className="skill-dot"></span>
            {skill}
        </span>
    );
}

export default SkillBadge;