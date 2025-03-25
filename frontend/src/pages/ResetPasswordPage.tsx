import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        toast.error("Invalid reset token");
        navigate("/forgot-password", { replace: true });
        return;
      }
      try {
        await axios.get("http://localhost:8000/api/users/verify-reset-token", {
          params: { token },
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch {
        toast.error("Invalid reset token");
        navigate("/forgot-password", { replace: true });
      }
    };
    verifyToken();
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/forgot-password" replace />;
  }
  return (
    <div className="container flex items-center justify-center min-h-screen py-10 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
