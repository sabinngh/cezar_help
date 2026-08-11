import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
    const navigate = useNavigate();

    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav>
            <Link to="/">Home</Link>

            <div>
                {!isLoggedIn ? (
                    <>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                ) : (
                    <div>
                        <span>👤 You are logged in</span>

                        <button onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                )}
            </div>

            <Link to="/meet-the-team">
                Meet The Team
            </Link>
        </nav>
    );
}

export default Navbar;