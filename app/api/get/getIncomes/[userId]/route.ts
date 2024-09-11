import { NextRequest, NextResponse } from 'next/server';
import Income from '@/models/Income';
import { connectMongoDB } from '@/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        await connectMongoDB();
        

        const incomes = await Income.find({ userId }).populate('userId');

        return NextResponse.json({ incomes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}
