import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Admin from "../pages/Admin";
import ResidentAssessment from "../pages/Assessment";
import ResidentContact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import ResidentDiary from "../pages/Diary";
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
          <Route path="/resident-contact" element={<ResidentContact />} />
          <Route path="/resident-diary" element={<ResidentDiary />} />
          <Route path="/resident-assessment" element={<ResidentAssessment />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch all unknown routes */}
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </HashRouter>
  );
}
