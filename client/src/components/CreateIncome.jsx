import "../index.css";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast.js";
import { useRecoilState, useRecoilValue } from "recoil";
import incomeAtom from "../atoms/incomeAtom.js";
import userAtom from "../atoms/userAtom.js";
const CreateIncome = () => {
    const showToast = useShowToast();
    const [incomes, setIncomes] = useRecoilState(incomeAtom);
    const user = useRecoilValue(userAtom);
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/income/add-income", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user._id, ...inputState }),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Income created successfully", "success");
            setIncomes([data, ...incomes]);
            setInputState({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
            })
        } catch (error) {
            showToast("Error", error, "error");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                value={title}
                name={'title'}
                placeholder="Salary Title"
                onChange={handleInput('title')}
                required />

            <input type="text"
                value={amount}
                name={'amount'}
                placeholder={'Salary Amount'}
                onChange={handleInput('amount')}
                required />

            <input type="date"
                name={"date"}
                value={date}
                placeholder={'Enter Date'}
                onChange={handleInput('date')}
                required />

            <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                <option value="" disabled >Select Option</option>
                <option value="salary">Salary</option>
                <option value="freelancing">Freelancing</option>
                <option value="investments">Investiments</option>
                <option value="stocks">Stocks</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="bank">Bank Transfer</option>
                <option value="youtube">Youtube</option>
                <option value="other">Other</option>
            </select>

            <textarea name="description"
                value={description}
                placeholder='Add A Reference'
                id="description" cols="30"
                rows="4" onChange={handleInput('description')}
                required></textarea>
            <button name="Add Income">+ Add Income</button>
        </form>
    )
}

export default CreateIncome