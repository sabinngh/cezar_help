import "../styles/skillBadge.css";

function SkillBadge({ skill }) {
    return (
        <span className="skill-badge">
            {skill}
        </span>
    );
}

export default SkillBadge;