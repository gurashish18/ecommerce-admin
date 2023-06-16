/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "./Layout";
import Spinner from "./Spinner";

export default function ProductForm({
	_id,
	name: exsistingName,
	description: exsistingDescription,
	price: exsistingPrice,
	images: exsistingImages,
}) {
	const [name, setName] = useState(exsistingName || "");
	const [description, setDescription] = useState(exsistingDescription || "");
	const [price, setPrice] = useState(exsistingPrice || "");
	const [isUploading, setIsUploading] = useState(false);
	const [images, setImages] = useState(exsistingImages || []);
	const router = useRouter();

	async function saveProduct(event) {
		event.preventDefault();
		const data = { name, description, price, images };
		if (_id) {
			// update the product
			await axios.put("/api/products", { ...data, _id });
		} else {
			// create the product
			await axios.post("/api/products", data);
		}
		router.push("/products");
	}
	async function uploadImages(event) {
		const files = event.target?.files;
		if (files?.length > 0) {
			setIsUploading(true);

			for (const file of files) {
				const data = new FormData();
				data.append("file", file);
				data.append("upload_preset", "dkredqfu");
				const res = await axios.post(
					"https://api.cloudinary.com/v1_1/do8vzekd3/image/upload",
					data
				);
				const url = res.data.url;
				setImages((oldImages) => {
					return [...oldImages, url];
				});
			}
			setIsUploading(false);
		}
	}
	return (
		<form onSubmit={saveProduct} className="flex flex-col h-full p-4">
			<div className="flex flex-col mt-5 w-1/4">
				<label for="name">Product Name</label>
				<input
					name="name"
					type={"text"}
					placeholder="name"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				{images?.length > 0 &&
					images?.map((image) => (
						<img
							key={image}
							src={image}
							alt="image"
							className="w-10 h-10 rounded-md"
						/>
					))}
				<label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
					{isUploading ? (
						<Spinner />
					) : (
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
								/>
							</svg>
							<div>Add image</div>
							<input type="file" onChange={uploadImages} className="hidden" />
						</>
					)}
				</label>

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
