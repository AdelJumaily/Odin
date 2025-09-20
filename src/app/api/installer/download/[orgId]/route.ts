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
    
    // For now, we'll return a simple text file with installation instructions
    // In production, you would stream the actual ZIP file from storage
    const installerContent = `# Odin File Manager Installer

Organization: ${orgId}
Generated: ${new Date().toISOString()}

## Installation Instructions

1. Extract this file to your desired location
2. Run the start script:
   - Windows: double-click start.bat
   - Mac/Linux: run ./start.sh in terminal
3. Wait for "File Manager started!" message
4. Open your browser to http://appliance.local:3001 or http://localhost:3001

## Features Included

- End-to-End Encryption
- Secure File Sharing
- Advanced Search
- Folder Management
- Version Control
- Access Control
- Local Control

## Security

- All files are encrypted using AES-256-CBC encryption
- Each file has its own unique encryption key
- Complete control over your data, no cloud dependency

For support, contact your Odin administrator.
`;
    
    return new NextResponse(installerContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="odin-file-manager-${orgId}.txt"`,
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
