'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import { useState } from "react"

interface UsuarioProps {
    id: number
    chave: string
    usuario: string
    senha: string
    permissao: number
    created_at: string
    updated_at: string
}

export default function Login() {

    const [chave, setChave] = useState<string>("")
    const [usuario, setUsuario] = useState<string>("")
    const [senha, setSenha] = useState<string>("")

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.get('/api/usuarios', { params: { chave: chave } })
            console.log(`chave: ${chave}, usuario: ${usuario}, senha: ${senha}`)
            if ((response.data).length < 1) {
                toast.warning("Ops!", { description: "Chave inválida" })
                return
            }
            const user = response.data.filter((user: UsuarioProps) => user.usuario === usuario && user.senha === senha)
            if (user.length < 1) {
                toast.warning("Ops!", { description: "Usuário ou senha inválidos" })
                return
            }
            localStorage.setItem("usuario", user[0].id.toString())
            localStorage.setItem("chave", user[0].chave)
            localStorage.setItem("permissao", user[0].permissao.toString())
            toast.success("Sucesso!", { description: response.data.message })
            window.location.href = "/main"
        } catch (error: unknown) {
            const err = error as Error
            if (error instanceof AxiosError && error.response) {
                toast.error("Erro!", { description: error.response.data.message || "Erro desconhecido" })
            } else {
                toast.error("Erro!", { description: err.message })
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <Card className="w-1/4">
                <CardHeader className="flex items-center">
                    <h1 className="text-2xl font-bold">CGM Lite</h1>
                </CardHeader>
                <CardContent>
                    <form onSubmit={login}>
                        <div>
                            <Label>Chave</Label>
                            <Input type="text" placeholder="Chave" required value={chave} onChange={(e) => setChave(e.target.value)} />
                        </div>
                        <div>
                            <Label>Usuário</Label>
                            <Input type="text" placeholder="Usuário" required value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                        </div>
                        <div>
                            <Label>Senha</Label>
                            <Input type="password" placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <Button type="submit" className="mt-4 w-full">Entrar</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}