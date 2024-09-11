import mongoose, { Schema, models } from "mongoose";
import User from "./User";

const budgetSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        icon: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

const Budget = models.Budget || mongoose.model("Budget", budgetSchema);
export default Budget;