/**
 * endPoint todos con id de parametro
 */

import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

interface Segments {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params: { id } }: Segments) { 
    console.log("🚀 ~ GET ~ id:", id);

    const todoDB = await prisma.todo.findFirst({ where: { id } });
    console.log("🚀 ~ GET ~ todoDB:", todoDB);

    if (!todoDB) {
        return NextResponse.json({
            status: 'OK',
            code: 404,
            message: `No existe el todo con el id: ${id} `,
        }, { status: 404 });
    }

    return NextResponse.json({
        status: 'OK',
        code: 200,
        message: 'Recuperaste el todo con el id recuperado',
        todo: todoDB
    });
}