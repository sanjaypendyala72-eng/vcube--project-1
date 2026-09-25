import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check root directory or public directory for the asset in a portable manner
    const candidatePaths = [
      path.join(process.cwd(), '..', 'ChatGPT Image Sep 24, 2026, 11_38_08 AM.png'),
      path.join(process.cwd(), 'ChatGPT Image Sep 24, 2026, 11_38_08 AM.png'),
      path.join(process.cwd(), 'public', 'custom-bg.png')
    ];

    const foundPath = candidatePaths.find(p => existsSync(p));
    if (!foundPath) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    const file = readFileSync(foundPath);
    return new NextResponse(file, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200'
      }
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
