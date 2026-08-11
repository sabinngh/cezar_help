import founders from "../data/founders";
import FounderCard from "../components/FounderCard";

import "../styles/meetTheTeam.css";

function MeetTheTeam() {

    return (

        <div className="team-page">

            <h1>Meet our Team</h1>

            <p>
                This is the page of the founders of the savaML Club.
            </p>

            {founders.map((founder) => (

                <FounderCard

                    key={founder.id}

                    {...founder}

                />

            ))}

        </div>

    );

}

export default MeetTheTeam;