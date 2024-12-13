import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../Css/form.css";
import { BASE_URL } from "../../Constant/constant";

export const UpdateContract = () => {
  const [formData, setFormData] = useState({
    username: "",
    contractName: "",
    startDate: "",
    finishDate: "",
    amount: "",
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

        console.log(contractData);
        setFormData({
          username: contractData.user?.userName || "",
          contractName: contractData.contractName || "",
          startDate: contractData.startDate || "",
          finishDate: contractData.finishDate || "",
          amount: contractData.amount || "",
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
      await axios.put(
        `${BASE_URL}/api/contracts/${id}`,
        {
          contractName: formData.contractName,
          startDate: formData.startDate,
          finishDate: formData.finishDate,
          amount: formData.amount,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Contract updated successfully.");
      navigate("/contract");
    } catch (error) {
      console.error("Error updating contract:", error);
      alert("Failed to update contract. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="page-title">Update Contract</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={formData.username}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contract Name</label>
            <input
              type="text"
              name="contractName"
              className="form-control"
              value={formData.contractName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Finish Date</label>
            <input
              type="date"
              name="finishDate"
              className="form-control"
              value={formData.finishDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Contract
          </button>
        </form>
      )}
    </div>
  );
};
