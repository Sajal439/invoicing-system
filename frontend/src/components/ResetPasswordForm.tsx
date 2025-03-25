import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";


export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [tokenValidating, setTokenValidating] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Verify token validity when component mounts
    const verifyToken = async () => {
      if (!token) {
        setIsTokenValid(false);
        setTokenValidating(false);
        toast.error("Invalid or missing reset token");
        return;
      }

      try {
        await axios.get(`http://localhost:8000/api/users/verify-reset-token`, {
          params: { token },
        });
        setIsTokenValid(true);
      } catch (error) {
        console.error("Invalid or expired token", error);
        setIsTokenValid(false);
        toast.error("Your password reset link has expired or is invalid");
      } finally {
        setTokenValidating(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;

    // Check length
    if (password.length >= 8) strength += 1;

    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;

    // Check for numbers
    if (password.match(/\d/)) strength += 1;

    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) strength += 1;

    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, password: value }));
    setPasswordStrength(checkPasswordStrength(value));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `http://localhost:8000/api/users/reset-password/${token}`,
        {
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsSubmitted(true);
      toast.success("Password has been reset successfully");
    } catch (error) {
      console.error("There was an error resetting password", error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to reset password";
        setError(errorMessage);
        toast.error("Reset Failed", { description: errorMessage });
      } else {
        setError("An unexpected error occurred");
        toast.error("Reset Failed", {
          description: "An unexpected error occurred",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenValidating) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Verifying Reset Link</CardTitle>
          <CardDescription>
            Please wait while we verify your reset token...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!isTokenValid) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Invalid Reset Link</CardTitle>
          <CardDescription>
            This password reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Please request a new password reset link.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => navigate("/forgot-password")}
          >
            Request New Reset Link
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Password Reset Successful</CardTitle>
          <CardDescription>
            Your password has been changed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            You can now log in with your new password.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>Enter a new password for your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="mt-2">
              <div className="flex space-x-1 h-1">
                <div
                  className={`flex-1 rounded-full ${
                    passwordStrength >= 1 ? "bg-red-400" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`flex-1 rounded-full ${
                    passwordStrength >= 2 ? "bg-yellow-400" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`flex-1 rounded-full ${
                    passwordStrength >= 3 ? "bg-green-400" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`flex-1 rounded-full ${
                    passwordStrength >= 4 ? "bg-green-600" : "bg-gray-200"
                  }`}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {passwordStrength === 0 &&
                  "Password must be at least 8 characters"}
                {passwordStrength === 1 && "Weak - Add uppercase letters"}
                {passwordStrength === 2 && "Fair - Add numbers"}
                {passwordStrength === 3 && "Good - Add special characters"}
                {passwordStrength === 4 && "Strong password"}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="passwordConfirm">Confirm Password</Label>
            <div className="relative">
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
