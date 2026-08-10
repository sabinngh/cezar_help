import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>{" | "}
            <Link to="/login">Login</Link>{" | "}
            <Link to="/signup">Signup</Link>{" | "}
            <Link to="/meet-the-team">MeetTheTeam</Link>
        </nav>
    );
}

export default Navbar;