import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

const useIncome = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
	const showToast = useShowToast();

	useEffect(() => {
      const getAllIncome = async () => {
      setLoading(true);
			try {
          const res = await fetch("/api/income/get-incomes");
          const data = await res.json();
          if (data.error) {
            showToast("Error", data.error, "error");
            return;
          }
          setIncomes(data);
			} catch (error) {
				showToast("Error", error.message, "error");
        setIncomes([]);
			} finally {
				setLoading(false);
			}
		};
		getAllIncome();
	}, [ setIncomes,showToast]);
	return {loading, incomes};
};

export default useIncome;