import { NextRequest, NextResponse } from 'next/server';
import Budget from '@/models/Budget'; 
import { connectMongoDB } from '@/lib/mongodb'; 
import mongoose from 'mongoose';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; 

  try {
    await connectMongoDB();

    const { amount } = await request.json();

    if (amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { amount },
      { new: true, runValidators: true } 
    );

    if (!updatedBudget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBudget, { status: 200 });

  } catch (error) {
    console.error('Error updating budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
