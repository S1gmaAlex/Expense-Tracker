import Income from "../models/incomeModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const addIncome = async (req, res) =>{
   try {
        const {userId, title, amount, category, description, date}  = req.body

        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }

        const user = await User.findById(userId);
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        user.totalMoney += parseInt(amount);
        
        if(user.totalMoney < 0){
            user.totalMoney = 0;
            return res.status(500).json({error:"bankrupt!!!"})
        }
        const newIncome = new Income({userId, title, amount, category, description, date});
		await newIncome.save();
        await user.save();
        console.log(`total money : ${user.totalMoney}`);
		res.status(201).json(newIncome);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}

const getIncome = async (req, res) =>{
    try {
        const token = req.cookies.jwt;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId).select("-password");

        const income = await Income.find({ userId: user._id})
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}

const updateIncome = async(req, res) =>{
    const { title, amount, date, category, description } = req.body;
	try {
        const income = await Income.findById(req.params.id);
        
        if (!income) {
			return res.status(404).json({ error: "Income not found" });
		}
		income.title = title || income.title;
		income.amount = amount || income.amount;
		income.date = date || income.date;
		income.category = category || income.category;
		income.description = description || income.description;
        await income.save();

        const userId = income.userId;
        const user = await User.findById(userId);
		if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const allincome = await Income.find({ userId: userId})
        const allAmount = await allincome.map((item) => item.amount);

        const finalTotal = await allAmount.reduce((acc, amount) => acc + amount, 0);
        user.totalMoney = await finalTotal
        await user.save();
		res.status(200).json(income);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in update income: ", err.message);
	}
}

const deleteIncome = async (req, res) =>{
    try {
        const income = await Income.findById(req.params.id);

        if (!income) {
			return res.status(404).json({ error: "Income not found" });
		}

        const userId = income.userId;
        const user = await User.findById(userId);
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        user.totalMoney -= parseInt(income.amount);

        if(user.totalMoney < 0){
            user.totalMoney = 0;
            return res.status(500).json({error:"bankrupt!!!"})
        }
        
        await Income.findByIdAndDelete(req.params.id);
        await user.save();
        console.log(`total money : ${user.totalMoney}`);
		res.status(200).json({ message: "Income deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}

export { addIncome, getIncome, updateIncome, deleteIncome};