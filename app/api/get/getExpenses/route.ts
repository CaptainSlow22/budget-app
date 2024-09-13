import { NextRequest, NextResponse } from 'next/server';
import Expense from '@/models/Expense'; 
import Budget from '@/models/Budget';  
import { connectMongoDB } from '@/lib/mongodb';

interface QueryParams {
    userId?: string;
    budgetId?: string;
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const budgetId = searchParams.get('budgetId');

  try {

    await connectMongoDB();

    if (userId) {
      const budgets = await Budget.find({ userId });

      if (budgets.length === 0) {
        return NextResponse.json({ expenses: [] }, { status: 200 });
      }

      const budgetIds = budgets.map(budget => budget._id);
      const expenses = await Expense.find({ budgetId: { $in: budgetIds } });

      return NextResponse.json({ expenses }, { status: 200 });
    }

    if (budgetId) {
      const expenses = await Expense.find({ budgetId });

      if (!expenses.length) {
        return NextResponse.json({ expenses: [] }, { status: 200 });
      }

      return NextResponse.json({ expenses }, { status: 200 });
    }

    return NextResponse.json({ error: 'Either userId or budgetId is required' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
