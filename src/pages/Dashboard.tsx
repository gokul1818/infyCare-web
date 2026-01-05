import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <p>
        Welcome <strong>{user?.name}</strong>
      </p>
      <p>
        Role: <strong>{role}</strong>
      </p>

      {role === "admin" && (
        <Link to="/admin">
          <button>Go to Admin Page</button>
        </Link>
      )}

      <br />
      <br />

      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}
