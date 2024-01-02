import {
    Chart as ChartJs,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useExpense from "../hooks/useExpense.js";
ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
)

const BarChart = () => {
    const { expenses } = useExpense();
    const history = [...expenses]
    history.sort((a, b) => new Date(a.date) - new Date(b.date));

    const twoRecentMonths = history.reduce((acc, item) => {
        const currentMonth = new Date(item.date).getMonth() + 1;
        const currentYear = new Date(item.date).getFullYear();

        const lastItem = acc[acc.length - 1];
        if (lastItem && lastItem.month === currentMonth && lastItem.year === currentYear) {
            lastItem.amount += item.amount;
        } else {
            acc.push({
                month: currentMonth,
                year: currentYear,
                amount: item.amount,
            });
        }

        return acc;
    }, []);
    const twoMonth = twoRecentMonths.slice(-2);
    const data = {
        labels: twoMonth.map((data) => {
            return `Tháng ${data.month} năm ${data.year}`
        })
        ,
        datasets: [
            {
                label: 'total expense of month',
                data:
                    twoMonth.map((data) => {
                        return data.amount
                    }),
                backgroundColor: 'red'
            },
        ]
    }

    // const diffAmount = () => {
    //     const amountobj1 = (twoMonth[0].amount) / 100;
    //     const amountobj2 = (twoMonth[1].amount) / 100;

    //     const monthObj1 = twoMonth[0].month;
    //     const monthObj2 = twoMonth[1].month;
    //     if (amountobj1 > amountobj2) {
    //         return `Tổng chi tháng ${monthObj2} giảm ${amountobj1 - amountobj2}% so với tháng ${monthObj1} `
    //     } if (amountobj1 < amountobj2) {
    //         return `Tổng chi tháng ${monthObj2} tăng ${amountobj2 - amountobj1}% so với tháng ${monthObj1} `
    //     }
    // }


    return (
        <div style={{ width: "700px", height: "350px" }}>
            <Bar
                data={data}
            />
            <a href=""></a>
        </div>
    )
}

export default BarChart