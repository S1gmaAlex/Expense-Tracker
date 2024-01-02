import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

const useExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
	const showToast = useShowToast();

	useEffect(() => {
        const getAllExpense = async () => {
			setLoading(true);
			setExpenses([]);
			try {
				const res = await fetch("/api/expense/get-expenses");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setExpenses(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getAllExpense();
	}, [setExpenses,showToast]);
	return {loading, expenses};
};

export default useExpense;