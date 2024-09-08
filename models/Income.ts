import mongoose, { Schema, models } from "mongoose";
import User from "./User";

const incomeSchema = new Schema(
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

const Income = models.Income || mongoose.model("Income", incomeSchema);
export default Income;