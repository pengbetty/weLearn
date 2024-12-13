import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/constant";

const CreateCollege = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData, "college data");

    try {
      await axios.post(`${BASE_URL}/api/colleges`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("College created successfully");
      setFormData({
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
    } catch (error) {
      console.error("Error creating college:", error);
      alert("Failed to create college. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <h1>Create College</h1>
      <input
        type="text"
        name="collegeName"
        // value={formData.collegeName}
        onChange={handleInputChange}
        placeholder="College Name"
        required
      />
      <input
        type="text"
        name="city"
        // value={formData.city}
        onChange={handleInputChange}
        placeholder="City"
        required
      />
      <input
        type="text"
        name="state"
        // value={formData.state}
        onChange={handleInputChange}
        placeholder="State"
        required
      />
      <input
        type="text"
        name="country"
        // value={formData.country}
        onChange={handleInputChange}
        placeholder="Country"
        required
      />
      <input
        type="number"
        name="usRanking"
        // value={formData.usRanking}
        onChange={handleInputChange}
        placeholder="US Ranking"
      />
      <input
        type="number"
        name="qsRanking"
        // value={formData.qsRanking}
        onChange={handleInputChange}
        placeholder="QS Ranking"
      />
      <select
        name="environment"
        // value={formData.environment}
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
        // value={formData.ugNumber}
        onChange={handleInputChange}
        placeholder="Number of Undergraduate Students"
      />
      <input
        type="number"
        name="pgNumber"
        // value={formData.pgNumber}
        onChange={handleInputChange}
        placeholder="Number of Postgraduate Students"
      />
      <input
        type="url"
        name="collegeLink"
        // value={formData.collegeLink}
        onChange={handleInputChange}
        placeholder="Website Link"
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CreateCollege;
