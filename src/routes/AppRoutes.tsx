import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Admin from "../pages/Admin";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 🔐 Protected Layout */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}
