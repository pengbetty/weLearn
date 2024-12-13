import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Css/AppNavbar.css";

export const AppNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(role, "role in navbar");

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
                  to="/colleges"
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
                  College
                </Link>
              </li>

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

              <li className="nav-item" style={{ margin: "0 10px" }}>
                <Link
                  className="nav-link btn"
                  to="/profile"
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
                  Profile
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
              <a className="btn btn-outline-success me-2" href="/login">
                Login
              </a>
              <a className="btn btn-outline-success" href="/sign">
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// export const AppNavbar = () => {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <a className="navbar-brand" href="#">
//         WeLearn
//       </a>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarNav"
//         aria-controls="navbarNav"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div
//         className="collapse navbar-collapse justify-content-end"
//         id="navbarNav"
//       >
//         <div className="navbar-nav">
//           {(role === "admin" || role === "agent") && (
//             <ul
//               style={{
//                 display: "flex",
//                 listStyleType: "none",
//                 padding: 0,
//                 margin: 0,
//               }}
//             >
//               <li className="nav-item" style={{ margin: "0 10px" }}>
//                 <Link
//                   className="nav-link btn"
//                   to="/colleges"
//                   style={{
//                     padding: "10px 20px",
//                     borderRadius: "8px",
//                     backgroundColor: "#007BFF",
//                     color: "#fff",
//                     textDecoration: "none",
//                     transition: "background-color 0.3s ease",
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.target.style.backgroundColor = "#0056b3")
//                   }
//                   onMouseOut={(e) =>
//                     (e.target.style.backgroundColor = "#007BFF")
//                   }
//                 >
//                   Colleges
//                 </Link>
//               </li>
//               <li className="nav-item" style={{ margin: "0 10px" }}>
//                 <Link
//                   className="nav-link btn"
//                   to="/student"
//                   style={{
//                     padding: "10px 20px",
//                     borderRadius: "8px",
//                     backgroundColor: "#007BFF",
//                     color: "#fff",
//                     textDecoration: "none",
//                     transition: "background-color 0.3s ease",
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.target.style.backgroundColor = "#0056b3")
//                   }
//                   onMouseOut={(e) =>
//                     (e.target.style.backgroundColor = "#007BFF")
//                   }
//                 >
//                   Student
//                 </Link>
//               </li>
//               <li className="nav-item" style={{ margin: "0 10px" }}>
//                 <Link
//                   className="nav-link btn"
//                   to="/contract"
//                   style={{
//                     padding: "10px 20px",
//                     borderRadius: "8px",
//                     backgroundColor: "#28A745",
//                     color: "#fff",
//                     textDecoration: "none",
//                     transition: "background-color 0.3s ease",
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.target.style.backgroundColor = "#218838")
//                   }
//                   onMouseOut={(e) =>
//                     (e.target.style.backgroundColor = "#28A745")
//                   }
//                 >
//                   Contract
//                 </Link>
//               </li>
//             </ul>
//           )}
//           {token ? (
//             <button className="btn btn-outline-danger" onClick={handleLogout}>
//               Logout
//             </button>
//           ) : (
//             <>
//               <a className="btn btn-outline-primary me-2" href="/login">
//                 Login
//               </a>
//               <a className="btn btn-primary" href="/sign">
//                 Sign Up
//               </a>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// /*
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./AppNavbar.css"; // Add CSS for centralized styling.

// export const AppNavbar = () => {
//   const navigate = useNavigate();

//   // Handle user logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   // Fetch token and role from localStorage
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // Check if user has specific roles
//   const hasAccess = (allowedRoles) => allowedRoles.includes(role);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <Link className="navbar-brand" to="/" aria-label="Home">
//         WeLearn
//       </Link>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarNav"
//         aria-controls="navbarNav"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div
//         className="collapse navbar-collapse justify-content-end"
//         id="navbarNav"
//       >
//         <div className="navbar-nav">
//           {hasAccess(["admin", "agent"]) && (
//             <ul className="navbar-list">
//               <li className="nav-item">
//                 <Link
//                   className="nav-link nav-btn student-btn"
//                   to="/student"
//                   aria-label="Student Management"
//                 >
//                   Student
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   className="nav-link nav-btn contract-btn"
//                   to="/contract"
//                   aria-label="Contract Management"
//                 >
//                   Contract
//                 </Link>
//               </li>
//             </ul>
//           )}
//           {token ? (
//             <button
//               className="btn btn-outline-danger"
//               onClick={handleLogout}
//               aria-label="Logout"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <Link
//                 className="btn btn-outline-primary me-2"
//                 to="/login"
//                 aria-label="Login"
//               >
//                 Login
//               </Link>
//               <Link className="btn btn-primary" to="/sign" aria-label="Sign Up">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };
// */
