import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;;

function HomePage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = () => {
    axios.get(`${API_URL}/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

    useEffect(() => {
    if (sessionStorage.getItem("userAdded") === "true") {
        sessionStorage.removeItem("userAdded");
        setToast(true);
        const timer = setTimeout(() => setToast(false), 10000);
        return () => clearTimeout(timer);
    }
    }, []);

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/users/${id}`)
      .then(() => fetchUsers())
      .catch(err => console.error(err));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    (user.city && user.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-container">

      {toast && (
        <div className="toast">
          <div className="toast-left">
            <span>✅</span>
            <div>
              <div className="toast-title">Success!</div>
              <div className="toast-subtitle">New user added successfully.</div>
            </div>
          </div>
          <button className="toast-close" onClick={() => setToast(false)}>✕</button>
        </div>
      )}

      <div className="card">
        <div className="page-header">
          <div>
            <div className="page-title">User Directory</div>
            <div className="page-subtitle">Manage and view all registered users in the system.</div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/add-user")}>
            + Add New User
          </button>
        </div>

        <input
          className="search-bar"
          placeholder="Search users by name, email or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th className="hide-mobile">Email</th>
                <th className="hide-mobile">City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td className="hide-mobile">{user.email}</td>
                  <td className="hide-mobile">{user.city || "—"}</td>
                  <td>
                    <button
                      className="btn btn-danger-outline"
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="total-users">
          Total Users: <span>{filteredUsers.length}</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;