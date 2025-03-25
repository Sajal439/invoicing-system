"use client";

import { useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthPageProps {
  defaultMode?: "login" | "register";
}

export default function AuthPage({ defaultMode = "login" }: AuthPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const handleModeSwitch = (mode: "login" | "register") => {
    navigate(`/${mode}`);
  };

  useEffect(() => {
    // Ensure we're on the correct path based on defaultMode when component mounts
    if (defaultMode === "login" && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    } else if (
      defaultMode === "register" &&
      location.pathname !== "/register"
    ) {
      navigate("/register", { replace: true });
    }
  }, [defaultMode, navigate, location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">Goel Traders</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        <div className="flex justify-center space-x-2 mb-8">
          <button
            onClick={() => handleModeSwitch("login")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isLogin
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleModeSwitch("register")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              !isLogin
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Register
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
