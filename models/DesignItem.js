const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DesignItemSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    picture_Link: {
      type: String,
      required: true,
    },
    link_shop: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { collection: "Design-shop" }
);
const Design = mongoose.model("Design-shop", DesignItemSchema);

module.exports = Design;
