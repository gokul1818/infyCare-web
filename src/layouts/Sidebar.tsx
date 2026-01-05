import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { MENU } from "./menu";
import { useState } from "react";
import { MdArrowRight, MdKeyboardArrowDown, MdKeyboardArrowRight, MdMenu } from "react-icons/md";

export default function Sidebar() {
  const { role } = useSelector((state: RootState) => state.auth);
  const menuItems = MENU[role] || [];

  const [collapsed, setCollapsed] = useState(false);
  const [openResidents, setOpenResidents] = useState(true);

  return (
    <aside
      className={`
        min-h-screen bg-primary text-white transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-center p-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 p-2 rounded-full bg-neutral-300 flex items-center justify-center">
              <img src="/svg/logo.svg" />
            </div>
            <h3 className="text-sm font-bold">
              Infycare Management
            </h3>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white"
        >
          <MdKeyboardArrowRight size={22}
            className={`transition ${!collapsed ? "rotate-180" : ""
              }`} />
        </button>
      </div>

      {/* ================= MENU ================= */}
      <nav className="px-2 space-y-1 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // ----------- PARENT (Residents) -----------
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => setOpenResidents(!openResidents)}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-light"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && (
                    <MdKeyboardArrowDown
                      size={20}
                      className={`transition ${openResidents ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </button>

                {/* CHILDREN */}
                {openResidents && (
                  <div className={`${!collapsed ? "ml-8" : "ml-0"} mt-1 space-y-1`}>
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `
                            flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
                            ${isActive
                              ? "bg-secondary text-white"
                              : "text-gray-300 hover:bg-primary-light"
                            }
                          `
                          }
                        >
                          <ChildIcon size={16} />
                          {!collapsed && child.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )
                }
              </div>
            );
          }
          // ----------- NORMAL ITEM -----------
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
                ${isActive
                  ? "bg-secondary text-white"
                  : "text-gray-300 hover:bg-primary-light"
                }
              `
              }
            >
              <Icon size={18} />
              {!collapsed && item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside >
  );
}
