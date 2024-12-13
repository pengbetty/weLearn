import { useState, useEffect } from "react";
import axios from "axios";
import "../Css/home.css";
import { BASE_URL } from "../../Constant/constant";

export const Home = () => {
  const [formData, setFormData] = useState({
    programLevel: "UG",
    country: "US",
    programName: "",
  });
  const [collegeSearch, setCollegeSearch] = useState("");
  const [programs, setPrograms] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showCollegeModal, setShowCollegeModal] = useState(false);

  useEffect(() => {
    const defaultInputs = document.querySelectorAll(
      "input[name='programLevel'], input[name='country']"
    );
    defaultInputs.forEach((input) => {
      if (input.value === "UG" || input.value === "US") {
        input.checked = true;
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCollegeChange = (e) => {
    setCollegeSearch(e.target.value);
  };

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}/api/programs`, {
        params: {
          programLevel: formData.programLevel,
          country: formData.country,
          programName: formData.programName,
        },
      });
      setPrograms(response.data.programs);
      setShowProgramModal(true);
    } catch (error) {
      console.error("Error fetching programs:", error);
      alert("Error fetching programs. Please try again.");
    }
  };

  const handleCollegeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}/api/colleges`, {
        params: { search: collegeSearch },
      });
      setColleges(response.data.colleges);
      setShowCollegeModal(true);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      alert("Error fetching colleges. Please try again.");
    }
  };

  const handleCloseModals = () => {
    setShowProgramModal(false);
    setShowCollegeModal(false);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="search-box p-5 border rounded shadow-sm bg-white">
          <h3 className="mb-4 text-center">Find Your Programs</h3>
          <form onSubmit={handleProgramSubmit}>
            <div className="form-group mb-4">
              <label className="form-label fw-bold">Application Level</label>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="programLevel"
                    id="ug"
                    value="UG"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="ug">
                    Undergraduate (UG)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="programLevel"
                    id="pg"
                    value="PG"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="pg">
                    Postgraduate (PG)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="programLevel"
                    id="diploma"
                    value="Diploma"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="associate">
                    Associate Degree
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label fw-bold">Country</label>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="country"
                    id="us"
                    value="US"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="us">
                    United States
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="country"
                    id="uk"
                    value="UK"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="uk">
                    United Kingdom
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="country"
                    id="aus"
                    value="Australia"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="aus">
                    Australia
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label fw-bold">Program Name</label>
              <input
                type="text"
                className="form-control"
                name="programName"
                value={formData.programName}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Search Programs
            </button>
          </form>
        </div>

        <div className="search-box p-5 border rounded shadow-sm bg-white mt-4">
          <h3 className="mb-4 text-center">Search for Colleges</h3>
          <form onSubmit={handleCollegeSubmit}>
            <div className="form-group mb-4">
              <label className="form-label fw-bold">College Name</label>
              <input
                type="text"
                className="form-control"
                value={collegeSearch}
                onChange={handleCollegeChange}
                placeholder="Enter college name"
              />
            </div>
            <button type="submit" className="btn btn-secondary mt-3">
              Search Colleges
            </button>
          </form>
        </div>
      </div>

      {showProgramModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Program Results</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModals}
                ></button>
              </div>
              <div className="modal-body">
                {programs.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="table-dark">
                        <tr>
                          <th>Program Name</th>
                          <th>College Name</th>
                          <th>Level</th>
                          <th>Program Length</th>
                          <th>Application Deadline</th>
                          <th>Program Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {programs.map((program, index) => (
                          <tr key={index}>
                            <td>{program.programName}</td>
                            <td>{program.college.collegeName}</td>
                            <td>{program.programLevel}</td>
                            <td>{program.programLength}</td>
                            <td>{program.appDeadline}</td>
                            <td>
                              <a
                                href={program.programLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Program
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center">No programs found.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModals}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showCollegeModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">College Results</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModals}
                ></button>
              </div>
              <div className="modal-body">
                {colleges.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="table-dark">
                        <tr>
                          <th>College Name</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Country</th>
                          <th>Environment</th>
                          <th>UG Number</th>
                          <th>PG Number</th>
                          <th>US Ranking</th>
                          <th>QS Ranking</th>
                          <th>College Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {colleges.map((college, index) => (
                          <tr key={index}>
                            <td>{college.collegeName}</td>
                            <td>{college.city}</td>
                            <td>{college.state || "N/A"}</td>
                            <td>{college.country}</td>
                            <td>{college.environment}</td>
                            <td>{college.ugNumber}</td>
                            <td>{college.pgNumber}</td>
                            <td>{college.usRanking || "N/A"}</td>
                            <td>{college.qsRanking || "N/A"}</td>
                            <td>
                              <a
                                href={`https://${college.collegeLink}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Visit College
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center">No colleges found.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModals}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// import React, { useState } from "react";
// import axios from "axios";
// import { AppNavbar } from "./Navbar";
// import "../Css/home.css";
// import { BASE_URL } from "../../Constant/constant";

// export const Home = () => {
//   const [formData, setFormData] = useState({
//     PLevel: "",
//     country: "",
//     programName: "",
//   });
//   const [collegeSearch, setCollegeSearch] = useState("");
//   const [programs, setPrograms] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [showProgramModal, setShowProgramModal] = useState(false);
//   const [showCollegeModal, setShowCollegeModal] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleCollegeChange = (e) => {
//     setCollegeSearch(e.target.value);
//   };

//   const handleProgramSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`${BASE_URL}/api/programs`, {
//         params: {
//           PLevel: formData.PLevel,
//           country: formData.country,
//           programName: formData.programName,
//         },
//       });
//       setPrograms(response.data.programs);
//       setShowProgramModal(true);
//     } catch (error) {
//       console.error("Error fetching programs:", error);
//       alert("Error fetching programs. Please try again.");
//     }
//   };

//   const handleCollegeSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`${BASE_URL}/api/colleges`, {
//         params: { search: collegeSearch },
//       });
//       setColleges(response.data.colleges);
//       setShowCollegeModal(true);
//     } catch (error) {
//       console.error("Error fetching colleges:", error);
//       alert("Error fetching colleges. Please try again.");
//     }
//   };

//   const handleCloseModals = () => {
//     setShowProgramModal(false);
//     setShowCollegeModal(false);
//   };

//   return (
//     <>
//       <AppNavbar />
//       <div className="container mt-5">
//         <div className="search-box p-5 border rounded shadow-sm bg-white">
//           <h3 className="mb-4 text-center">Find Your Programs</h3>
//           <form onSubmit={handleProgramSubmit}>
//             <div className="form-group mb-4">
//               <label className="form-label fw-bold">Application Level</label>
//               <div className="d-flex justify-content-between align-items-center">
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="PLevel"
//                     id="ug"
//                     value="UG"
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="ug">
//                     Undergraduate (UG)
//                   </label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="PLevel"
//                     id="pg"
//                     value="PG"
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="pg">
//                     Postgraduate (PG)
//                   </label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="PLevel"
//                     id="associate"
//                     value="Associate"
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="associate">
//                     Associate Degree
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="form-group mb-4">
//               <label className="form-label fw-bold">Country</label>
//               <div className="d-flex justify-content-between align-items-center">
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="country"
//                     id="us"
//                     value="US"
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="us">
//                     United States
//                   </label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="country"
//                     id="uk"
//                     value="UK"
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="uk">
//                     United Kingdom
//                   </label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="country"
//                     id="aus"
//                     value="Australia"
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="aus">
//                     Australia
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="form-group mb-4">
//               <label className="form-label fw-bold">Program Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="programName"
//                 value={formData.programName}
//                 onChange={handleChange}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary mt-3">
//               Search Programs
//             </button>
//           </form>
//         </div>

//         <div className="search-box p-5 border rounded shadow-sm bg-white mt-4">
//           <h3 className="mb-4 text-center">Search for Colleges</h3>
//           <form onSubmit={handleCollegeSubmit}>
//             <div className="form-group mb-4">
//               <label className="form-label fw-bold">College Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={collegeSearch}
//                 onChange={handleCollegeChange}
//                 placeholder="Enter college name"
//               />
//             </div>
//             <button type="submit" className="btn btn-secondary mt-3">
//               Search Colleges
//             </button>
//           </form>
//         </div>
//       </div>

//       {showProgramModal && (
//         <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Program Results</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={handleCloseModals}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {programs.length > 0 ? (
//                   <div className="table-responsive">
//                     <table className="table table-striped table-bordered">
//                       <thead className="table-dark">
//                         <tr>
//                           <th>Program Name</th>
//                           <th>College Name</th>
//                           <th>Level</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {programs.map((program, index) => (
//                           <tr key={index}>
//                             <td>{program.PName}</td>
//                             <td>{program.College.Name}</td>
//                             <td>{program.PLevel}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p className="text-center">No programs found.</p>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={handleCloseModals}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {showCollegeModal && (
//         <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//           <div className="modal-dialog modal-lg" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">College Results</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={handleCloseModals}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {colleges.length > 0 ? (
//                   <div className="table-responsive">
//                     <table className="table table-striped table-bordered">
//                       <thead className="table-dark">
//                         <tr>
//                           <th>College Name</th>
//                           <th>City</th>
//                           <th>Country</th>
//                           <th>Link</th>
//                           <th>Ug Number</th>
//                           <th>Pg Number</th>
//                           <th>US Ranking</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {colleges.map((college, index) => (
//                           <tr key={index}>
//                             <td>{college.Name}</td>
//                             <td>{college.City}</td>
//                             <td>{college.Country}</td>
//                             <td>{college.Link}</td>
//                             <td>{college.UGNumber}</td>
//                             <td>{college.PGNumber}</td>
//                             <td>{college.USRanking || "N/A"}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p className="text-center">No colleges found.</p>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={handleCloseModals}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
