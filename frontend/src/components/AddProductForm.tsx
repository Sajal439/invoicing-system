import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface ProductFormData {
  productName: string;
  productPrice: string;
  productCost: string;
  quantity: string;
  brand: string;
}

const initialForm: ProductFormData = {
  productName: "",
  productPrice: "",
  productCost: "",
  quantity: "",
  brand: "",
};

const AddProductForm: React.FC = () => {
  const [form, setForm] = useState<ProductFormData>(initialForm);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/products/add-product",
        form,
        { withCredentials: true }
      );
      setMessage(res.data.message || "Product added successfully!");
      setForm(initialForm);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(
          err.response?.data?.message ||
            "Error adding product. Please try again."
        );
      } else {
        setMessage("Error adding product. Please try again.");
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="mb-2" htmlFor="productName">
              Product Name
            </Label>
            <Input
              id="productName"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="brand">
              Brand
            </Label>
            <Input
              id="brand"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
              placeholder="Enter brand"
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="productPrice">
              Price
            </Label>
            <Input
              id="productPrice"
              type="number"
              name="productPrice"
              value={form.productPrice}
              onChange={handleChange}
              required
              placeholder="Enter price"
              min={0}
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="productCost">
              Cost
            </Label>
            <Input
              id="productCost"
              type="number"
              name="productCost"
              value={form.productCost}
              onChange={handleChange}
              required
              placeholder="Enter cost"
              min={0}
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="quantity">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              placeholder="Enter quantity"
              min={0}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Product
          </Button>
          {message && (
            <p
              className={`mt-2 text-center ${
                message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
