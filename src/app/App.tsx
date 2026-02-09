import { Navigate, Route, Routes } from "react-router-dom";

import { AccountPage } from "../pages/AccountPage";
import { DashboardPage } from "../pages/DashboardPage";

import { AppLayout } from "./AppLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
