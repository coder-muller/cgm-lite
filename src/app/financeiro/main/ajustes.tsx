import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Carteiras from "./carteiras";
import Classes from "./classes";

export default function Ajustes() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ajustes</CardTitle>
                <CardDescription>Aqui você pode fazer ajustes na sua conta.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-11/12 m-auto flex flex-col items-center justify-start ">
                    <Tabs defaultValue="carteiras">
                        <div className="flex items-center justify-center">
                            <TabsList>
                                <TabsTrigger value="carteiras">Carteiras</TabsTrigger>
                                <TabsTrigger value="classes">Classes</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="carteiras" className="w-screen px-10 py-3">
                            <Carteiras />
                        </TabsContent>
                        <TabsContent value="classes" className="w-screen px-10 py-3">
                            <Classes />
                        </TabsContent>
                    </Tabs>
                </div>
            </CardContent>
        </Card>
    )
}