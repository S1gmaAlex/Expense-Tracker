import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import styled from 'styled-components';
import { dateFormat } from '../utils/dateFormat.js';
import useIncome from "../hooks/useIncome.js";
import useExpense from "../hooks/useExpense.js";
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

const Chart = () => {
  const { incomes } = useIncome();
  const { expenses } = useExpense();

  const chartData = {
    labels: incomes.map((inc) => {
      const { date } = inc
      return dateFormat(date)
    }),
    datasets: [
      {
        label: 'Income',
        data: [
          ...incomes.map((income) => {
            const { amount } = income
            return amount
          })
        ],
        backgroundColor: 'green',
        tension: .2
      },
      {
        label: 'Expenses',
        data: [
          ...expenses.map((expense) => {
            const { amount } = expense
            return amount
          })
        ],
        backgroundColor: 'red',
        tension: .2
      }
    ]
  }

  return (
    <>
      <ChartStyled style={{ width: "700px", height: "400px" }}>
        <Line data={chartData} />
      </ChartStyled>
    </>
  )
}

const ChartStyled = styled.div`
    background-color: #fff
    padding: 1rem;
    border-radius: 20px;
`;

export default Chart