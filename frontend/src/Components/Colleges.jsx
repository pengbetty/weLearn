import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/home.css";
import "../Css/college.css";
import { BASE_URL } from "../../Constant/constant";
import { Link } from "react-router-dom";
import { UpdateCollegeModal } from "./UpdateCollegeModal";

export const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCollege, setEditingCollege] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchColleges = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/listcolleges`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.colleges);
      setColleges(response.data.colleges);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      alert("Failed to fetch colleges. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleEdit = (collegeId) => {
    console.log(collegeId);
    const college = colleges.find((c) => c.collegeID === collegeId);
    console.log(college);
    setEditingCollege(college);
    setIsModalOpen(true);
  };

  const handleDelete = async (collegeId) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      try {
        await axios.delete(`${BASE_URL}/api/colleges/${collegeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setColleges(colleges.filter((college) => college.ID !== collegeId));
        alert("College deleted successfully.");
      } catch (error) {
        console.error("Error deleting college:", error);
        alert("Failed to delete college. Please try again.");
      }
    }
  };

  const handleUpdate = () => {
    fetchColleges();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="page-title">College Management</h1>
          <Link
            to="/create-college"
            className="btn btn-primary btn-lg create-college-btn"
          >
            + Create College
          </Link>
        </div>
        {loading ? (
          <p className="text-center">Loading colleges...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Environment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {colleges.length > 0 ? (
                  colleges.map((college) => (
                    <tr key={college.collegeID}>
                      <td>{college.collegeID}</td>
                      <td>{college.collegeName}</td>
                      <td>{college.city}</td>
                      <td>{college.state}</td>
                      <td>{college.country}</td>
                      <td>{college.environment}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(college.collegeID)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(college.collegeID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No colleges found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <UpdateCollegeModal
          college={editingCollege}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../Css/home.css";
// import { BASE_URL } from "../../Constant/constant";
// import { Link } from "react-router-dom";
// import { UpdateCollegeModal } from "./UpdateCollegeModal";

// export const Colleges = () => {
//   const [colleges, setColleges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCollege, setEditingCollege] = useState(null); // College being edited
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchColleges = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/listcolleges`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setColleges(response.data.colleges);
//       } catch (error) {
//         console.error("Error fetching colleges:", error);
//         alert("Failed to fetch colleges. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchColleges();
//   }, []);

//   const handleEdit = (collegeId) => {
//     const college = colleges.find((c) => c.ID === collegeId);
//     setEditingCollege(college);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (collegeId) => {
//     if (window.confirm("Are you sure you want to delete this college?")) {
//       try {
//         await axios.delete(`${BASE_URL}/api/colleges/${collegeId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setColleges(colleges.filter((college) => college.ID !== collegeId));
//         alert("College deleted successfully.");
//       } catch (error) {
//         console.error("Error deleting college:", error);
//         alert("Failed to delete college. Please try again.");
//       }
//     }
//   };

//   const handleUpdate = (updatedCollege) => {
//     setColleges((prevColleges) =>
//       prevColleges.map((college) =>
//         college.ID === updatedCollege.ID ? updatedCollege : college
//       )
//     );
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <div className="container mt-5">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h1 className="page-title">College Management</h1>
//           <Link
//             to="/create-college"
//             className="btn btn-primary btn-lg create-college-btn"
//           >
//             + Create College
//           </Link>
//         </div>
//         {loading ? (
//           <p className="text-center">Loading colleges...</p>
//         ) : (
//           <div className="table-responsive">
//             <table className="table table-striped table-bordered">
//               <thead className="table-dark">
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>City</th>
//                   <th>State</th>
//                   <th>Country</th>
//                   <th>Environment</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {colleges.length > 0 ? (
//                   colleges.map((college) => (
//                     <tr key={college.collegeID}>
//                       <td>{college.collegeID}</td>
//                       <td>{college.collegeName}</td>
//                       <td>{college.city}</td>
//                       <td>{college.state}</td>
//                       <td>{college.country}</td>
//                       <td>{college.environment}</td>
//                       <td>
//                         <button
//                           className="btn btn-warning btn-sm me-2"
//                           onClick={() => handleEdit(college.collegeID)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="btn btn-danger btn-sm"
//                           onClick={() => handleDelete(college.collegeID)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center">
//                       No colleges found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <UpdateCollegeModal
//           college={editingCollege}
//           onClose={() => setIsModalOpen(false)}
//           onUpdate={handleUpdate}
//         />
//       )}
//     </>
//   );
// };
