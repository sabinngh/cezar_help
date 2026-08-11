import { useState } from "react";

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
        <div>
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    required
                />

                <br />
                <br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Sign Up
                </button>

            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;