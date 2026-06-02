import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {ProdutoDados} from "../interfaces/produtoDados";

const API_URL  = "http://localhost:8080";


async function salvarProduto(produto: ProdutoDados) {

    const response = await axios.post(
      `${API_URL}/produtos`,
      produto
    );
  
    return response.data;
}

export function useProdutoDadosMutate(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: salvarProduto,
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["produto-dados"]
            });
        }
    })
}

export async function editarProduto(produto: ProdutoDados) {
    const response = await axios.put(
        `${API_URL}/produtos/${produto.id}`,
        produto
    );
    return response.data;
}
export function useProdutoDadosUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editarProduto,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["produto-dados"]
            });
        }
    });
}

async function deletarProduto(id: number): Promise<void> {

    await axios.put(`${API_URL}/produtos/delete/${id}`);
}

export function useProdutoDadosDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletarProduto,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produto-dados"] });
        }
    });
}