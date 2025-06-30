import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader } from "../components/ui/card";

interface ProductFormData {
  partyName: string;
  phoneNumber: string;
  address: string;
  partyType: string;
}

const initialForm: ProductFormData = {
  partyName: "",
  phoneNumber: "",
  address: "",
  partyType: "",
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
        "http://localhost:8000/api/users/add-party",
        form,
        { withCredentials: true }
      );
      setMessage(res.data.message || "Party added successfully!");
      setForm(initialForm);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(
          err.response?.data?.message || "Error adding party. Please try again."
        );
      } else {
        setMessage("Error adding party. Please try again.");
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="mb-2" htmlFor="partyName">
              Party Name
            </Label>
            <Input
              id="partyName"
              name="partyName"
              value={form.partyName}
              onChange={handleChange}
              required
              placeholder="Enter party name"
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="phoneNumber">
              Phone Number:
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="address">
              Address
            </Label>
            <Input
              id="address"
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Enter address"
              min={0}
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="partyType">
              Party Type
            </Label>
            <Input
              id="partyType"
              type="text"
              name="partyType"
              value={form.partyType}
              onChange={handleChange}
              required
              placeholder="Enter party type"
              min={0}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Party
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
