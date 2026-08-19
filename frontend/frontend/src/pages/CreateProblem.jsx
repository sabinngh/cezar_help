import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

import "../styles/createProblem.css";

function CreateProblem() {

    const navigate = useNavigate();

    const { token } = useAuth();

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        title: "",

        difficulty: "Easy",

        short_description: "",

        statement: "",

        input_description: "",

        output_description: "",

        constraints: "",

        examples: "",

        evaluation: "",

        hints: "",

        resource_link: "",

        image_url: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        const response = await fetch(

            "http://localhost:5001/api/problems",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(formData)

            }

        );

        const data = await response.json();

        if(response.ok){

            navigate("/problems");

        }

        else{

            setError(data.message);

        }

    };

    return(

        <div className="create-problem-page">

            <div className="create-problem-card">

                <h1>Create Problem</h1>

                <form onSubmit={handleSubmit}>

                    <label>Title</label>

                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <label>Difficulty</label>

                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >

                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>

                    </select>

                    <label>Short Description</label>

                    <textarea
                        rows="2"
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleChange}
                    />

                    <label>Problem Statement</label>

                    <textarea
                        rows="8"
                        name="statement"
                        value={formData.statement}
                        onChange={handleChange}
                    />

                    <label>Input Description</label>

                    <textarea
                        rows="5"
                        name="input_description"
                        value={formData.input_description}
                        onChange={handleChange}
                    />

                    <label>Output Description</label>

                    <textarea
                        rows="5"
                        name="output_description"
                        value={formData.output_description}
                        onChange={handleChange}
                    />

                    <label>Constraints</label>

                    <textarea
                        rows="5"
                        name="constraints"
                        value={formData.constraints}
                        onChange={handleChange}
                    />

                    <label>Examples</label>

                    <textarea
                        rows="6"
                        name="examples"
                        value={formData.examples}
                        onChange={handleChange}
                    />

                    <label>Evaluation</label>

                    <textarea
                        rows="5"
                        name="evaluation"
                        value={formData.evaluation}
                        onChange={handleChange}
                    />

                    <label>Hints</label>

                    <textarea
                        rows="5"
                        name="hints"
                        value={formData.hints}
                        onChange={handleChange}
                    />

                    <label>Resource Link</label>

                    <input
                        name="resource_link"
                        value={formData.resource_link}
                        onChange={handleChange}
                    />

                    <label>Image URL</label>

                    <input
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                    />

                    {error &&

                        <p className="form-error">

                            {error}

                        </p>

                    }

                    <button>

                        Create Problem

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateProblem;