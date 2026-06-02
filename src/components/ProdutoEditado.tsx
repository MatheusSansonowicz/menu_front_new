import { useState } from "react";
import type { ProdutoDados } from "../interfaces/produtoDados";
// IMPORTANTE: Importe o hook de update que criamos anteriormente
import { useProdutoDadosUpdate } from "../hooks/useProdutoDadosMutate.ts";

// Criamos uma interface para receber o produto que será editado
// e uma função para fechar o formulário depois de salvar
interface FormularioEdicaoProps {
    produtoAntigo: ProdutoDados;
    aoFechar: () => void;
}

export function FormularioEdicaoProduto({ produtoAntigo, aoFechar }: FormularioEdicaoProps) {
    // Inicializamos os estados com os valores que vieram do banco
    const [nome, setNome] = useState(produtoAntigo.nome);
    const [descricao, setDescricao] = useState(produtoAntigo.descricao);
    const [preco, setPreco] = useState(String(produtoAntigo.preco)); // Mantido como string pro input
    const [categoria, setCategoria] = useState(produtoAntigo.categoria);
    const [imagem, setImagem] = useState(produtoAntigo.imagem);
    const [disponibilidade, setDisponibilidade] = useState(produtoAntigo.disponibilidade);

    const { mutate } = useProdutoDadosUpdate();

    function enviarFormulario(event: React.FormEvent) {
        event.preventDefault();

        const produtoAtualizado: ProdutoDados = {
            id: produtoAntigo.id, // OBRIGATÓRIO: O Spring Boot precisa do ID para atualizar o registro certo
            nome,
            descricao,
            preco: Number(preco),
            categoria,
            imagem,
            disponibilidade
        };

        // Chamamos a mutação e usamos o onSuccess para fechar o formulário
        mutate(produtoAtualizado, {
            onSuccess: () => {
                aoFechar(); // Executa a função recebida por props para sumir com o formulário da tela
            }
        });
    }

    return (
        <form className="formulario" onSubmit={enviarFormulario}>
            <h2>Editar Produto</h2>

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <textarea
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <input
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
            />

            <input
                type="text"
                placeholder="Categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />

            <input
                type="text"
                placeholder="URL da imagem"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
            />

            <label>
                <input
                    type="checkbox"
                    checked={disponibilidade}
                    onChange={(e) => setDisponibilidade(e.target.checked)}
                />
                Produto disponível
            </label>

            <div className="botoes-acao" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit">
                    Salvar Alterações
                </button>
                {/* Botão extra para caso o usuário desista de editar */}
                <button type="button" onClick={aoFechar}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}