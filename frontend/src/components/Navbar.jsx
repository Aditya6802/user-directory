import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">👤</span>
        User Directory
      </div>
      <div className="navbar-links">
        <button
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Users
        </button>
        <button
          className={`nav-link ${location.pathname === "/add-user" ? "active" : ""}`}
          onClick={() => navigate("/add-user")}
        >
          Add User
        </button>
      </div>
    </nav>
  );
}

export default Navbar;