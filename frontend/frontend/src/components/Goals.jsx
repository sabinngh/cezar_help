import "../styles/goals.css";

function Goals() {

    return (

        <section className="goals-section">

            <h5>Main goals</h5>

            <a
                className="goal-button"
                href="https://olimpiada-ai.ro/ro"
                target="_blank"
                rel="noopener noreferrer"
            >
                ONIA
            </a>

            <a
                className="goal-button"
                href="https://olimpiada.nitro-ai.org/ro/"
                target="_blank"
                rel="noopener noreferrer"
            >
                ROAI
            </a>

            <h5>Most important value</h5>

            <button>PATIENCE</button>

        </section>

    );

}

export default Goals;