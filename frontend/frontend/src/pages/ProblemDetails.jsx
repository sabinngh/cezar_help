import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import "../styles/problemDetails.css";

function ProblemDetails() {

    const { slug } = useParams();

    const [problem, setProblem] = useState(null);

    useEffect(() => {

        const fetchProblem = async () => {

            const response = await fetch(

                `http://localhost:5001/api/problems/${slug}`

            );

            const data = await response.json();

            if(response.ok){

                setProblem(data);

            }

        };

        fetchProblem();

    }, [slug]);

    if(!problem){

        return <h2>Loading...</h2>;

    }

    return(

        <div className="problem-details">

            <h1>

                {problem.title}

            </h1>

            <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>

                {problem.difficulty}

            </span>

            <p>

                {problem.description}

            </p>

            {problem.hints && (

                <>

                    <h3>Hints</h3>

                    <p>

                        {problem.hints}

                    </p>

                </>

            )}

            {problem.resource_link && (

                <a

                    href={problem.resource_link}

                    target="_blank"

                    rel="noreferrer"

                >

                    Additional Resource

                </a>

            )}

        </div>

    );

}

export default ProblemDetails;