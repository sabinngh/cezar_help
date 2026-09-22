import { useRef, useState } from "react";

import { useAuth } from "../AuthContext";


function ProblemUpload({ onUploaded }) {

    const { token } = useAuth();

    const fileInputRef = useRef(null);

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] =
        useState("Easy");

    const [
        shortDescription,
        setShortDescription
    ] = useState("");

    const [file, setFile] = useState(null);

    const [message, setMessage] =
        useState("");

    const [uploading, setUploading] =
        useState(false);


    const handleUpload = async (e) => {

        e.preventDefault();

        if (!file) {
            setMessage(
                "Please select a notebook."
            );

            return;
        }


        const formData = new FormData();

        formData.append(
            "title",
            title
        );

        formData.append(
            "difficulty",
            difficulty
        );

        formData.append(
            "short_description",
            shortDescription
        );

        formData.append(
            "file",
            file
        );


        try {

            setUploading(true);
            setMessage("");


            const response = await fetch(
                "http://localhost:5001/api/problems/upload",
                {
                    method: "POST",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    },

                    body: formData
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                setMessage(
                    data.message ||
                    "Could not upload problem."
                );

                return;
            }


            setMessage(
                "Problem uploaded successfully."
            );

            setTitle("");
            setDifficulty("Easy");
            setShortDescription("");
            setFile(null);


            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }


            if (onUploaded) {
                await onUploaded();
            }


        } catch (error) {

            console.error(error);

            setMessage(
                "Could not connect to server."
            );

        } finally {

            setUploading(false);

        }

    };


    return (

        <form
            className="problem-upload"
            onSubmit={handleUpload}
        >

            <div className="problem-upload-heading">

                <span>
                    ADMIN / UPLOAD PROBLEM
                </span>

                <p>
                    Add a notebook challenge to the database.
                </p>

            </div>


            <div className="problem-upload-fields">

                <input
                    type="text"
                    placeholder="Problem title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    required
                />


                <select
                    value={difficulty}
                    onChange={(e) =>
                        setDifficulty(
                            e.target.value
                        )
                    }
                >

                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>

                </select>


                <input
                    className="description-input"
                    type="text"
                    placeholder="Short description"
                    value={shortDescription}
                    onChange={(e) =>
                        setShortDescription(
                            e.target.value
                        )
                    }
                    required
                />


                <label className="problem-file-input">

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".ipynb"
                        onChange={(e) =>
                            setFile(
                                e.target.files[0]
                            )
                        }
                        required
                    />

                    <span className="file-button">
                        CHOOSE FILE
                    </span>

                    <span className="file-name">
                        {
                            file
                                ? file.name
                                : "No notebook selected"
                        }
                    </span>

                </label>


                <button
                    type="submit"
                    className="problem-upload-button"
                    disabled={uploading}
                >
                    {
                        uploading
                            ? "Uploading..."
                            : "Upload Problem →"
                    }
                </button>

            </div>


            {message && (

                <p className="problem-upload-message">
                    {message}
                </p>

            )}

        </form>

    );
}


export default ProblemUpload;