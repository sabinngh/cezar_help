import { useState } from "react";
import "../styles/signup.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("Creating account...");

        try {
            const response = await fetch("http://localhost:5001/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || "User created!");

                setUsername("");
                setEmail("");
                setPassword("");
            } else {
                setMessage(data.message || "Signup failed");
            }

        } catch (error) {
            console.error(error);
            setMessage("Could not connect to the server.");
        }
    };

    return (
        <div className="signup-page">

            <div className="signup-card">

                <h1 className="signup-title">
                    Create <span>account.</span>
                </h1>

                <p className="signup-subtitle">
                    // initialize your savaML profile
                </p>


                <form
                    className="signup-form"
                    onSubmit={handleSubmit}
                >

                    <div className="signup-form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            className="signup-input"
                            type="text"
                            placeholder="your_username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            required
                        />
                    </div>


                    <div className="signup-form-group">
                        <label htmlFor="signup-email">
                            Email
                        </label>

                        <input
                            id="signup-email"
                            className="signup-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            required
                        />
                    </div>


                    <div className="signup-form-group">
                        <label htmlFor="signup-password">
                            Password
                        </label>

                        <input
                            id="signup-password"
                            className="signup-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            required
                        />
                    </div>


                    <button
                        className="signup-button"
                        type="submit"
                    >
                        [ CREATE ACCOUNT ]
                    </button>

                </form>


                {message && (
                    <p className="signup-message">
                        {message}
                    </p>
                )}


                <div className="signup-footer">
                    savaML // account registration
                </div>

            </div>

        </div>
    );
}

export default Signup;