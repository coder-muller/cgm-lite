import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Classe {
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
        const classes: Classe[] = await prisma.classes.findMany({
            where: {
                chave: chave
            },
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(classes, { status: 200 });
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
        const newClasse: Classe = await prisma.classes.create({
            data: {
                chave: chave,
                nome: nome,
            }
        });
        return NextResponse.json(newClasse, { status: 200 });
    } catch (err: unknown) {
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
        const updatedClasse: Classe = await prisma.classes.update({
            where: {
                id: parseInt(id)
            },
            data: {
                chave: chave,
                nome: nome,
            }
        });
        return NextResponse.json(updatedClasse, { status: 200 });
    } catch (err: unknown) {
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
        const deletedClasse: Classe = await prisma.classes.delete({
            where: {
                id: parseInt(id)
            }
        });
        return NextResponse.json(deletedClasse, { status: 200 });
    } catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}