import { useState } from "react";
import type { ProdutoDados } from "../interfaces/produtoDados";
import { useProdutoDadosMutate } from "../hooks/useProdutoDadosMutate";

export function FormularioProduto() {

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");
  const [disponibilidade, setDisponibilidade] = useState(true);

  const { mutate } = useProdutoDadosMutate();

  function enviarFormulario(event: React.FormEvent) {
    event.preventDefault();

    const produto: ProdutoDados = {
      nome,
      descricao,
      preco: Number(preco),
      categoria,
      imagem,
      disponibilidade
    };

    mutate(produto);

    setNome("");
    setDescricao("");
    setPreco("");
    setCategoria("");
    setImagem("");
    setDisponibilidade(true);
  }

  return (
    <form className="formulario" onSubmit={enviarFormulario}>

      <h2>Novo Produto</h2>

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

      <button type="submit">
        Salvar Produto
      </button>

    </form>
  );
}