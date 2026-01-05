import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Admin() {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <p>Only admins can access this page.</p>

      <Link to="/dashboard">
        <button>Back to Dashboard</button>
      </Link>

      <br />
      <br />

      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}
