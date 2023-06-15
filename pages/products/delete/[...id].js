/** @format */

import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeletePage() {
	const [productInfo, setProductInfo] = useState(null);
	const router = useRouter();
	const { id } = router.query;

	function goBack() {
		router.push("/products");
	}

	async function deleteProduct() {
		await axios.delete("/api/products?id=" + id);
		router.push("/products");
	}

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get("/api/products?id=" + id).then((res) => {
			setProductInfo(res.data);
		});
	}, [id]);
	return (
		<Layout>
			<h1>Are you sure you want to delete "{productInfo?.name}"</h1>
			<div className="flex gap-4 mt-4">
				<button className="btn-yes" onClick={deleteProduct}>
					Yes
				</button>
				<button className="btn-no" onClick={goBack}>
					No
				</button>
			</div>
		</Layout>
	);
}
