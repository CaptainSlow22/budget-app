import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User"; 

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        await connectMongoDB();

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
