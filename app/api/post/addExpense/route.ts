import { NextResponse } from 'next/server';
import Expense from '@/models/Expense';
import { connectMongoDB } from '@/lib/mongodb';

interface ExpenseBody {
  budgetId: string;
  name: string;
  amount: number;
}

export async function POST(request: Request) {
  const body: ExpenseBody = await request.json();
  
  try {
    await connectMongoDB();

    if (!body.budgetId || !body.name || !body.amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newExpense = await Expense.create({
      budgetId: body.budgetId,
      name: body.name,
      amount: body.amount,
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
