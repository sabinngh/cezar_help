import { useEffect, useState } from "react";

import { useAuth } from "../AuthContext";

import "../styles/problemForm.css";

function ProblemForm({

    problem = null,

    onSuccess,

    onCancel

}) {

    const { token } = useAuth();

    const editing = problem !== null;

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        title: "",

        difficulty: "Easy",

        image_url: "",

        resource_link: "",

        notebook: null,

        starter_archive: null,

        ground_truth: null

    });

    useEffect(() => {

        if (!problem) return;

        setFormData({

            title: problem.title,

            difficulty: problem.difficulty,

            image_url: problem.image_url || "",

            resource_link: problem.resource_link || "",

            notebook: null,

            starter_archive: null,

            ground_truth: null

        });

    }, [problem]);

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: files ? files[0] : value

        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        const body = new FormData();

        Object.entries(formData).forEach(([key, value]) => {

            if (value !== null && value !== "") {

                body.append(key, value);

            }

        });

        try {

            const response = await fetch(

                editing

                    ? `http://localhost:5001/api/problems/${problem.slug}`

                    : "http://localhost:5001/api/problems",

                {

                    method: editing ? "PUT" : "POST",

                    headers: {

                        Authorization: `Bearer ${token}`

                    },

                    body

                }

            );

            const data = await response.json();

            if (!response.ok) {

                setError(data.message);

                return;

            }

            onSuccess(data.problem);

        }

        catch (err) {

            console.error(err);

            setError("Could not connect to the server.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form

            className="problem-form"

            onSubmit={handleSubmit}

        >

            <h2>

                {

                    editing

                        ? "Edit Problem"

                        : "Create Problem"

                }

            </h2>

            <label>

                Title

            </label>

            <input

                type="text"

                name="title"

                value={formData.title}

                onChange={handleChange}

                required

            />

            <label>

                Difficulty

            </label>

            <select

                name="difficulty"

                value={formData.difficulty}

                onChange={handleChange}

            >

                <option value="Easy">

                    Easy

                </option>

                <option value="Medium">

                    Medium

                </option>

                <option value="Hard">

                    Hard

                </option>

            </select>

            <label>

                Notebook (.ipynb)

            </label>

            <input

                type="file"

                name="notebook"

                accept=".ipynb"

                onChange={handleChange}

                required={!editing}

            />

            <label>

                Starter ZIP (.zip)

            </label>

            <input

                type="file"

                name="starter_archive"

                accept=".zip"

                onChange={handleChange}

                required={!editing}

            />

            <label>

                Ground Truth (.csv)

            </label>

            <input

                type="file"

                name="ground_truth"

                accept=".csv"

                onChange={handleChange}

                required={!editing}

            />

            <label>

                Image URL (optional)

            </label>

            <input

                type="text"

                name="image_url"

                value={formData.image_url}

                onChange={handleChange}

            />

            <label>

                Resource Link (optional)

            </label>

            <input

                type="text"

                name="resource_link"

                value={formData.resource_link}

                onChange={handleChange}

            />

            {

                error && (

                    <p className="form-error">

                        {error}

                    </p>

                )

            }

            <div className="form-buttons">

                <button

                    type="button"

                    className="cancel-btn"

                    onClick={onCancel}

                >

                    Cancel

                </button>

                <button

                    type="submit"

                    className="save-btn"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Saving..."

                            : editing

                                ? "Save Changes"

                                : "Create Problem"

                    }

                </button>

            </div>

        </form>

    );

}

export default ProblemForm;