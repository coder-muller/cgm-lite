'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Vendas from "./vendas";

export default function Home() {
    const router = useRouter();

    const logOut = () => {
        localStorage.removeItem("usuario");
        localStorage.removeItem("chave");
        localStorage.removeItem("permissao");
        router.push("/login");
    }

    return (
        <div className="w-screen h-screen p-6 flex justify-center">
            <div className="fixed top-4 right-4 flex items-center justify-end gap-2">
                <label className="text-md">{localStorage.getItem("usuario")}</label>
                <Button variant={"ghost"} onClick={logOut} className="">{<LogOut />}</Button>
            </div>
            <Tabs defaultValue="vendas">
                <div className="flex items-center justify-center">
                    <TabsList>
                        <TabsTrigger value="vendas">Vendas</TabsTrigger>
                        <TabsTrigger value="caixa">Caixa</TabsTrigger>
                        <TabsTrigger value="produtos">Produtos</TabsTrigger>
                        <TabsTrigger value="entradas">Entradas</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="vendas" className="w-screen px-10 py-3">
                    <Vendas />
                </TabsContent>
                <TabsContent value="caixa" className="w-screen px-10 py-3">
                </TabsContent>
                <TabsContent value="produtos" className="w-screen px-10 py-3">
                </TabsContent>
                <TabsContent value="entradas" className="w-screen px-10 py-3">
                </TabsContent>
            </Tabs>
        </div>
    );
}