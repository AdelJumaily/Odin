import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    
    if (!orgId) {
      return NextResponse.json({ error: 'orgId is required' }, { status: 400 });
    }
    
    // For Vercel deployment, redirect to the static ZIP file
    // The ZIP file is pre-generated and stored in the public directory
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://odin-weld-beta.vercel.app';
    
    const downloadUrl = `${baseUrl}/odin-valkyrie-default.zip`;
    
    // Return a redirect response to the static file
    return NextResponse.redirect(downloadUrl, 302);
    
  } catch (error) {
    console.error('Error downloading installer:', error);
    return NextResponse.json(
      { error: 'Failed to download installer' }, 
      { status: 500 }
    );
  }
}
