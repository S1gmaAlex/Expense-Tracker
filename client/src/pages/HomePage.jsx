import Chart from "../components/Chart"
import BarChart from "../components/BarChart";
import History from "../components/History.jsx";
import "../index.css"
import useGetCurrentUser from "../hooks/useGetCurrentUser.js";
import useExpense from "../hooks/useExpense.js";
import useIncome from "../hooks/useIncome.js";
const HomePage = () => {
  const { user } = useGetCurrentUser();
  const { incomes } = useIncome();
  const { expenses } = useExpense();
  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount
    })

    return totalIncome;
  }

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expenses) => {
      totalExpense = totalExpense + expenses.amount
    })

    return totalExpense;
  }
  const minIncome = incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
  const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
  const minExpense = expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;
  return (
    <>
      <div className="body">
        <div className="colum1">
          <p className="tittle-all">All Transactions</p>
          <Chart></Chart>
          <BarChart></BarChart>
        </div>
        <div className="colum2">
          <History></History>
          <div className="minmax">
            <p className="recent space">Min</p>
            <p className="salary recent">Income</p>
            <p className="recent space">Max</p>
          </div>
          <div className="appointment text box2">
            <p className="blue">${minIncome}</p>
            <p className="blue">${maxIncome}</p>
          </div>
          <div className="minmax">
            <p className="recent space">Min</p>
            <p className="salary recent">Expense</p>
            <p className="recent space">Max</p>
          </div>
          <div className="appointment text box2">
            <p className="blue">${minExpense}</p>
            <p className="blue">${maxExpense}</p>
          </div>
          <div className="total">
            <div className="total-atribute box1">
              <p className="total-info">Total Income</p>
              <p className="total-money">${totalIncome()}</p>
            </div>
            <div className="total-atribute box1">
              <p className="total-info">Total Expenses</p>
              <p className="total-money">${totalExpense()}</p>
            </div>
            <div className=" total-atribute box1">
              <p className="total-info">Total Balance</p>
              <p className="green total-money">${user.totalMoney}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="clear"></div>
    </>

  )
}

export default HomePage