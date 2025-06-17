"use client";
import { useState } from "react";

export default function Join() {
  const [form, setForm] = useState({
    shopName: "",
    owner: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register shop");
      }

      console.log("Shop registered:", data.shop);
      setSuccess(true);
      setForm({ shopName: "", owner: "", location: "" }); // Reset form
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register Your Shop</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && (
        <div className="text-green-500 mb-4">
          Shop registered successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="shopName"
          placeholder="Shop Name"
          value={form.shopName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="owner"
          placeholder="Owner Name"
          value={form.owner}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}