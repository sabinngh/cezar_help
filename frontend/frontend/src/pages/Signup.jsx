import { useState } from "react";

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Button clicked!")

        const response = await fetch("http://localhost:5000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);

            setUsername("");
            setEmail("");
            setPassword("");
        }
        else{ 
            setMessage(data.message);
        }
        console.log(data);
    }

    return (
        <div>
            <h1>Signup</h1>
        

            <form onSubmit={handleSubmit}>

                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                 <br />
                 <br />

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button type="submit">
                    Sign Up
                </button>


            </form>

            {message && <p>{message}</p>}

        </div>
    )
}

export default Signup;