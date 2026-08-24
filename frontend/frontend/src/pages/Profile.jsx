// src/pages/Profile.jsx

import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

import "../styles/profile.css";


/* =========================================================
   SCROLL REVEAL
========================================================= */

function useRevealOnScroll(enabled) {
    useEffect(() => {
        if (!enabled) return;

        const elements =
            document.querySelectorAll(".reveal-on-scroll");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");

                        observer.unobserve(
                            entry.target
                        );
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -55px 0px"
            }
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, [enabled]);
}


/* =========================================================
   ACHIEVEMENT CATALOG
========================================================= */

const achievementCatalog = [
    {
        id: "first_solve",
        name: "First Contact",
        description:
            "Solve your first savaML problem.",
        requirement:
            "1 problem solved",
        icon: "✦",
        rarity: "COMMON"
    },

    {
        id: "problem_hunter",
        name: "Problem Hunter",
        description:
            "Build momentum by solving five different problems.",
        requirement:
            "5 problems solved",
        icon: "◎",
        rarity: "RARE"
    },

    {
        id: "elite_solver",
        name: "Elite Solver",
        description:
            "Reach double digits in completed AI challenges.",
        requirement:
            "10 problems solved",
        icon: "◇",
        rarity: "EPIC"
    },

    {
        id: "problem_architect",
        name: "Problem Architect",
        description:
            "Create and publish your first savaML problem.",
        requirement:
            "1 problem authored",
        icon: "⌘",
        rarity: "RARE"
    },

    {
        id: "perfect_run",
        name: "Perfect Run",
        description:
            "Earn three perfect scores across your submissions.",
        requirement:
            "3 perfect scores",
        icon: "100",
        rarity: "EPIC"
    },

    {
        id: "consistent_solver",
        name: "Consistent Solver",
        description:
            "Keep practicing until twenty challenges are complete.",
        requirement:
            "20 problems solved",
        icon: "↗",
        rarity: "EPIC"
    },

    {
        id: "solver_25",
        name: "Quarter Century",
        description:
            "Cross the twenty-five solved problem milestone.",
        requirement:
            "25 problems solved",
        icon: "25",
        rarity: "EPIC"
    },

    {
        id: "solver_50",
        name: "Problem Machine",
        description:
            "Become one of savaML's most experienced solvers.",
        requirement:
            "50 problems solved",
        icon: "50",
        rarity: "LEGENDARY"
    },

    {
        id: "model_builder",
        name: "Model Builder",
        description:
            "Complete your first machine learning challenge.",
        requirement:
            "Complete 1 ML challenge",
        icon: "△",
        rarity: "COMMON"
    },

    {
        id: "deep_diver",
        name: "Deep Diver",
        description:
            "Explore the deeper layers of neural networks.",
        requirement:
            "5 Deep Learning problems",
        icon: "◈",
        rarity: "RARE"
    },

    {
        id: "nlp_explorer",
        name: "Language Explorer",
        description:
            "Begin mastering Natural Language Processing.",
        requirement:
            "3 NLP problems",
        icon: "⌁",
        rarity: "RARE"
    },

    {
        id: "visionary",
        name: "Visionary",
        description:
            "Prove your skills in Computer Vision.",
        requirement:
            "3 Computer Vision problems",
        icon: "◉",
        rarity: "RARE"
    },

    {
        id: "algorithmist",
        name: "Algorithmist",
        description:
            "Master the algorithmic foundations behind AI.",
        requirement:
            "5 algorithm problems",
        icon: "λ",
        rarity: "EPIC"
    },

    {
        id: "submission_10",
        name: "Getting Started",
        description:
            "Send ten solutions through the savaML evaluator.",
        requirement:
            "10 submissions",
        icon: "10",
        rarity: "COMMON"
    },

    {
        id: "submission_50",
        name: "Persistent",
        description:
            "Keep iterating until you reach fifty submissions.",
        requirement:
            "50 submissions",
        icon: "50",
        rarity: "RARE"
    },

    {
        id: "century",
        name: "Century",
        description:
            "Reach one hundred total submissions.",
        requirement:
            "100 submissions",
        icon: "100",
        rarity: "LEGENDARY"
    },

    {
        id: "high_scorer",
        name: "High Scorer",
        description:
            "Accumulate a serious total score across challenges.",
        requirement:
            "1000 total score",
        icon: "▲",
        rarity: "EPIC"
    },

    {
        id: "score_2500",
        name: "Signal Boost",
        description:
            "Push your accumulated score beyond 2500.",
        requirement:
            "2500 total score",
        icon: "⚡",
        rarity: "LEGENDARY"
    },

    {
        id: "top_ten",
        name: "Top Ten",
        description:
            "Enter the top ten of the savaML leaderboard.",
        requirement:
            "Reach global rank #10",
        icon: "10",
        rarity: "LEGENDARY"
    },

    {
        id: "podium",
        name: "Podium",
        description:
            "Reach the top three on the global leaderboard.",
        requirement:
            "Reach global rank #3",
        icon: "Ⅲ",
        rarity: "LEGENDARY"
    },

    {
        id: "number_one",
        name: "Singularity",
        description:
            "Reach the number one position on savaML.",
        requirement:
            "Reach global rank #1",
        icon: "Ⅰ",
        rarity: "MYTHIC"
    },

    {
        id: "author_five",
        name: "Challenge Designer",
        description:
            "Contribute several original problems to the platform.",
        requirement:
            "5 problems authored",
        icon: "✎",
        rarity: "EPIC"
    },

    {
        id: "author_ten",
        name: "Problem Engineer",
        description:
            "Become one of savaML's major challenge creators.",
        requirement:
            "10 problems authored",
        icon: "⚙",
        rarity: "LEGENDARY"
    },

    {
        id: "profile_complete",
        name: "Identity Online",
        description:
            "Complete every field in your savaML profile.",
        requirement:
            "100% profile completion",
        icon: "◎",
        rarity: "COMMON"
    },

    {
        id: "github_connected",
        name: "Open Source",
        description:
            "Connect your GitHub identity to your savaML profile.",
        requirement:
            "Add GitHub to profile",
        icon: "</>",
        rarity: "COMMON"
    }
];


