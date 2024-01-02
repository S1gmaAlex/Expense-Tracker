import Expense from "../models/expenseModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const addExpense = async (req, res) =>{
   try {
        const {userId, title, amount, category, description, date}  = req.body

        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }

        const user = await User.findById(userId);
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        user.totalMoney -= parseInt(amount);
        
        if(user.totalMoney < 0){
            user.totalMoney == 0;
            return res.status(500).json({error:"bankrupt!!!"})
        }
        const newExpense = new Expense({userId, title, amount, category, description, date});
        await newExpense.save();
        await user.save();
        console.log(`total money : ${user.totalMoney}`);
		res.status(201).json(newExpense);
   } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}

const getExpense = async (req, res) =>{
    try {
        const token = req.cookies.jwt;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId).select("-password");

        const expense = await Expense.find({ userId: user._id})
        res.status(200).json(expense)
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}

const updateExpense = async(req, res) =>{
    const { title, amount, date, category, description } = req.body;
	try {
        const expense = await Expense.findById(req.params.id);
        
        if (!expense) {
			return res.status(404).json({ error: "Expense not found" });
		}
        const userId = expense.userId;
        const user = await User.findById(userId);
		if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const allExpense = await Expense.find({ userId: userId})
        const allAmount = await allExpense.map((item) => item.amount);
        const oldTotal = await allAmount.reduce((acc, amount) => acc + amount, 0);

		expense.title = title || expense.title;
		expense.amount = amount || expense.amount;
		expense.date = date || expense.date;
		expense.category = category || expense.category;
		expense.description = description || expense.description;
        await expense.save();
        
        const newAllExpense = await Expense.find({ userId: userId})
        const newAllAmount = await newAllExpense.map((item) => item.amount);
        const newTotal = await newAllAmount.reduce((acc, amount) => acc + amount, 0);

        if( newTotal < oldTotal){
            const diffAmount = oldTotal - newTotal
            user.totalMoney += diffAmount
        }
        if(newTotal > oldTotal){
            const diffAmount = newTotal - oldTotal
            user.totalMoney -= diffAmount
        }
        await user.save();
		res.status(200).json(expense);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in update expense: ", err.message);
	}
}

const deleteExpense = async (req, res) =>{
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
			return res.status(404).json({ error: "Expense not found" });
		}
        const userId = expense.userId;
        const user = await User.findById(userId);
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        user.totalMoney += parseInt(expense.amount);

        if(user.totalMoney < 0){
            user.totalMoney == 0;
            return res.status(500).json({error:"bankrupt!!!"})
        }
        
        await Expense.findByIdAndDelete(req.params.id);
        await user.save();
        console.log(`total money : ${user.totalMoney}`);
		res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}


export { addExpense, getExpense, updateExpense, deleteExpense};