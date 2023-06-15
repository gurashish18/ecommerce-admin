/** @format */

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
	const { method } = req;
	await mongooseConnect();
	if (method === "POST") {
		// create a product
		const { name, description, price } = req.body;
		const newProduct = await Product.create({
			name,
			description,
			price,
		});

		res.json(newProduct);
	}
}
