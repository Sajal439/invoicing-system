import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";

export function ForgotPasswordPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
