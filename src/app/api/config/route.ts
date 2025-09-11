import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import OnboardingConfig from '@/models/OnboardingConfig';

export async function GET() {
  try {
    await connectDB();
    
    let config = await OnboardingConfig.findOne().sort({ created_at: -1 });
    
    if (!config) {
      // Create default configuration if none exists
      config = new OnboardingConfig({
        page_2_components: ['about_me', 'birthdate'],
        page_3_components: ['address']
      });
      await config.save();
    }

    return NextResponse.json({
      id: config._id,
      page_2_components: config.page_2_components,
      page_3_components: config.page_3_components,
      created_at: config.created_at
    });
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { page_2_components, page_3_components } = await request.json();

    if (!page_2_components || !page_3_components) {
      return NextResponse.json({ error: 'Both page components are required' }, { status: 400 });
    }

    if (!Array.isArray(page_2_components) || !Array.isArray(page_3_components)) {
      return NextResponse.json({ error: 'Components must be arrays' }, { status: 400 });
    }

    if (page_2_components.length === 0 || page_3_components.length === 0) {
      return NextResponse.json({ error: 'Each page must have at least one component' }, { status: 400 });
    }

    await connectDB();
    
    const config = new OnboardingConfig({
      page_2_components,
      page_3_components
    });

    await config.save();

    return NextResponse.json({
      id: config._id,
      page_2_components: config.page_2_components,
      page_3_components: config.page_3_components,
      created_at: config.created_at
    });
  } catch (error) {
    console.error('Error creating config:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
