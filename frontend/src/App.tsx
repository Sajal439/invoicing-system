import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
    </div>
  );

  // return (
  //   <Routes>
  //     {/* default route to login */}
  //     <Route path="/" element={<Navigate to="/login" />} />
  //     {/* auth routes */}
  //     <Route path="/login" element={<AuthPage defaultMode="login" />} />
  //     <Route path="/register" element={<AuthPage defaultMode="register" />} />

  //     {/* password recovery routes */}
  //     <Route path="/forgot-password" element={<ForgotPasswordForm />} />
  //     <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

  //     <Route path="/home" element={<DashboardPage />} />
  //   </Routes>
  // );
}

export default App;
