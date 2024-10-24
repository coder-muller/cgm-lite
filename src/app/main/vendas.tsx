'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { toast } from "sonner";

export default function Vendas() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Vendas</CardTitle>
                <CardDescription>Aqui você pode vender os produtos da sua loja.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-11/12 m-auto flex flex-col items-center justify-start ">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="w-1/6">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Atendente' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="1">Guilherme</SelectItem>
                                            <SelectItem value="2">Gilcele</SelectItem>
                                            <SelectItem value="3">Clairto</SelectItem>
                                            <SelectItem value="4">Millene</SelectItem>
                                            <SelectItem value="5">Ilma</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-1/6">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Modalidade' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="1">À vista</SelectItem>
                                            <SelectItem value="2">Parcelado</SelectItem>
                                            <SelectItem value="3">Troca</SelectItem>
                                            <SelectItem value="4">Desconto 10%</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" onClick={() => toast.info('Ainda em desencolvimento...')}>Limpar Venda</Button>
                            <Button onClick={() => toast.info('Ainda em desencolvimento...')}>Finalizar Venda</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}