import React, { useState } from "react";
import axios from "axios";
import "../Css/home.css";
import "../Css/college.css";
import { BASE_URL } from "../../Constant/constant";

export const UpdateCollegeModal = ({ college, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...college });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/colleges/${college.ID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("College updated successfully");
      onUpdate(response.data.college);
    } catch (error) {
      console.error("Error updating college:", error);
      alert("Failed to update college. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update College</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            placeholder="College Name"
            required
          />
          <input
            type="text"
            name="City"
            value={formData.City}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="State"
            value={formData.State}
            onChange={handleInputChange}
            placeholder="State"
            required
          />
          <input
            type="text"
            name="Country"
            value={formData.Country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />
          <select
            name="Environment"
            value={formData.Environment}
            onChange={handleInputChange}
            required
          >
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
            <option value="Suburb">Suburb</option>
          </select>
          <textarea
            name="RMK"
            value={formData.RMK}
            onChange={handleInputChange}
            placeholder="Remarks"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
