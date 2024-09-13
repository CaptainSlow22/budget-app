import { NextRequest, NextResponse } from "next/server";
import Income from "@/models/Income";
import { connectMongoDB } from "@/lib/mongodb";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await connectMongoDB();
        const deletedIncome = await Income.findByIdAndDelete(id);

        if (!deletedIncome) {
            return NextResponse.json(
                { message: "Income not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Income deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to delete the income", error },
            { status: 500 }
        );
    }
}
