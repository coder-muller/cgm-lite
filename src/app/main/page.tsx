import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Vendas from "./vendas";


export default function Home() {
    return (
        <div className="w-screen h-screen p-6 flex justify-center">
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
                    <Vendas/>
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