import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/home.css";
import { BASE_URL } from "../../Constant/constant";
import { useNavigate } from "react-router-dom";

export const Contract = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchContracts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/contracts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setContracts(response.data.contracts);
    } catch (error) {
      console.error("Error fetching contracts:", error);
      alert("Failed to fetch contracts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleEdit = (contractId) => {
    navigate(`/update-contract/${contractId}`);
  };

  const handleDelete = async (contractId) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      try {
        await axios.delete(`${BASE_URL}/api/contracts/${contractId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setContracts((prevContracts) =>
          prevContracts.filter((contract) => contract.contractID !== contractId)
        );
        alert("Contract deleted successfully.");
      } catch (error) {
        console.error("Error deleting contract:", error);
        alert("Failed to delete contract. Please try again.");
      }
    }
  };

  const navigateToCreateContract = () => {
    navigate("/create-contract");
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="page-title">Contract Management</h1>
          <button
            className="btn btn-primary btn-lg create-contract-btn"
            onClick={navigateToCreateContract}
          >
            + Create Contract
          </button>
        </div>
        {loading ? (
          <p className="text-center">Loading contracts...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Contract ID</th>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>Finish Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contracts.length > 0 ? (
                  contracts.map((contract) => (
                    <tr key={contract.contractID}>
                      <td>{contract.contractID}</td>
                      <td>{contract.user?.displayName}</td>
                      <td>{contract.startDate}</td>
                      <td>{contract.finishDate}</td>
                      <td>{contract.amount}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(contract.contractID)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(contract.contractID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No contracts found.
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
