'use client'

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import RendaFixa from "./rendaFixa";
import Ajustes from "./ajustes";

export default function Financeiro() {

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
            <Tabs defaultValue="ajustes">
                <div className="flex items-center justify-center">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="rendaFixa">Renda Fixa</TabsTrigger>
                        <TabsTrigger value="rendaVariavel">Renda Variável</TabsTrigger>
                        <TabsTrigger value="ajustes">Ajustes</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="overview" className="w-screen px-10 py-3">
                </TabsContent>
                <TabsContent value="rendaFixa" className="w-screen px-10 py-3">
                    <RendaFixa />
                </TabsContent>
                <TabsContent value="rendaVariavel" className="w-screen px-10 py-3">
                </TabsContent>
                <TabsContent value="ajustes" className="w-screen px-10 py-3">
                    <Ajustes />
                </TabsContent>
            </Tabs>
        </div>
    )
}