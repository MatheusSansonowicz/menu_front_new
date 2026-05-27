import { useProdutoDadosDelete } from "../hooks/useProdutoDadosMutate";
import type {ProdutoDados} from "../interfaces/produtoDados";
import "./cartaoProduto.css"

interface CartaoProdutoProps {
    produto: ProdutoDados;
}

export function CartaoProduto({ produto }: CartaoProdutoProps) {
    const { mutate: deletar } = useProdutoDadosDelete();
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
        <button onClick={()=> deletar(produto.id)}>
        deletar produto
        </button>
      </div>
      
    );
  }