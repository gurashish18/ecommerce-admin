/** @format */

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
	const { method } = req;
	await mongooseConnect();
	if (method === "GET") {
		if (req.query?.id) {
			res.json(await Product.findOne({ _id: req.query.id }));
		} else {
			res.json(await Product.find());
		}
	}
	if (method === "POST") {
		// create a product
		const { name, description, price, images, category } = req.body;
		const newProduct = await Product.create({
			name,
			description,
			price,
			images,
			category,
		});

		res.json(newProduct);
	}
	if (method === "PUT") {
		const { name, description, price, images, category, _id } = req.body;
		await Product.updateOne(
			{ _id },
			{ name, description, price, images, category }
		);
		res.json(true);
	}
	if (method === "DELETE") {
		if (req.query?.id) {
			await Product.deleteOne({ _id: req.query?.id });
			res.json(true);
		}
	}
}
