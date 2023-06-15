/** @format */

import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	const router = useRouter();

	async function createProduct(event) {
		event.preventDefault();
		const data = { name, description, price };

		await axios.post("/api/products", data);
		router.push("/products");
	}
	return (
		<Layout>
			<form
				onSubmit={createProduct}
				className="flex flex-col h-full items-center p-4"
			>
				<h1>New Product</h1>
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
		</Layout>
	);
}
