import { NextRequest, NextResponse } from "next/server";
import Expense from "@/models/Expense";
import { connectMongoDB } from "@/lib/mongodb";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await connectMongoDB();
        const deletedExpense = await Expense.findByIdAndDelete(id);

        if (!deletedExpense) {
            return NextResponse.json(
                { message: "Expense not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Expense deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to delete the expense", error },
            { status: 500 }
        );
    }
}
