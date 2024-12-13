import React, { useEffect, useState } from "react";
import axios from "axios";

import "../Css/home.css";
import { BASE_URL } from "../../Constant/constant";
import { Link } from "react-router-dom";

export const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/students`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to fetch students. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (studentId) => {
    alert(
      `Edit functionality for Student ID: ${studentId} not implemented yet.`
    );
  };

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${BASE_URL}/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setStudents(students.filter((student) => student.stuID !== studentId));
        alert("Student deleted successfully.");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="page-title">Student Management</h1>
          <Link
            to="/create-student"
            className="btn btn-primary btn-lg create-student-btn"
          >
            + Create Student
          </Link>
        </div>
        {loading ? (
          <p className="text-center">Loading students...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.stuID}>
                      <td>{student.stuID}</td>
                      <td>{student.stu1stName}</td>
                      <td>{student.stuLastName}</td>
                      <td>{student.stuEmail}</td>
                      <td>{student.stuPhone}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(student.stuID)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(student.stuID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
