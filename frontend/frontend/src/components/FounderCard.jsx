import SkillBadge from "./SkillBadge";
import "../styles/founderCard.css";

function FounderCard({
    image,
    name,
    age,
    hobby,
    movie,
    description,
    skills
}) {

    return (

        <div className="founder-card">


            <img
                src={image}
                alt={name}
                className="founder-image"
            />

            <h2>{name}</h2>

            <p>
                <strong>Age:</strong> {age}
            </p>

            <p>
                <strong>Favourite hobby:</strong> {hobby}
            </p>

            <p>
                <strong>Favourite film:</strong> {movie}
            </p>

            <p>{description}</p>

            <h4>Tech skills</h4>

            <div className="skills">

                {skills.map((skill) => (

                    <SkillBadge
                        key={skill}
                        skill={skill}
                    />

                ))}

            </div>

        </div>

    );
}

export default FounderCard;