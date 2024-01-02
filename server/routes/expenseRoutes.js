import express from "express";
import{
    addExpense, 
    getExpense,
    updateExpense,
    deleteExpense
    }from "../controllers/expenseController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.post('/add-expense', protectRoute, addExpense);
router.get('/get-expenses', protectRoute, getExpense);
router.put("/update-expense/:id", protectRoute, updateExpense);
router.delete('/delete-expense/:id', protectRoute, deleteExpense);

export default router;