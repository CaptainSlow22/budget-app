import { NextRequest, NextResponse } from 'next/server';
import Budget from '@/models/Budget';
import { connectMongoDB } from '@/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        await connectMongoDB();
        

        const budgets = await Budget.find({ userId }).populate('userId'); 

        return NextResponse.json({ budgets }, { status: 200 });
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}
