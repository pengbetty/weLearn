import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AppNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        WeLearn
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <div className="navbar-nav">
          {(role === "admin" || role === "agent") && (
            <ul
              style={{
                display: "flex",
                listStyleType: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li className="nav-item" style={{ margin: "0 10px" }}>
                <Link
                  className="nav-link btn"
                  to="/student"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    textDecoration: "none",
                    transition: "background-color 0.3s ease",
                    fontWeight: "bold",
                    fontSize: "14px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#007BFF")
                  }
                >
                  Student
                </Link>
              </li>
              <li className="nav-item" style={{ margin: "0 10px" }}>
                <Link
                  className="nav-link btn"
                  to="/contract"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    backgroundColor: "#28A745",
                    color: "#fff",
                    textDecoration: "none",
                    transition: "background-color 0.3s ease",
                    fontWeight: "bold",
                    fontSize: "14px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#218838")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#28A745")
                  }
                >
                  Contract
                </Link>
              </li>
            </ul>
          )}
          {token ? (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <a className="btn btn-outline-primary me-2" href="/login">
                Login
              </a>
              <a className="btn btn-primary" href="/sign">
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
