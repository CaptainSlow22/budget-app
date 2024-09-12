import { NextRequest, NextResponse } from 'next/server';
import Budget from '@/models/Budget';
import { connectMongoDB } from '@/lib/mongodb';
import { Types } from 'mongoose';

interface QueryParams {
  userId?: string;
  id?: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const userId = searchParams.get('userId');

  try {
    await connectMongoDB(); 

    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid Budget ID' }, { status: 400 });
      }

      const budget = await Budget.findById(id).populate('userId');

      if (!budget) {
        return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
      }

      return NextResponse.json({ budget }, { status: 200 });
    }

    if (userId) {
      if (!Types.ObjectId.isValid(userId)) {
        return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 });
      }

      const budgets = await Budget.find({ userId }).populate('userId');

      return NextResponse.json({ budgets }, { status: 200 });
    }

    return NextResponse.json({ error: 'No parameters provided' }, { status: 400 });
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
