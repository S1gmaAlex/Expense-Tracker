import express from "express";
import{
     addIncome, 
     getIncome, 
     updateIncome,
     deleteIncome
    }from "../controllers/incomeController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.post('/add-income', protectRoute, addIncome);
router.get('/get-incomes', protectRoute, getIncome);
router.put("/update-income/:id", protectRoute, updateIncome);
router.delete('/delete-income/:id', protectRoute, deleteIncome);

export default router;