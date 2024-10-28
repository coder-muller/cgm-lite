
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Carteira {
    id: number;
    chave: string;
    nome: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const chave = searchParams.get("chave");
    if (!chave) {
        return NextResponse.json({ message: "Chave não informada" }, { status: 400 });
    }
    try {
        const carteiras: Carteira[] = await prisma.carteiras.findMany({
            where: {
                chave: chave
            },
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(carteiras, { status: 200 });
    } catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { chave, nome } = body;
    if (!chave || !nome) {
        return NextResponse.json({ message: "Chave ou nome não informada" }, { status: 400 });
    }
    try {
        const newCarteira: Carteira = await prisma.carteiras.create({
            data: {
                chave: chave,
                nome: nome,
            }
        });
        return NextResponse.json(newCarteira, { status: 200 });
    }catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { id, chave, nome } = body;
    if (!id || !chave || !nome) {
        return NextResponse.json({ message: "ID, chave ou nome não informada" }, { status: 400 });
    }
    try {
        const updatedCarteira: Carteira = await prisma.carteiras.update({
            where: {
                id: parseInt(id)
            },
            data: {
                chave: chave,
                nome: nome,
            }
        });
        return NextResponse.json(updatedCarteira, { status: 200 });
    }catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: "ID não informada" }, { status: 400 });
    }
    try {
        const deletedCarteira: Carteira = await prisma.carteiras.delete({
            where: {
                id: parseInt(id)
            }
        });
        return NextResponse.json(deletedCarteira, { status: 200 });
    }catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ message: error.message }, { status: 500 });
    }    
}