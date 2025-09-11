import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';

export async function GET() {
  try {
    // Test MongoDB connection
    await connectDB();
    
    return NextResponse.json({ 
      status: 'success',
      message: 'MongoDB connection successful',
      timestamp: new Date().toISOString(),
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasMongoDb: !!process.env.MONGODB_DB,
        nodeEnv: process.env.NODE_ENV
      }
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    return NextResponse.json({ 
      status: 'error',
      message: 'MongoDB connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasMongoDb: !!process.env.MONGODB_DB,
        nodeEnv: process.env.NODE_ENV
      }
    }, { status: 500 });
  }
}
