import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow mb-6">
      <div className="flex items-center gap-6">
        <span className="font-bold text-xl text-blue-700">Goel Traders</span>
        <Link to="/home" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/add-product" className="text-gray-700 hover:text-blue-600">
          Add Product
        </Link>
        <Link to="/add-party" className="text-gray-700 hover:text-blue-600">
          Add Party
        </Link>
      </div>
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  );
};

export default NavBar;