/* =========================================================
   PROFILE
========================================================= */

function Profile() {

    const {
        token,
        user,
        updateUser
    } = useAuth();


    /* =====================================================
       STATE
    ===================================================== */

    const [isEditing, setIsEditing] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [uploadingPicture, setUploadingPicture] =
        useState(false);


    const [formData, setFormData] =
        useState({
            high_school: "",
            city: "",
            country: "",
            github: "",
            about: ""
        });


    const [stats, setStats] =
        useState({
            problems_authored: 0,
            problems_solved: 0,
            submissions_count: 0,
            total_score: 0,
            average_score: 0,
            perfect_scores: 0,
            global_rank: "-",
            achievements: []
        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    useRevealOnScroll(
        !loading && !!user
    );


    /* =====================================================
       PROFILE PICTURE UPLOAD
    ===================================================== */

    const handleProfilePictureUpload =
        async (file) => {

            if (!file) return;


            const allowedTypes = [
                "image/png",
                "image/jpeg",
                "image/webp"
            ];


            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {
                alert(
                    "Only PNG, JPG/JPEG and WEBP images are allowed."
                );

                return;
            }


            const maxSize =
                5 * 1024 * 1024;


            if (
                file.size >
                maxSize
            ) {
                alert(
                    "Profile picture must be smaller than 5 MB."
                );

                return;
            }


            setUploadingPicture(true);


            const uploadData =
                new FormData();


            uploadData.append(
                "file",
                file
            );


            try {

                const response =
                    await fetch(
                        "http://localhost:5001/api/profile/picture",
                        {
                            method: "POST",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            },

                            body: uploadData
                        }
                    );


                let data;


                try {
                    data =
                        await response.json();
                } catch {
                    data = {
                        message:
                            "Server returned an invalid response."
                    };
                }


                console.log(
                    "PROFILE PICTURE RESPONSE:",
                    data
                );


                if (response.ok) {

                    updateUser(
                        data.user
                    );

                } else {

                    alert(
                        data.message ||
                        data.msg ||
                        "Could not upload profile picture."
                    );

                }

            } catch (error) {

                console.error(
                    "PROFILE PICTURE UPLOAD ERROR:",
                    error
                );


                alert(
                    "Could not upload profile picture."
                );

            } finally {

                setUploadingPicture(false);

            }

        };


    /* =====================================================
       FETCH PROFILE
    ===================================================== */

    useEffect(() => {

        const fetchProfile =
            async () => {

                if (!token) {

                    setLoading(false);

                    return;
                }


                try {

                    const response =
                        await fetch(
                            "http://localhost:5001/api/profile",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );


                    const data =
                        await response.json();


                    if (response.ok) {

                        updateUser(data);

                    } else {

                        console.error(
                            "Could not fetch profile:",
                            data
                        );

                    }

                } catch (error) {

                    console.error(
                        "Could not fetch profile:",
                        error
                    );

                } finally {

                    setLoading(false);

                }

            };


        fetchProfile();

    }, [token]);


    /* =====================================================
       FETCH STATS
    ===================================================== */

    useEffect(() => {

        const fetchStats =
            async () => {

                if (!token) return;


                try {

                    const response =
                        await fetch(
                            "http://localhost:5001/api/profile/stats",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );


                    const data =
                        await response.json();


                    if (response.ok) {

                        setStats(data);

                    } else {

                        console.error(
                            "Could not fetch profile stats:",
                            data
                        );

                    }

                } catch (error) {

                    console.error(
                        "Could not fetch profile stats:",
                        error
                    );

                }

            };


        fetchStats();

    }, [token]);


    /* =====================================================
       SYNC FORM
    ===================================================== */

    useEffect(() => {

        if (!user) return;


        setFormData({
            high_school:
                user.high_school || "",

            city:
                user.city || "",

            country:
                user.country || "",

            github:
                user.github || "",

            about:
                user.about || ""
        });

    }, [user]);


    /* =====================================================
       EDIT FORM
    ===================================================== */

    const handleChange =
        (e) => {

            setFormData({
                ...formData,

                [e.target.name]:
                    e.target.value
            });

        };


    const handleCancel =
        () => {

            setIsEditing(false);


            setFormData({
                high_school:
                    user.high_school || "",

                city:
                    user.city || "",

                country:
                    user.country || "",

                github:
                    user.github || "",

                about:
                    user.about || ""
            });

        };


    const handleSave =
        async () => {

            try {

                const response =
                    await fetch(
                        "http://localhost:5001/api/profile",
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`
                            },

                            body:
                                JSON.stringify(
                                    formData
                                )
                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    updateUser(
                        data.user
                    );

                    setIsEditing(false);

                } else {

                    alert(
                        data.message ||
                        data.msg ||
                        "Could not update profile."
                    );

                }

            } catch (error) {

                console.error(error);

                alert(
                    "Could not update profile."
                );

            }

        };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <main className="profile-page">

                <div className="profile-loading">

                    <span></span>

                    LOADING PROFILE

                </div>

            </main>

        );

    }


    if (!user) {

        return (

            <main className="profile-page">

                <div className="profile-loading">

                    PLEASE LOGIN

                </div>

            </main>

        );

    }


    /* =====================================================
       DERIVED
    ===================================================== */

    const initial =
        user.username
            ?.charAt(0)
            .toUpperCase()
        || "?";


    const completedFields = [
        user.high_school,
        user.city,
        user.country,
        user.github,
        user.about
    ].filter(Boolean).length;


    const completionPercentage =
        (completedFields / 5)
        * 100;


    const profilePictureUrl =
        user.profile_picture
            ? `http://localhost:5001${user.profile_picture}`
            : null;


    /* =====================================================
       LOCKED ACHIEVEMENTS
    ===================================================== */

    const unlockedIds =
        new Set(
            stats.achievements.map(
                (achievement) =>
                    achievement.id
            )
        );


    const lockedAchievements =
        achievementCatalog.filter(
            (achievement) =>
                !unlockedIds.has(
                    achievement.id
                )
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <main className="profile-page">


            {/* =================================================
                AMBIENT
            ================================================= */}

            <div
                className="profile-ambient"
                aria-hidden="true"
            >

                <span className="ambient-dot ambient-a"></span>
                <span className="ambient-dot ambient-b"></span>
                <span className="ambient-dot ambient-c"></span>
                <span className="ambient-dot ambient-d"></span>

                <span className="ambient-line ambient-line-a"></span>
                <span className="ambient-line ambient-line-b"></span>

            </div>


            <div className="profile-shell">


                {/* =================================================
                    HERO
                ================================================= */}

                <section
                    className="
                        profile-hero
                        reveal-on-scroll
                        reveal-hero
                    "
                >

                    <div className="profile-hero-left">

                        <span className="profile-eyebrow">

                            <span className="eyebrow-dot"></span>

                            SAVAML / MEMBER PROFILE

                        </span>


                        <h1>
                            {user.username}
                        </h1>


                        <p>

                            Build. Learn. Experiment.

                            <span>
                                {" "}
                                Your progress lives here.
                            </span>

                        </p>

                    </div>


                    {/* SCATTER */}

                    <div
                        className="profile-scatter"
                        aria-hidden="true"
                    >

                        <div className="scatter-axis scatter-axis-x"></div>
                        <div className="scatter-axis scatter-axis-y"></div>

                        <span className="scatter-dot sd-1"></span>
                        <span className="scatter-dot sd-2"></span>
                        <span className="scatter-dot sd-3"></span>
                        <span className="scatter-dot sd-4"></span>
                        <span className="scatter-dot sd-5"></span>
                        <span className="scatter-dot sd-6"></span>
                        <span className="scatter-dot sd-7"></span>
                        <span className="scatter-dot sd-8"></span>

                        <span className="scatter-link sl-1"></span>
                        <span className="scatter-link sl-2"></span>
                        <span className="scatter-link sl-3"></span>

                        <span className="scatter-label">
                            VECTOR SPACE
                        </span>

                    </div>


                    {/* PROFILE CARD */}

                    <div className="profile-mini-card">


                        <label
                            className="profile-avatar-upload"
                            title="Change profile picture"
                        >

                            {profilePictureUrl ? (

                                <img
                                    src={profilePictureUrl}
                                    alt={user.username}
                                    className="profile-avatar-image"
                                />

                            ) : (

                                <div className="profile-mini-avatar">
                                    {initial}
                                </div>

                            )}


                            <span className="avatar-upload-overlay">

                                {uploadingPicture
                                    ? "UPLOADING..."
                                    : "CHANGE"}

                            </span>


                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                hidden
                                disabled={uploadingPicture}
                                onChange={(e) => {

                                    const file =
                                        e.target.files?.[0];


                                    if (!file) return;


                                    handleProfilePictureUpload(
                                        file
                                    );


                                    e.target.value = "";

                                }}
                            />

                        </label>


                        <div className="profile-mini-content">

                            <strong>
                                {user.username}
                            </strong>


                            <span>

                                {user.role === "admin"
                                    ? "ADMIN / FOUNDER"
                                    : "SAVAML MEMBER"}

                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    setIsEditing(true)
                                }
                            >
                                Edit profile →
                            </button>

                        </div>

                    </div>

                </section>


                <div className="profile-divider"></div>


                {/* =================================================
                    STATS
                ================================================= */}

                <section
                    className="
                        profile-stats
                        reveal-on-scroll
                        reveal-stats
                    "
                >

                    <div className="profile-stat">

                        <span className="stat-label">
                            PROBLEMS SOLVED
                        </span>

                        <strong>
                            {stats.problems_solved}
                        </strong>

                        <small>
                            {stats.submissions_count} submissions
                        </small>

                    </div>


                    <div className="profile-stat">

                        <span className="stat-label">
                            AUTHORED
                        </span>

                        <strong>
                            {stats.problems_authored}
                        </strong>

                        <small>
                            published problems
                        </small>

                    </div>


                    <div className="profile-stat">

                        <span className="stat-label">
                            SCORE
                        </span>

                        <strong>
                            {stats.total_score}
                        </strong>

                        <small>
                            average {stats.average_score}
                        </small>

                    </div>


                    <div className="profile-stat">

                        <span className="stat-label">
                            GLOBAL RANK
                        </span>

                        <strong>
                            #{stats.global_rank}
                        </strong>

                        <small>
                            savaML leaderboard
                        </small>

                    </div>

                </section>


                {/* =================================================
                    DASHBOARD
                ================================================= */}

                <section className="profile-dashboard">


                    {/* =================================================
                        ABOUT SIDEBAR
                    ================================================= */}

                    <aside
                        className="
                            profile-about-card
                            reveal-on-scroll
                            reveal-about
                        "
                    >

                        <div className="profile-card-heading">

                            <div>

                                <span className="heading-icon">
                                    ◎
                                </span>

                                <h2>
                                    About
                                </h2>

                            </div>


                            {!isEditing && (

                                <button
                                    type="button"
                                    className="small-edit-button"
                                    onClick={() =>
                                        setIsEditing(true)
                                    }
                                >
                                    EDIT
                                </button>

                            )}

                        </div>


                        <div className="about-list">


                            <div className="about-row">

                                <span className="about-icon">
                                    ◉
                                </span>

                                <div>

                                    <small>
                                        USERNAME
                                    </small>

                                    <p>
                                        {user.username}
                                    </p>

                                </div>

                            </div>


                            <div className="about-row">

                                <span className="about-icon">
                                    ✉
                                </span>

                                <div>

                                    <small>
                                        EMAIL
                                    </small>

                                    <p className="accent-value">
                                        {user.email}
                                    </p>

                                </div>

                            </div>


                            <div className="about-row">

                                <span className="about-icon">
                                    ◇
                                </span>

                                <div>

                                    <small>
                                        CITY
                                    </small>


                                    {isEditing ? (

                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Your city"
                                        />

                                    ) : (

                                        <p>
                                            {user.city ||
                                                "Not specified"}
                                        </p>

                                    )}

                                </div>

                            </div>


                            <div className="about-row">

                                <span className="about-icon">
                                    ◎
                                </span>

                                <div>

                                    <small>
                                        COUNTRY
                                    </small>


                                    {isEditing ? (

                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            placeholder="Your country"
                                        />

                                    ) : (

                                        <p>
                                            {user.country ||
                                                "Not specified"}
                                        </p>

                                    )}

                                </div>

                            </div>


                        </div>


                        {/* INSTITUTION */}

                        <div className="profile-subsection">

                            <span className="subsection-label">
                                INSTITUTION
                            </span>


                            {isEditing ? (

                                <input
                                    type="text"
                                    className="wide-profile-input"
                                    name="high_school"
                                    value={formData.high_school}
                                    onChange={handleChange}
                                    placeholder="High school"
                                />

                            ) : (

                                <>

                                    <h3>
                                        {user.high_school ||
                                            "No institution specified"}
                                    </h3>

                                    <p>
                                        {user.city ||
                                            "Unknown location"}

                                        {user.country
                                            ? `, ${user.country}`
                                            : ""}
                                    </p>

                                </>

                            )}

                        </div>


                        {/* GITHUB */}

                        <div className="profile-subsection">

                            <span className="subsection-label">
                                GITHUB
                            </span>


                            {isEditing ? (

                                <input
                                    type="text"
                                    className="wide-profile-input"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    placeholder="GitHub username or URL"
                                />

                            ) : user.github ? (

                                <a
                                    className="github-link"
                                    href={
                                        user.github.startsWith("http")
                                            ? user.github
                                            : `https://github.com/${user.github}`
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    ↗ {user.github}
                                </a>

                            ) : (

                                <p className="empty-value">
                                    Not connected
                                </p>

                            )}

                        </div>

                    </aside>


                    {/* =================================================
                        MAIN COLUMN
                    ================================================= */}

                    <div className="profile-main-column">


                        {/* MEMBER */}

                        <section
                            className="
                                dashboard-card
                                member-card
                                reveal-on-scroll
                                reveal-member
                            "
                        >

                            <div className="dashboard-card-header">

                                <div>

                                    <span className="card-kicker">
                                        ◇ MEMBER SYSTEM
                                    </span>

                                    <h2>
                                        Your savaML identity
                                    </h2>

                                </div>


                                <span className="member-status">

                                    <span></span>

                                    ACTIVE

                                </span>

                            </div>


                            <div className="member-overview">


                                {profilePictureUrl ? (

                                    <img
                                        src={profilePictureUrl}
                                        alt={user.username}
                                        className="large-profile-avatar-image"
                                    />

                                ) : (

                                    <div className="large-profile-avatar">
                                        {initial}
                                    </div>

                                )}


                                <div className="member-data">

                                    <span>
                                        USERNAME
                                    </span>

                                    <strong>
                                        {user.username}
                                    </strong>

                                </div>


                                <div className="member-data">

                                    <span>
                                        ROLE
                                    </span>

                                    <strong>
                                        {user.role || "user"}
                                    </strong>

                                </div>


                                <div className="member-data">

                                    <span>
                                        NETWORK
                                    </span>

                                    <strong>
                                        savaML
                                    </strong>

                                </div>

                            </div>


                            <div className="member-progress">

                                <div>

                                    <span>
                                        PROFILE COMPLETION
                                    </span>

                                    <span>
                                        {completedFields} / 5
                                    </span>

                                </div>


                                <div className="progress-track">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width:
                                                `${completionPercentage}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </section>


                        {/* ABOUT ME */}

                        <section
                            className="
                                dashboard-card
                                bio-card
                                reveal-on-scroll
                                reveal-bio
                            "
                        >

                            <div className="dashboard-card-header">

                                <div>

                                    <span className="card-kicker mint-kicker">
                                        ✦ ABOUT ME
                                    </span>

                                    <h2>
                                        A little about you.
                                    </h2>

                                </div>

                            </div>


                            {isEditing ? (

                                <textarea
                                    className="profile-about-editor"
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    placeholder="Tell the savaML community about yourself..."
                                />

                            ) : (

                                <p className="profile-about-text">

                                    {user.about ||
                                        "You haven't written anything about yourself yet. Add a short description to complete your profile."}

                                </p>

                            )}

                        </section>


                        {/* =================================================
                            UNLOCKED ACHIEVEMENTS
                        ================================================= */}

                        <section
                            className="
                                dashboard-card
                                achievements-card
                                reveal-on-scroll
                                reveal-achievements
                            "
                        >

                            <div className="dashboard-card-header">

                                <div>

                                    <span className="card-kicker">
                                        ✦ ACHIEVEMENTS
                                    </span>

                                    <h2>
                                        Achievement showcase
                                    </h2>

                                </div>


                                <span className="achievement-count">
                                    {stats.achievements.length} UNLOCKED
                                </span>

                            </div>


                            {stats.achievements.length > 0 ? (

                                <div className="achievements-grid">

                                    {stats.achievements.map(
                                        (achievement) => (

                                            <div
                                                key={achievement.id}
                                                className={
                                                    `achievement-card ${achievement.rarity?.toLowerCase()}`
                                                }
                                            >

                                                <span className="achievement-rarity">
                                                    {achievement.rarity}
                                                </span>


                                                <div className="achievement-icon">
                                                    {achievement.icon}
                                                </div>


                                                <div className="achievement-content">

                                                    <strong>
                                                        {achievement.name}
                                                    </strong>

                                                    <p>
                                                        {achievement.description}
                                                    </p>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <div className="no-achievements">

                                    <div className="empty-achievement-orbit">
                                        <span></span>
                                    </div>

                                    <div>

                                        <strong>
                                            No achievements yet.
                                        </strong>

                                        <p>
                                            Solve your first problem
                                            to unlock your first badge.
                                        </p>

                                    </div>

                                </div>

                            )}

                        </section>


                        {/* =================================================
                            LOCKED ACHIEVEMENTS
                        ================================================= */}

                        <section
                            className="
                                dashboard-card
                                locked-achievements-section
                                reveal-on-scroll
                                reveal-achievements
                            "
                        >

                            <div className="dashboard-card-header">

                                <div>

                                    <span className="card-kicker mint-kicker">
                                        ◇ NEXT MILESTONES
                                    </span>

                                    <h2>
                                        Not yet achieved
                                    </h2>

                                </div>


                                <span className="achievement-count">

                                    {lockedAchievements.length} LOCKED

                                </span>

                            </div>


                            {lockedAchievements.length > 0 ? (

                                <div className="locked-achievement-scroll">

                                    <div className="locked-achievement-track">

                                        {lockedAchievements.map(
                                            (
                                                achievement,
                                                index
                                            ) => (

                                                <article
                                                    key={achievement.id}
                                                    className={`
                                                        locked-achievement-card
                                                        locked-${achievement.rarity.toLowerCase()}
                                                    `}
                                                >

                                                    <span className="locked-card-number">

                                                        {String(
                                                            index + 1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}

                                                    </span>


                                                    <div className="locked-card-icon">

                                                        {achievement.icon}

                                                    </div>


                                                    <span className="locked-card-status">

                                                        LOCKED

                                                    </span>


                                                    <span className="locked-card-rarity">

                                                        {achievement.rarity}

                                                    </span>


                                                    <h3>

                                                        {achievement.name}

                                                    </h3>


                                                    <p>

                                                        {achievement.description}

                                                    </p>


                                                    <div className="locked-card-requirement">

                                                        <span></span>

                                                        {achievement.requirement}

                                                    </div>

                                                </article>

                                            )
                                        )}

                                    </div>

                                </div>

                            ) : (

                                <div className="all-achievements-complete">

                                    <span>
                                        ✦
                                    </span>

                                    <div>

                                        <strong>
                                            Everything unlocked.
                                        </strong>

                                        <p>
                                            You've completed every
                                            currently available
                                            savaML achievement.
                                        </p>

                                    </div>

                                </div>

                            )}

                        </section>


                    </div>

                </section>


                {/* =================================================
                    EDIT BAR
                ================================================= */}

                {isEditing && (

                    <div className="profile-edit-bar">

                        <div>

                            <span>
                                EDIT MODE
                            </span>

                            <p>
                                Update your savaML profile information.
                            </p>

                        </div>


                        <div className="profile-edit-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                className="save-btn"
                                onClick={handleSave}
                            >
                                Save Changes →
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </main>

    );
}


export default Profile;