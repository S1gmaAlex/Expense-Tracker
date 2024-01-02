import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
    {   
        userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
        title: {
            type: String,
            required: true,
            maxLength: 50
        },
        amount: {
            type: Number,
            required: true,
            maxLength: 20,
            trim: true
        },
        type: {
            type: String,
            default:"expense"
        },
        date: {
            type: Date,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 20,
            trim: true
        },
    }, 
    {
        timestamps: true
    }
);


const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;