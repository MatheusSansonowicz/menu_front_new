import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export async function deletarProduto(id:number) {
    
    const response = await axios.delete(
        `${API_URL}/produtos/${id}`
    );
    return response.data;
}

export function useProdutoDadosDelete() {
    const queryClient = useQueryClient();
  
    return useMutation({
      // Aqui passamos o ID para a função de deleção
      mutationFn: (id: number) => deletarProduto(id), 
      onSuccess: () => {
        // Atualiza a lista automaticamente após deletar
        queryClient.invalidateQueries({ queryKey: ["produto-dados"] });
      }
    });
  }