import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/constant";

const CreateStudent = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [schools, setSchools] = useState([]);
  const [formData, setFormData] = useState({
    Stu1stName: "",
    StuLastName: "",
    StuEmail: "",
    StuPhone: "",
    StuCurrentSchID: "",
    StuGradSchID: "",
    StuDOB: "",
    StuCategory: "NA",
    AppLevel: "",
    AppCountry: "",
    StuGPA: "",
    StuStreet: "",
    StuCity: "",
    StuState: "",
    StuPostcode: "",
    ContractID: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchContracts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/contracts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.contracts);
      setContracts(response.data.contracts);
    } catch (error) {
      console.error("Error fetching contracts:", error);
      alert("Failed to fetch contracts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSchools = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/schools`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSchools(response.data.schools);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  useEffect(() => {
    fetchContracts();
    fetchSchools();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContractSelect = (e) => {
    const contractId = e.target.value;
    setSelectedContract(contractId);
    const selected = contracts.find(
      (contract) => contract.id === parseInt(contractId)
    );
    setFormData({
      ...formData,
      StuEmail: selected?.email || "",
      ContractID: contractId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/students`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Student created successfully");
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Failed to create student. Please check your inputs.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="ContractID" onChange={handleContractSelect}>
        <option value="">Select Contract</option>
        {contracts.map((contract) => (
          <option key={contract.id} value={contract.id}>
            {contract.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="Stu1stName"
        value={formData.Stu1stName}
        onChange={handleInputChange}
        placeholder="First Name"
        maxLength={10}
      />
      <input
        type="text"
        name="StuLastName"
        value={formData.StuLastName}
        onChange={handleInputChange}
        placeholder="Last Name"
        maxLength={10}
      />
      <input
        type="email"
        name="StuEmail"
        value={formData.StuEmail}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="StuPhone"
        value={formData.StuPhone}
        onChange={handleInputChange}
        placeholder="Phone"
        maxLength={15}
      />
      <select
        name="StuCurrentSchID"
        value={formData.StuCurrentSchID}
        onChange={handleInputChange}
      >
        <option value="">Select Current School</option>
        {schools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
      <select
        name="StuGradSchID"
        value={formData.StuGradSchID}
        onChange={handleInputChange}
      >
        <option value="">Select Graduate School</option>
        {schools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        name="StuDOB"
        value={formData.StuDOB}
        onChange={handleInputChange}
      />
      <div>
        {["A", "B", "C", "NA"].map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="StuCategory"
              value={category}
              checked={formData.StuCategory === category}
              onChange={handleInputChange}
            />
            {category}
          </label>
        ))}
      </div>
      <div>
        {["UG", "G", "PG", "PhD", "HS", "S", "AS", "C", "O"].map((level) => (
          <label key={level}>
            <input
              type="radio"
              name="AppLevel"
              value={level}
              checked={formData.AppLevel === level}
              onChange={handleInputChange}
            />
            {level}
          </label>
        ))}
      </div>
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};

export default CreateStudent;
