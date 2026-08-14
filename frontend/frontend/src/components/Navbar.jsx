import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">

            {/* Logo */}
            <Link to="/" className="navbar-logo">
                sava<span>ML</span>
            </Link>

            {/* Pages */}
            <div className="navbar-links">
                <Link to="/" className="nav-link">
                    Home
                </Link>

                <Link to="/problems" className="nav-link">
                    Problems
                </Link>

                <Link to="/learning" className="nav-link">
                    Learning
                </Link>

                <Link to="/meet-the-team" className="nav-link">
                    Meet The Team
                </Link>
            </div>

            {/* User section */}
            <div className="navbar-user">

                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="user-container">

                            <div className="user-avatar">
                                {user?.username?.charAt(0).toUpperCase()}
                            </div>

                            <span className="username">
                                {user?.username}
                            </span>

                        </Link>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="login-button">
                            Log In
                        </Link>

                        <Link to="/signup" className="signup-button">
                            Sign Up
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;