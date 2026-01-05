import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
 <header className="h-14 bg-background-card dark:bg-secondary border-b border-[color:var(--color-border)]
                  px-6 flex items-center justify-between">
  {/* Left */}
  <span className="text-sm font-medium text-secondary dark:text-[color:var(--color-text)]">
    Welcome, <span className="font-semibold">{user?.name}</span>
  </span>

  {/* Right */}
  <div className="flex items-center gap-3">

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="px-4 py-1.5 text-sm font-medium rounded-lg bg-danger text-white hover:opacity-90 transition"
    >
      Logout
    </button>
  </div>
</header>

  );
}
