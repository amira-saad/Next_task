import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    category: { type: String, default: "honey" },
  },
  { timestamps: true }
)

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema)