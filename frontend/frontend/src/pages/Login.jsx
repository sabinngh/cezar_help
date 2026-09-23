import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            console.log(
                "RESPONSE STATUS:",
                response.status
            );

            console.log(
                "LOGIN DATA:",
                data
            );


            if (response.ok) {

                /*
                 * IMPORTANT:
                 *
                 * access_token = tokenul JWT
                 * user         = obiectul cu username, email etc.
                 */

                login(
                    data.access_token,
                    data.user
                );

                navigate("/");

            } else {

                setMessage(
                    data.message ||
                    "Invalid email or password."
                );

            }

        } catch (error) {

            console.error(error);

            setMessage(
                "Could not connect to the server."
            );

        }

    };


    return (

        <div className="login-page">


            {/* =====================================================
                ANIMATED BACKGROUND
            ===================================================== */}

            <div className="login-background">


                {/* GRID */}

                <div className="login-grid"></div>


                {/* BLURRED GLOWS */}

                <div className="login-glow login-glow-one"></div>

                <div className="login-glow login-glow-two"></div>

                <div className="login-glow login-glow-three"></div>


                {/* PARTICLES */}

                <div className="login-particle particle-1"></div>

                <div className="login-particle particle-2"></div>

                <div className="login-particle particle-3"></div>

                <div className="login-particle particle-4"></div>

                <div className="login-particle particle-5"></div>

                <div className="login-particle particle-6"></div>

                <div className="login-particle particle-7"></div>

                <div className="login-particle particle-8"></div>


            </div>


            {/* =====================================================
                LOGIN CARD
            ===================================================== */}

            <div className="login-card">


                {/* PURPLE LINE */}

                <div className="login-card-line"></div>


                {/* =================================================
                    TITLE
                ================================================= */}

                <h1 className="login-title">

                    Welcome <span>Back</span>

                </h1>


                <p className="login-subtitle">

                    // ACCESS YOUR ACCOUNT

                </p>


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >


                    {/* EMAIL */}

                    <div className="login-form-group">

                        <label htmlFor="email">
                            Email
                        </label>


                        <input
                            id="email"

                            type="email"

                            className="login-input"

                            placeholder="Enter your email"

                            value={email}

                            onChange={(e) =>
                                setEmail(e.target.value)
                            }

                            autoComplete="email"

                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="login-form-group">

                        <label htmlFor="password">
                            Password
                        </label>


                        <input
                            id="password"

                            type="password"

                            className="login-input"

                            placeholder="Enter your password"

                            value={password}

                            onChange={(e) =>
                                setPassword(e.target.value)
                            }

                            autoComplete="current-password"

                            required
                        />

                    </div>


                    {/* =================================================
                        LOGIN BUTTON
                    ================================================= */}

                    <button
                        type="submit"
                        className="login-button"
                    >

                        LOG IN

                    </button>


                </form>


                {/* =================================================
                    ERROR MESSAGE
                ================================================= */}

                {message && (

                    <div className="login-message">

                        {message}

                    </div>

                )}


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="login-footer">

                    <span>
                        sava.py // AUTHENTICATION SYSTEM
                    </span>

                </div>


            </div>


        </div>

    );

}

export default Login;