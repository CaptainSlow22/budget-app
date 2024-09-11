import { NextResponse } from 'next/server';
import Budget from '@/models/Budget';
import { connectMongoDB } from '@/lib/mongodb';

interface BudgetBody {
  userId: string;
  name: string;
  amount: number;
  icon?: string;
}

export async function POST(request: Request) {
  const body: BudgetBody = await request.json();
  
  try {
    await connectMongoDB();

    if (!body.userId || !body.name || !body.amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBudget = await Budget.create({
      userId: body.userId,
      name: body.name,
      amount: body.amount,
      icon: body.icon || '', // optional
    });

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error('Error creating budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
