import { ResetPasswordForm } from "@/components/ResetPasswordForm";

export function ResetPasswordPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
