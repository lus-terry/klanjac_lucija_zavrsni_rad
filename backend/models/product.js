const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortDesc: { type: String },
    longDesc: { type: String },
    price: { type: Number, required: true },
    image: { type: Object, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;


