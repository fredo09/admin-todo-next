/**
 * First Api endPoint
 */

import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request) { 

  return NextResponse.json({
    message: 'Hello word! desde api en next'
  });
}