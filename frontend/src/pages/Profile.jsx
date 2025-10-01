import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        console.error("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/auth/me", { name, email, password });
      login(res.data);
      setPassword("");
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Profile</h2>
        {message && <p style={{ color: "green", fontSize: "14px" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
