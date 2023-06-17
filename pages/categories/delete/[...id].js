/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function DeleteCategory() {
	const [categoryInfo, setCategoryInfo] = useState();
	const router = useRouter();
	const { id } = router.query;

	function goBack() {
		router.push("/categories");
	}

	async function deleteCategory() {
		await axios.delete("/api/categories?id=" + id);
		router.push("/categories");
	}

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get("/api/categories?id=" + id).then((res) => {
			setCategoryInfo(res.data);
		});
	}, [id]);
	return (
		<Layout>
			<h1>Are you sure you want to delete "{categoryInfo?.name}" category?</h1>
			<div className="flex gap-4 mt-4">
				<button className="btn-yes" onClick={deleteCategory}>
					Yes
				</button>
				<button className="btn-no" onClick={goBack}>
					No
				</button>
			</div>
		</Layout>
	);
}
