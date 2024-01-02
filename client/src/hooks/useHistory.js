import useExpense from "../hooks/useExpense.js";
import useIncome from "../hooks/useIncome.js";

const useHistory = () => {
    const {incomes} = useIncome();
    const {expenses} = useExpense();
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }
  return {transactionHistory}
}

export default useHistory