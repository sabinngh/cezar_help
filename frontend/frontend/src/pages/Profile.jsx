import { useAuth } from "../AuthContext";
import "../styles/profile.css";
import { useEffect, useState } from "react";

function Profile() {

    const {
        token,
        user,
        updateUser
    } = useAuth();

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        high_school: "",
        city: "",
        country: "",
        github: "",
        about: ""
    });

    useEffect(() => {

        const fetchProfile = async () => {

            const response = await fetch(
                "http://localhost:5001/api/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if(response.ok){

                updateUser(data);

            }

        };

        fetchProfile();
        

    }, [token]);

    useEffect(() => {

        if (!user) return;

        setFormData({

            high_school: user.high_school || "",

            city: user.city || "",

            country: user.country || "",

            github: user.github || "",

            about: user.about || ""

        });

    }, [user]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    if(!user){

        return <h2>Please login.</h2>;

    }

    const handleSave = async () => {

        try {

            const response = await fetch(
                "http://localhost:5001/api/profile",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {

                updateUser(data.user);

                setIsEditing(false);

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Could not update profile.");

        }

    };

    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-avatar-large">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>

                <h1>{user?.username}</h1>

                <p className="profile-email">
                    {user?.email}
                </p>

                <div className="profile-info">

                    <div className="info-row">
                        <span>🏫 High School</span>

                        {isEditing ? (
                            <input
                                type="text"
                                name="high_school"
                                value={formData.high_school}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{user?.high_school || "-"}</p>
                        )}
                    </div>

                    <div className="info-row">
                        <span>🏙️ City</span>

                        {isEditing ? (
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{user?.city || "-"}</p>
                        )}
                    </div>

                    <div className="info-row">
                        <span>🌍 Country</span>

                        {isEditing ? (
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{user?.country || "-"}</p>
                        )}
                    </div>

                    <div className="info-row">
                        <span>💻 GitHub</span>

                        {isEditing ? (
                            <input
                                type="text"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{user?.github || "-"}</p>
                        )}
                    </div>

                    <div className="info-row">
                        <span>📝 About</span>

                        {isEditing ? (
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{user?.about || "-"}</p>
                        )}
                    </div>

                </div>

                {!isEditing && (

                    <button
                        className="edit-profile-btn"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>

                )}

                {isEditing && (

                    <div className="profile-buttons">

                        <button
                            className="cancel-btn"
                            onClick={() => {

                                setIsEditing(false);

                                setFormData({

                                    high_school: user.high_school || "",
                                    city: user.city || "",
                                    country: user.country || "",
                                    github: user.github || "",
                                    about: user.about || ""

                                });

                            }}
                        >
                            Cancel
                        </button>

                        <button
                            className="save-btn"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>

                    </div>

                )}

            </div>

        </div>

    );
}

export default Profile;