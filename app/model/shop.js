import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  owner: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  openingHours: String,
  contact: String,
  rating: { type: Number, default: 0 },
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);

export default Shop;