import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function AddUserPage() {
  const [form, setForm] = useState({ name: "", email: "", city: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", city: "" });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }
    axios.post(`${API_URL}/users`, form)
      .then(() => {
        sessionStorage.setItem("userAdded", "true");
        navigate("/")
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="page-container">
      <div className="card">
        <button className="back-link" onClick={() => navigate("/")}>
          ← Back to Users
        </button>

        <div className="page-title" style={{ marginBottom: "6px" }}>Add New User</div>
        <div className="page-subtitle" style={{ marginBottom: "24px" }}>
          Fill in the details below to create a new user.
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            name="city"
            placeholder="Enter city"
            value={form.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button className="btn btn-success" onClick={handleSubmit}>
            ✓ Save User
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            ✕ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUserPage;