'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

export default function RendaFixa() {
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
                                        <SelectValue placeholder='Carteira' />
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
                                        <SelectValue placeholder='Tipo' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="1">Pré-Fixado</SelectItem>
                                            <SelectItem value="2">Pós-Fixado</SelectItem>
                                            <SelectItem value="3">Fundos</SelectItem>
                                            <SelectItem value="4">COE</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Button onClick={() => toast.info('Ainda em desencolvimento...')}>
                                <PlusCircle />
                                Adicionar Renda Fixa
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}