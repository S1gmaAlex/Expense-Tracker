import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

const useGetCurrentUser = () => {
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch('/api/users/currentUser');
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setUser(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getUser();
	}, [setUser, showToast]);

	return { loading, user };
};

export default useGetCurrentUser;