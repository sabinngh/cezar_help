import { useEffect, useState } from "react";

import LessonSidebar from "../components/LessonSidebar";
import LessonViewer from "../components/LessonViewer";
import LessonUpload from "../components/LessonUpload";
import WordVectorGraphic from "../components/WordVectorGraphic";

import { useAuth } from "../AuthContext";

import "../styles/learning.css";


function Learning() {

    const { user } = useAuth();

    const [category, setCategory] = useState("All");

    const [lessons, setLessons] = useState([]);

    const [selectedLesson, setSelectedLesson] = useState(null);


    const loadLessons = async () => {

        let url =
            "http://localhost:5001/api/lessons";

        if (category !== "All") {
            url += `?category=${encodeURIComponent(category)}`;
        }


        const response = await fetch(url);

        const data = await response.json();

        setLessons(data.lessons || []);
    };


    useEffect(() => {
        loadLessons();
    }, [category]);


    return (
        <main className="learning-page">

            <div className="learning-header">

                <div className="learning-header-text">
                    <span className="learning-tag">
                        03 / LEARNING DATABASE
                    </span>

                    <h1>
                        Learn <span>AI.</span>
                    </h1>

                    <p>
                        Explore lessons, theory and resources created for savaML members.
                    </p>
                </div>

                <WordVectorGraphic />

            </div>


            <div className="learning-layout">

                <LessonSidebar
                    category={category}
                    setCategory={setCategory}
                    lessons={lessons}
                    setSelectedLesson={setSelectedLesson}
                    onLessonDeleted={loadLessons}
                />


                <section className="lesson-main">

                    {user?.role === "admin" && (

                        <LessonUpload
                            onUploaded={loadLessons}
                        />

                    )}


                    {selectedLesson ? (

                        <LessonViewer
                            lesson={selectedLesson}
                        />

                    ) : (

                        <div className="lesson-empty">

                            <span>SELECT LESSON</span>

                            <h2>
                                Choose a lesson from the database.
                            </h2>

                            <p>
                                Select a category and open a lesson
                                to start learning.
                            </p>

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
}

export default Learning;