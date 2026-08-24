import { useState } from "react";
import { useAuth } from "../AuthContext";


function LessonUpload({ onUploaded }) {

    const { token } = useAuth();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Machine Learning");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");


    const handleUpload = async (e) => {

        e.preventDefault();
        console.log("UPLOAD TOKEN:", token);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("category", category);
        formData.append("file", file);

        

        const response = await fetch(
            "http://localhost:5001/api/lessons/upload",
            {
                method: "POST",

                headers: {
                    Authorization: `Bearer ${token}`
                },

                body: formData
            }
        );


        const data = await response.json();
        console.log("UPLOAD STATUS:", response.status);
        console.log("UPLOAD RESPONSE:", data);

        if (response.ok) {

            setMessage("Lesson uploaded.");

            setTitle("");
            setFile(null);

            onUploaded();

        } else {

            setMessage(data.message);

        }

    };


    return (
        <form
            className="lesson-upload"
            onSubmit={handleUpload}
        >

            <span className="upload-label">
                ADMIN / UPLOAD LESSON
            </span>


            <input
                type="text"
                placeholder="Lesson title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                required
            />


            <select
                value={category}
                onChange={(e) =>
                    setCategory(e.target.value)
                }
            >

                <option>Machine Learning</option>
                <option>Deep Learning</option>
                <option>NLP</option>
                <option>Computer Vision</option>
                <option>Algorithms</option>

            </select>


            <input
                type="file"
                accept=".md,.txt,.ipynb"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
                required
            />


            <button type="submit">
                Upload Lesson →
            </button>


            {message && (
                <p>{message}</p>
            )}

        </form>
    );
}


export default LessonUpload;