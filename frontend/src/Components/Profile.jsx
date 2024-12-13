import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/constant";
import "../Css/profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data.profile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      {profile && (
        <div className="profile-details">
          <p>
            <strong>Username:</strong> {profile.userName}
          </p>
          <p>
            <strong>Display Name:</strong> {profile.displayName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Role:</strong> {profile.role}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(profile.created_at).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
