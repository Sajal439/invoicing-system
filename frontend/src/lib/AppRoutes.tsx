import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import AddPartyPage from "@/pages/AddPartyPage";
import AddProductPage from "@/pages/AddProductPage";
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import { ResetPasswordPage } from "@/pages/ResetPasswordPage";
import { Navigate, Route, Routes } from "react-router-dom";

// import NavBar from "./components/NavBar";

const AppRoutes = () => (
  <Routes>
    {/* default route to login */}
    <Route path="/" element={<Navigate to="/login" />} />
    {/* auth routes */}
    <Route path="/login" element={<AuthPage defaultMode="login" />} />
    <Route path="/register" element={<AuthPage defaultMode="register" />} />

    {/* password recovery routes */}
    <Route path="/forgot-password" element={<ForgotPasswordForm />} />
    <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

    <Route path="/home" element={<HomePage />} />
    <Route path="add-product" element={<AddProductPage />} />
    <Route path="add-party" element={<AddPartyPage />} />
  </Routes>
);

export default AppRoutes;
