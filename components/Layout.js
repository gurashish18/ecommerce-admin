/** @format */
import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
	const { data: session } = useSession();

	if (!session) {
		return (
			<div className="bg-blue-900 w-screen h-screen flex items-center justify-center">
				<div className="">
					<button
						onClick={() => signIn("google")}
						className="bg-white px-4 py-4 rounded-md"
					>
						Sign in with Google
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className="bg-blue-900 min-h-screen flex">
				<Nav />
				<div className="bg-white flex-grow p-4 mt-2 mr-2 rounded-lg">
					{children}
				</div>
			</div>
		);
	}
}
