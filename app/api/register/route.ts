import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcryptjs";

export async function POST(request: NextRequest) {
        const {name, email, password} = await request.json();
        const hashedPassword = await hashSync(password, 10);
    try {
        await connectMongoDB();
        const newUser = {
            name,
            email,
            password: hashedPassword
        }

        await User.create(newUser)
        return NextResponse.json({message: "User registered successfully", user: newUser}, {status: 201});

    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Error registering user..."}, {status: 500});
    }
}