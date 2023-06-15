/** @format */

const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		required: true,
	},
});

export const Product = models.Product || model("Product", ProductSchema);
