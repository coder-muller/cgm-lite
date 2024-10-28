'use server'

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface User {
    id: number;
    chave: string;
    usuario: string;
    senha: string;
    permissao: number;
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
        const usuarios: User[] = await prisma.usuarios.findMany({
            where: {
                chave: chave
            },
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(usuarios, { status: 200 });
    } catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { chave, usuario, senha } = body;
    if (!chave || !usuario || !senha) {
        return NextResponse.json({ message: "Chave, usuário ou senha não informada" }, { status: 400 });
    }
    try {
        const hashedSenha = await bcrypt.hash(senha, 10)
        const newUsuario = await prisma.usuarios.create({
            data: {
                chave: chave,
                usuario: usuario,
                senha: hashedSenha,
                permissao: 1
            }
        });
        return NextResponse.json(newUsuario, { status: 200 });
    }catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}