import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

function App() {
  return (
    <Routes>
      {/* default route to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      {/* auth routes */}
      <Route path="/login" element={<AuthPage defaultMode="login" />} />
      <Route path="/register" element={<AuthPage defaultMode="register" />} />

      {/* password recovery routes */}
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
