import { useAuth } from "../AuthContext";


const categories = [
    "All",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "Algorithms"
];


function LessonSidebar({
    category,
    setCategory,
    lessons,
    setSelectedLesson,
    onLessonDeleted
}) {
    const { user, token } = useAuth();


    const handleDelete = async (lessonId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this lesson?"
        );

        if (!confirmed) return;


        try {
            const response = await fetch(
                `http://localhost:5001/api/lessons/${lessonId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSelectedLesson(null);

                if (onLessonDeleted) {
                    onLessonDeleted();
                }
            } else {
                alert(data.message || "Could not delete lesson.");
            }

        } catch (error) {
            console.error(error);

            alert("Could not connect to the server.");
        }
    };


    return (
        <aside className="lesson-sidebar">

            <div className="lesson-categories">

                <span className="sidebar-title">
                    CATEGORIES
                </span>

                {categories.map((item) => (

                    <button
                        key={item}
                        className={
                            category === item
                                ? "category-button active"
                                : "category-button"
                        }
                        onClick={() => {
                            setCategory(item);
                            setSelectedLesson(null);
                        }}
                    >
                        {item}
                    </button>

                ))}

            </div>


            <div className="lesson-list">

                <span className="sidebar-title">
                    LESSONS
                </span>


                {lessons.length === 0 && (
                    <p className="no-lessons">
                        No lessons yet.
                    </p>
                )}


                {lessons.map((lesson, index) => (

                    <div
                        className="lesson-list-row"
                        key={lesson.id}
                    >

                        <button
                            className="lesson-list-item"
                            onClick={() =>
                                setSelectedLesson(lesson)
                            }
                        >

                            <span>
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {lesson.title}

                        </button>


                        {user?.role === "admin" && (

                            <button
                                className="lesson-delete-button"
                                onClick={() =>
                                    handleDelete(lesson.id)
                                }
                                title="Delete lesson"
                            >
                                ×
                            </button>

                        )}

                    </div>

                ))}

            </div>

        </aside>
    );
}


export default LessonSidebar;