import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constant/constant";
import { AppNavbar } from "./Navbar";

export const UpdateContract = () => {
  const [formData, setFormData] = useState({
    username: "",
    StartDate: "",
    FinishDate: "",
    Amount: "",
  });

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/contracts/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const contractData = response.data.contract;
        setFormData({
          username: contractData.User?.username || "",
          StartDate: contractData.StartDate,
          FinishDate: contractData.FinishDate,
          Amount: contractData.Amount,
        });
      } catch (error) {
        console.error("Error fetching contract:", error);
        alert("Failed to fetch contract details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/api/contracts/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Contract updated successfully.");
      navigate("/contract");
    } catch (error) {
      console.error("Error updating contract:", error);
      alert("Failed to update contract. Please try again.");
    }
  };

  return (
    <>
      <AppNavbar />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Update Contract</h2>
            <div className="mb-3">
              <label htmlFor="UserID" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="UserID"
                name="UserID"
                value={formData.username}
                readOnly
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="StartDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                id="StartDate"
                name="StartDate"
                value={formData.StartDate}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="FinishDate" className="form-label">
                Finish Date
              </label>
              <input
                type="date"
                id="FinishDate"
                name="FinishDate"
                value={formData.FinishDate}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                id="Amount"
                name="Amount"
                value={formData.Amount}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Contract
            </button>
          </form>
        )}
      </div>
    </>
  );
};
