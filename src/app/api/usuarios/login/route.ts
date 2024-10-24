import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { chave, usuario, senha } = await request.json();
        if (!chave || !usuario || !senha) {
            return NextResponse.json({ message: "Chave, usuário ou senha não informados" }, { status: 400 });
        }
        const user = await prisma.usuarios.findFirst({
            where: {
                chave: chave,
                usuario: usuario,
            },
        });
        if (!user) {
            return NextResponse.json({ message: "Usuário ou chave inválidos" }, { status: 404 });
        }
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Senha inválida" }, { status: 401 });
        }
        return NextResponse.json({
            message: "Login bem-sucedido",
            user: {
                id: user.id,
                user: user.usuario,
                chave: user.chave,
                permissao: user.permissao
            }
        }, { status: 200 });
    } catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}