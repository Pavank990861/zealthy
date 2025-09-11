import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const { email, password, current_step = 1 } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();
    
    const user = new User({
      email,
      password,
      current_step
    });

    await user.save();

    return NextResponse.json({ 
      id: user._id, 
      email: user.email, 
      current_step: user.current_step 
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).sort({ created_at: -1 });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
