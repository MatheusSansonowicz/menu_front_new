import { useState } from "react";
import { useProdutoDadosDelete } from "../hooks/useProdutoDadosMutate";
import type { ProdutoDados } from "../interfaces/produtoDados";
import { FormularioEdicaoProduto } from "./ProdutoEditado.tsx"; // Importe o novo formulário
import "./cartaoProduto.css";

interface CartaoProdutoProps {
    produto: ProdutoDados;
}

export function CartaoProduto({ produto }: CartaoProdutoProps) {
    const { mutate: deletar } = useProdutoDadosDelete();

    const [estaEditando, setEstaEditando] = useState(false);

    if (estaEditando) {
        return (
            <div className="cartao">
                <FormularioEdicaoProduto
                    produtoAntigo={produto}
                    aoFechar={() => setEstaEditando(false)}
                />
            </div>
        );
    }

    return (
        <div className="cartao">
            <img src={produto.imagem} alt={`Imagem de ${produto.nome}`} />

            <div className="cartao-conteudo">
                <h2>{produto.nome}</h2>

                <p>{produto.descricao}</p>

                <p>
                    <strong>Categoria:</strong> {produto.categoria}
                </p>

                <p>
                    <strong>Valor:</strong> R$ {produto.preco.toFixed(2)}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {produto.disponibilidade ? "Disponível" : "Indisponível"}
                </p>
            </div>

            <div className="cartao-botoes" style={{ display: "flex", gap: "10px", padding: "10px" }}>

                <button onClick={() => setEstaEditando(true)}>
                    Editar Produto
                </button>

                <button onClick={() => deletar(produto.id)}>
                    Deletar Produto
                </button>
            </div>
        </div>
    );
}