import "../index.css";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast.js";
import { useRecoilState, useRecoilValue } from "recoil";
import expenseAtom from "../atoms/expenseAtom.js"
import userAtom from "../atoms/userAtom";
const CreateExpense = () => {
    const showToast = useShowToast();
    const [expenses, setExpenses] = useRecoilState(expenseAtom);
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
            const res = await fetch("/api/expense/add-expense", {
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
            setExpenses([data, ...expenses])
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
                placeholder="Expense Title"
                onChange={handleInput('title')}
                required />

            <input type="text"
                value={amount}
                name={'amount'}
                placeholder={'expenseAmount'}
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
                <option value="education">Education</option>
                <option value="groceries">Groceries</option>
                <option value="health">Health</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="takeaways">Takeaways</option>
                <option value="clothing">Clothing</option>
                <option value="travelling">Travelling</option>
                <option value="other">Other</option>
            </select>

            <textarea name="description"
                value={description}
                placeholder='Add A Reference'
                id="description" cols="30"
                rows="4" onChange={handleInput('description')}
                required>
            </textarea>
            <button name="Add Income" >+ Add Expense</button>
        </form>
    )
}

export default CreateExpense