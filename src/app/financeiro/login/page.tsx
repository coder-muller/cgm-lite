'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import axios from "axios"
import { useState } from "react"
import { ModeToggle } from "@/components/darkModeToggle"
import { useRouter } from "next/navigation"

export default function LoginFinanceiro() {

    const [chave, setChave] = useState<string>("")
    const [usuario, setUsuario] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const router = useRouter()

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/usuarios/login', {
                chave: chave,
                usuario: usuario,
                senha: senha,
            });
            if (response.status === 200) {
                const user = response.data.user;
                localStorage.setItem("usuario", user.user);
                localStorage.setItem("chave", user.chave);
                localStorage.setItem("permissao", user.permissao.toString());
                console.log(response)
                toast.success("Sucesso!", { description: "Bem vindo(a) " + response.data.user.user + "!" });
                router.push("/financeiro/main")
            } else {
                toast.warning("Ops!", { description: response.data.message });
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error("Erro!", { description: error.response?.data?.message || "Erro desconhecido" });
            } else {
                const err = error as Error;
                toast.error("Erro!", { description: err.message });
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <div className="fixed top-4 right-4 flex items-center justify-end gap-2">
                <Button
                    variant={"secondary"}
                    onClick={() => {
                    router.back()
                    }}
                >CGM Sistemas</Button>
                <ModeToggle />
            </div>
            <Card className="w-1/4">
                <CardHeader className="flex items-center">
                    <h1 className="text-2xl font-bold">CGM Financeiro</h1>
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