import { NextRequest, NextResponse } from "next/server";
import Budget from "@/models/Budget";
import Expense from "@/models/Expense";
import { connectMongoDB } from "@/lib/mongodb";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await connectMongoDB();

        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return NextResponse.json(
                { message: "Budget not found" },
                { status: 404 }
            );
        }

        // After deleting the budget, delete all associated expenses
        await Expense.deleteMany({ budgetId: id });

        return NextResponse.json(
            { message: "Budget and associated expenses deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting budget and expenses:", error);
        return NextResponse.json(
            { message: "Failed to delete the budget and associated expenses", error },
            { status: 500 }
        );
    }
}
