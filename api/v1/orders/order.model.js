import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import ProductSchema from "../products/product.model";

const OrderSchema = mongoose.Schema({
	userEmail: {type: String, required: true},
	userPhone: {type: String, required: true},
  userName: {type: String, required: true},
  products: {type: [ProductSchema], required: true},
  isDiscounted: {type: Boolean, default: false},
  address: {type: String, required: true},
  totalPrice: {type: Number},
  totalDiscountedPrice: {type: Number},
}, {
  timestamps: true,
});


OrderSchema.plugin(mongoosePaginate);

export default mongoose.model("Order", OrderSchema);