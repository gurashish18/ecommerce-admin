/** @format */

import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handler(req, res) {
	const { method } = req;
	await mongooseConnect();
	if (method === "GET") {
		if (req.query?.id) {
			res.json(await Category.findOne({ _id: req.query.id }));
		} else {
			res.json(await Category.find());
		}
	}
	if (method === "POST") {
		// create a product
		const { name } = req.body;
		const newCategory = await Category.create({
			name,
		});

		res.json(newCategory);
	}
	// if (method === "PUT") {
	// 	const { name, description, price, images, _id } = req.body;
	// 	await Product.updateOne({ _id }, { name, description, price, images });
	// 	res.json(true);
	// }
	if (method === "DELETE") {
		if (req.query?.id) {
			await Category.deleteOne({ _id: req.query?.id });
			res.json(true);
		}
	}
}
