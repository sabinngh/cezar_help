import { useState } from "react";

import { useAuth } from "../AuthContext";

import "../styles/problemForm.css";

function ProblemForm({

    problem = null,

    onSuccess,

    onCancel

}) {

    const { token } = useAuth();

    const editing = problem !== null;

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        title: problem?.title || "",

        difficulty: problem?.difficulty || "Easy",

        short_description: problem?.short_description || "",

        statement: problem?.statement || "",

        input_description: problem?.input_description || "",

        output_description: problem?.output_description || "",

        constraints: problem?.constraints || "",

        examples: problem?.examples || "",

        evaluation: problem?.evaluation || "",

        hints: problem?.hints || "",

        resource_link: problem?.resource_link || "",

        image_url: problem?.image_url || ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const url = editing

                ? `http://localhost:5001/api/problems/${problem.slug}`

                : "http://localhost:5001/api/problems";

            const response = await fetch(

                url,

                {

                    method: editing ? "PUT" : "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(formData)

                }

            );

            const data = await response.json();

            if (!response.ok) {

                setError(data.message);

                return;

            }

            if (onSuccess) {

                onSuccess(data.problem);

            }

        }

        catch {

            setError("Server error.");

        }

        finally {

            setLoading(false);

        }

    };

    const renderTextarea = (label, name, rows = 4) => (

        <>

            <label>{label}</label>

            <textarea

                rows={rows}

                name={name}

                value={formData[name]}

                onChange={handleChange}

            />

        </>

    );

    return (

        <form

            className="problem-form"

            onSubmit={handleSubmit}

        >

            <h2>

                {editing ? "Edit Problem" : "Create Problem"}

            </h2>

            <label>

                Title

            </label>

            <input

                name="title"

                value={formData.title}

                onChange={handleChange}

            />

            <label>

                Difficulty

            </label>

            <select

                name="difficulty"

                value={formData.difficulty}

                onChange={handleChange}

            >

                <option>Easy</option>

                <option>Medium</option>

                <option>Hard</option>

            </select>

            {renderTextarea(

                "Short Description",

                "short_description",

                2

            )}

            {renderTextarea(

                "Problem Statement",

                "statement",

                16

            )}

            {renderTextarea(

                "Input Description",

                "input_description"

            )}

            {renderTextarea(

                "Output Description",

                "output_description"

            )}

            {renderTextarea(

                "Constraints",

                "constraints"

            )}

            {renderTextarea(

                "Examples",

                "examples"

            )}

            {renderTextarea(

                "Evaluation",

                "evaluation"

            )}

            {renderTextarea(

                "Hints",

                "hints"

            )}

            <label>

                Resource Link

            </label>

            <input

                name="resource_link"

                value={formData.resource_link}

                onChange={handleChange}

            />

            <label>

                Image URL

            </label>

            <input

                name="image_url"

                value={formData.image_url}

                onChange={handleChange}

            />

            {error && (

                <p className="form-error">

                    {error}

                </p>

            )}

            <div className="form-buttons">

                {onCancel && (

                    <button

                        type="button"

                        className="cancel-btn"

                        onClick={onCancel}

                    >

                        Cancel

                    </button>

                )}

                <button

                    className="save-btn"

                    disabled={loading}

                >

                    {loading

                        ? "Saving..."

                        : editing

                        ? "Save Changes"

                        : "Create Problem"}

                </button>

            </div>

        </form>

    );

}

export default ProblemForm;