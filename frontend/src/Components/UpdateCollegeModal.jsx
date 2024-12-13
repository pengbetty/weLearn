import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/constant";
import "../Css/form.css";

export const UpdateCollegeModal = ({ college, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    collegeName: "",
    city: "",
    state: "",
    country: "",
    usRanking: "",
    qsRanking: "",
    environment: "Urban",
    ugNumber: "",
    pgNumber: "",
    collegeLink: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (college) {
      setFormData({
        collegeName: college.collegeName || "",
        city: college.city || "",
        state: college.state || "",
        country: college.country || "",
        usRanking: college.usRanking || "",
        qsRanking: college.qsRanking || "",
        environment: college.environment || "Urban",
        ugNumber: college.ugNumber || "",
        pgNumber: college.pgNumber || "",
        collegeLink: college.collegeLink || "",
      });
    }
  }, [college]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/api/colleges/${college.collegeID}`,
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
        <form onSubmit={handleSubmit} className="update-form">
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleInputChange}
            placeholder="College Name"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="State"
            required
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />
          <input
            type="number"
            name="usRanking"
            value={formData.usRanking}
            onChange={handleInputChange}
            placeholder="US Ranking"
          />
          <input
            type="number"
            name="qsRanking"
            value={formData.qsRanking}
            onChange={handleInputChange}
            placeholder="QS Ranking"
          />
          <select
            name="environment"
            value={formData.environment}
            onChange={handleInputChange}
            required
          >
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
            <option value="Suburb">Suburb</option>
          </select>
          <input
            type="number"
            name="ugNumber"
            value={formData.ugNumber}
            onChange={handleInputChange}
            placeholder="Number of Undergraduate Students"
          />
          <input
            type="number"
            name="pgNumber"
            value={formData.pgNumber}
            onChange={handleInputChange}
            placeholder="Number of Postgraduate Students"
          />
          <input
            type="url"
            name="collegeLink"
            value={formData.collegeLink}
            onChange={handleInputChange}
            placeholder="Website Link"
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
