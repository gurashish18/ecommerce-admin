/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "./Layout";

export default function ProductForm({
	_id,
	name: exsistingName,
	description: exsistingDescription,
	price: exsistingPrice,
}) {
	const [name, setName] = useState(exsistingName || "");
	const [description, setDescription] = useState(exsistingDescription || "");
	const [price, setPrice] = useState(exsistingPrice || "");
	const router = useRouter();

	async function saveProduct(event) {
		event.preventDefault();
		const data = { name, description, price };
		if (_id) {
			// update the product
			await axios.put("/api/products", { ...data, _id });
		} else {
			// create the product
			await axios.post("/api/products", data);
		}
		router.push("/products");
	}
	return (
		<form onSubmit={saveProduct} className="flex flex-col h-full p-4">
			<div className="flex flex-col w-max mt-5 ">
				<label for="name">Product Name</label>
				<input
					name="name"
					type={"text"}
					placeholder="name"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>

				<label for="description">Description</label>
				<textarea
					name="description"
					placeholder="description"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>

				<label for="price">Price</label>
				<input
					name="price"
					type={"number"}
					placeholder="price"
					value={price}
					onChange={(event) => setPrice(event.target.value)}
				/>

				<button type="submit" className="btn-primary">
					Save
				</button>
			</div>
		</form>
	);
}
