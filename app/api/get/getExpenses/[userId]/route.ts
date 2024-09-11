import { NextResponse } from 'next/server';
import Expense from '@/models/Expense'; 
import Budget from '@/models/Budget';  
import { connectMongoDB } from '@/lib/mongodb';

interface Params {
  userId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
    const { userId } = params;
    
    try {
    await connectMongoDB();
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const budgets = await Budget.find({ userId });

    if (budgets.length === 0) {
      return NextResponse.json({ expenses: [] }, { status: 200 });
    }

    const budgetIds = budgets.map(budget => budget._id);

    const expenses = await Expense.find({ budgetId: { $in: budgetIds } });

    return NextResponse.json({ expenses }, { status: 200 });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
