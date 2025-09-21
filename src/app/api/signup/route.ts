import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, organization, password, confirmPassword, storageAmount } = await request.json();
    
    // Basic validation
    if (!name || !email || !organization || !password || !confirmPassword || !storageAmount) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    
    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }
    
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }
    
    // Generate a mock org ID (in production, this would be created in your database)
    const orgId = `org_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // In production, you would:
    // 1. Hash the password
    // 2. Create user in database with name, email, password
    // 3. Create organization with storageAmount preferences
    // 4. Send verification email
    // 5. Return actual user/org data
    
    console.log('Mock signup:', { 
      name, 
      email,
      organization,
      orgId, 
      storageAmount
    });
    
    return NextResponse.json({
      success: true,
      orgId,
      message: 'Account created successfully'
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
