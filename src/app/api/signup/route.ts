import { NextRequest, NextResponse } from 'next/server';

const VALKYRIE_BACKEND_URL = process.env.VALKYRIE_BACKEND_URL || 'http://localhost:6789';

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
    
    // Call the Valkyrie backend to create the organization and users
    const signupResponse = await fetch(`${VALKYRIE_BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        organization,
        password,
        confirmPassword,
        storageAmount
      })
    });
    
    if (!signupResponse.ok) {
      const errorData = await signupResponse.json();
      return NextResponse.json({ 
        error: errorData.error || 'Failed to create account' 
      }, { status: signupResponse.status });
    }
    
    const signupData = await signupResponse.json();
    
    console.log('Signup successful:', { 
      name, 
      email,
      organization,
      organizationId: signupData.organization_id,
      storageAmount
    });
    
    return NextResponse.json({
      success: true,
      orgId: signupData.organization_id,
      users: signupData.users,
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
