import mongoose, { Schema, models } from "mongoose";
import Budget from "./Budget";

const expenseSchema = new Schema(
    {
        budgetId: {
            type: Schema.Types.ObjectId,
            ref: 'Budget'
        },
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Expense = models.Expense || mongoose.model("Expense", expenseSchema);
export default Expense;