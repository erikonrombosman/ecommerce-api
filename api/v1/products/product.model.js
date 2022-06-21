import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = mongoose.Schema({
	name: {type: String, required: true},
	normalPrice: {type: Number, required: true},
  discountedPrice: {type: Number},
  isDiscounted: {type: Boolean, default: false},
  sku: {type: String, required: true},
  brand: {type: String},
  imageUrl: {type: String},
  description: {type: String},
  fileId: {type: String},
  hasStock: {type: Boolean}
}, {
  timestamps: true,
});

ProductSchema.index({sku: 1}, { unique: true });
ProductSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", ProductSchema);