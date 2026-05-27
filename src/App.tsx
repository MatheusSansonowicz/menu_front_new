import "./App.css";

import { CartaoProduto } from "./components/CartaoProduto";
import { FormularioProduto } from "./components/FormularioProduto";
import { useProdutoDados } from "./hooks/useProdutoDados";
import { useState } from "react";

function App() {
  
  const { data, isLoading } = useProdutoDados();
  const [modalAberto, setModalAberto] = useState(false);
  return (
    <main className="container">

      <h1>MenuStream</h1>

      <button onClick={() => setModalAberto(true)}>
    Novo Produto
      </button>
{

       modalAberto && (
      
          <div className="overlay">
      
            <div className="modal">
      
              <button
                className="fechar"
                onClick={() => setModalAberto(false)}
              >
                X
              </button>
      
              <FormularioProduto />
      
            </div>
      
          </div>
      
        )
      }
    

      {isLoading && <p>Carregando...</p>}

      <section className="produtos">

        {data?.map((produto) => (
          <CartaoProduto
            key={produto.id}
            produto={produto}
          />
        ))}

      </section>

    </main>
  );
}

export default App;