import AddProductForm from "@/components/AddProductForm";
import React from "react";

const AddProductPage: React.FC = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
