import { NextResponse } from 'next/server';
import Income from '@/models/Income';
import { connectMongoDB } from '@/lib/mongodb';

interface IncomeBody {
  userId: string;
  name: string;
  amount: number;
  icon?: string;
}

export async function POST(request: Request) {
  const body: IncomeBody = await request.json();
  
  try {
    await connectMongoDB();

    if (!body.userId || !body.name || !body.amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newIncome = await Income.create({
      userId: body.userId,
      name: body.name,
      amount: body.amount,
      icon: body.icon || '', // optional
    });

    return NextResponse.json(newIncome, { status: 201 });
  } catch (error) {
    console.error('Error creating income:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
