import { NextResponse } from 'next/server'

import prisma from '@/db'

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const favourite = await prisma.city.findUnique({
        where: {
            id: searchParams.get('id')
        }
    })
    
    return NextResponse.json(favourite);
}