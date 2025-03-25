"use client";

import type React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigateToLogin = () => {
    console.log("Navigating to login");
    navigate("/login", { replace: true });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error) setError("");

    if (name === "password" || name === "confirmPassword") {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));

      if (name === "confirmPassword" && value !== formData.password) {
        setValidationErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      }

      if (name === "password" && value.length > 0 && value.length < 8) {
        setValidationErrors((prev) => ({
          ...prev,
          password: "password must be atleast 8 characters long",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({ password: "", confirmPassword: "" });
    if (formData.password !== formData.passwordConfirm) {
      setValidationErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }
    if (formData.password.length < 8) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Password must be atleast 8 characters long",
      }));
    }
    setIsLoading(true);

    try {
      await axios.post("http://localhost:8000/api/users/register", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("registration SUccessful", {
        description: "You have successfully registered",
        onDismiss: navigateToLogin,
      });
      setTimeout(() => {
        navigateToLogin();
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Registration Failed";
        if (
          errorMessage
            .toLowerCase()
            .includes("User already exists with this email") ||
          errorMessage.toLowerCase().includes("User already exists")
        ) {
          toast.error("Account Exists", {
            description: "Would you like to login instead?",
            action: {
              label: "login",
              onClick: navigateToLogin,
            },
          });
        } else {
          setError(errorMessage);
          toast.error("registration failed", {
            description: errorMessage,
          });
        }
      } else {
        setError("An unexpected error occurred");
        toast.error("Registration failed", {
          description: "errro",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-none">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 p-0">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md mb-4 flex flex-col">
              <div className="flex items-start">
                <p className="font-medium">{error} </p>
              </div>
              {error.toLowerCase().includes("already exists") && (
                <Button
                  className="p-0 h-auto text-sm text-red-600 underline hover:text-red-800 mt-2"
                  variant="link"
                  type="button"
                  onClick={navigateToLogin}
                >
                  Login Instead
                </Button>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <div className="relative">
              <Input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className={validationErrors.password ? "border-red-500" : ""}
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
            {validationErrors.password && (
              <p className="text-sm text-red-500 mt-1">
                {validationErrors.password}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="register-confirm-password">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="register-confirm-password"
                  name="passwordConfirm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Your Password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className={
                    validationErrors.confirmPassword ? "border-red-500" : ""
                  }
                />
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 p-0 pt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto font-medium"
              onClick={navigateToLogin}
            >
              Sign In
            </Button>
          </p>
          <p className="text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-primary"
            >
              Privacy Policy
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
