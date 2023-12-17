import { NextResponse } from 'next/server';

import prisma from '@/db'

export async function GET() {
    const favourites = await prisma.city.findMany({take: 5})
    return NextResponse.json(favourites);
}