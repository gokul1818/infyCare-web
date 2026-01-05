import { useEffect, useRef, useState } from "react";
import { BiSolidUserAccount } from "react-icons/bi";
import {
  IoChevronDownOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  return (
    <header className="py-5 bg-secondary px-6 flex items-center z-30 justify-between shadow-xl">
      <div className="flex items-center gap-2">
        <span className="text-xl  text-white">Ashtonleigh</span>
        <BiSolidUserAccount className="text-white text-xl" />
      </div>

      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-white/30 hover:bg-white/40 transition flex items-center justify-center">
          <IoNotificationsOutline className="text-white text-xl" />
        </button>

        <button className="w-10 h-10 rounded-full bg-white/30 hover:bg-white/40 transition flex items-center justify-center">
          <IoSettingsOutline className="text-white text-xl" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img
                src={
                  user?.avatar ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                    user?.name
                }
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Dropdown Arrow */}
            <span className="text-white">
              {user?.name || "--"}
            </span>
            <IoChevronDownOutline
              className={`text-white text-lg transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={handleProfile}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition"
              >
                <IoPersonOutline className="text-lg" />
                <span>Profile</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition"
              >
                <IoLogOutOutline className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
