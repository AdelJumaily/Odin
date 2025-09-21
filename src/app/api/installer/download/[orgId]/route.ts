import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    
    if (!orgId) {
      return NextResponse.json({ error: 'orgId is required' }, { status: 400 });
    }
    
    // Check if ZIP already exists
    const zipPath = path.join(process.cwd(), 'public', `odin-valkyrie-${orgId}.zip`);
    
    if (!fs.existsSync(zipPath)) {
      // Create the Valkyrie package
      console.log(`Creating Valkyrie package for org: ${orgId}`);
      
      try {
        // Run the package creation script
        execSync(`node scripts/create-valkyrie-package.js ${orgId}`, {
          cwd: process.cwd(),
          stdio: 'pipe'
        });
      } catch (error) {
        console.error('Error creating package:', error);
        return NextResponse.json(
          { error: 'Failed to create installer package' }, 
          { status: 500 }
        );
      }
    }
    
    // Check if ZIP was created successfully
    if (!fs.existsSync(zipPath)) {
      return NextResponse.json(
        { error: 'Installer package not found' }, 
        { status: 404 }
      );
    }
    
    // Read the ZIP file
    const zipBuffer = fs.readFileSync(zipPath);
    
    // Return the ZIP file
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="odin-valkyrie-${orgId}.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error('Error downloading installer:', error);
    return NextResponse.json(
      { error: 'Failed to download installer' }, 
      { status: 500 }
    );
  }
}
