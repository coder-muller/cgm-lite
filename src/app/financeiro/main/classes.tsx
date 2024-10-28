import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios, { AxiosResponse } from "axios";
import { PlusCircle, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Classe {
    id: number;
    chave: string;
    nome: string;
    usuario: number;
    createdAt: Date;
    updatedAt: Date;
}

export default function Classes() {

    const [classes, setClasses] = useState<Classe[]>([]);

    const [isOpen, setIsOpen] = useState(false);

    const [classe, setClasse] = useState("");

    const loadClasses = () => {
        axios.get("/api/classes?chave=" + localStorage.getItem("chave"))
        .then((response) => {
            setClasses(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    
    const addClasse = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response: AxiosResponse = await axios.post('/api/classes', {
                chave: localStorage.getItem("chave"),
                nome: classe,
            });
            if (response.status === 200) {
                toast.success("Sucesso!", { description: "Classe adicionada com sucesso!" });
                setClasse("");
                loadClasses();
                setIsOpen(false);
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

    const deleteClasse = async (id: number) => {
        try {
            const response: AxiosResponse = await axios.delete(`/api/classes?id=${id}`);
            if (response.status === 200) {
                //toast.success("Sucesso!", { description: "Classe excluída com sucesso!" });
                loadClasses();
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

    }

    useEffect(() => {
        loadClasses();
    }, []);

    return (
        <div className="w-11/12 m-auto flex flex-col items-center justify-start gap-2   ">
            <div className="w-full flex items-center justify-end">
                <Button onClick={() => setIsOpen(true)}>
                    <PlusCircle />
                    Adicionar Classe
                </Button>
            </div>
            <div className="w-full rounded-md border">
                <Table>
                    <TableHeader>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead></TableHead>
                    </TableHeader>
                    <TableBody>
                        {classes.map((classe: Classe) => (
                            <TableRow key={classe.id}>
                                <TableCell>{classe.id}</TableCell>
                                <TableCell>{classe.nome}</TableCell>
                                <TableCell><Trash2Icon className="w-4 h-4 cursor-pointer" onClick={() => toast.warning("Atenção!", {
                                    description: "A classe será excluída permanentemente!",
                                    action: {
                                        label: "Excluir",
                                        onClick: async () => toast.promise( deleteClasse(classe.id), {
                                            loading: "Excluindo...",
                                            success: "Classe excluída com sucesso!",
                                            error: "Ops! Algo deu errado...",
                                        })
                                    }
                                })} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Classe</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={addClasse}>
                        <div>
                            <Label>Nome da Classe</Label>
                            <Input type="text" placeholder="Nome da Classe" required value={classe} onChange={(e) => setClasse(e.target.value)} />
                        </div>
                        <DialogFooter className="mt-3">
                            <DialogClose asChild>
                                <Button type="reset" variant={"secondary"}>Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}