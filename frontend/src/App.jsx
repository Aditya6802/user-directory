import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", city: ""});

  const fetchUsers = () => {
    axios.get(`${API_URL}/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }
    axios.post(`${API_URL}/users`, form)
      .then(() => {
        fetchUsers();
        setForm({ name: "", email: "", city: "" });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/users/${id}`)
    .then(() => fetchUsers())
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>User Directory</h1>

      <h2>Add User</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Add User</button>

      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} — {user.email} — {user.city}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;