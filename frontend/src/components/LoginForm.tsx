"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigateToRegister = () => {
    console.log("Navigating to register");
    navigate("/register", { replace: true });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }

      toast.success("Login successful", {
        description: "You have successfully logged in",
      });
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Login failed";

        // Check for specific error types
        if (
          errorMessage.toLowerCase().includes("email does not exist") ||
          errorMessage.toLowerCase().includes("please regiser")
        ) {
          // Account doesn't exist case
          setError("No account found with this email address");

          toast.error("Account Not Found", {
            description: "Would you like to create an account?",
            action: {
              label: "Register",
              onClick: () => navigate("/register"),
            },
          });
        } else if (errorMessage.toLowerCase().includes("incorrect password")) {
          // Wrong password case
          setError("The password you entered is incorrect");

          toast.error("Login Failed", {
            description: "Incorrect password, please try again",
          });
        } else {
          // Generic error case
          setError(errorMessage);

          toast.error("Login Failed", {
            description: errorMessage,
          });
        }
      } else {
        // Non-axios errors
        setError("An unexpected error occurred. Please try again later.");

        toast.error("Login Failed", {
          description: "An unexpected error occurred",
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
          {/* Show error message if exists */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{error}</p>
                {error.includes("No account found") && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-red-600 underline hover:text-red-800"
                    type="button"
                    onClick={navigateToRegister}
                  >
                    Create an account instead
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
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
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 p-0 pt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-primary hover:underline font-medium"
              onClick={navigateToRegister}
            >
              Create One
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
