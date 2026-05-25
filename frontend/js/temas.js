const params = new URLSearchParams(window.location.search);

const temaId = params.get("temaId");

async function carregarQuizzes() {
  try {
    const res = await fetch(`http://localhost:3000/quizzes/tema/${temaId}`);

    if (!res.ok) {
      throw new Error("Erro ao buscar quizzes");
    }

    const quizzes = await res.json();

    const grid = document.getElementById("gridQuizzes");

    if (!grid) return;

    if (quizzes.length === 0) {
      grid.innerHTML = `
        <div class="card-vazio">
          Nenhum quiz encontrado nessa categoria.
        </div>
      `;
      return;
    }

    grid.innerHTML = quizzes
      .map(
        (quiz) => `
        <div class="tema-box">

          <div class="tema-conteudo">

            <h3 class="tema-titulo">
              ${quiz.titulo}
            </h3>

            <p class="tema-descricao">
              ${quiz.descricao || "Sem descrição"}
            </p>

          </div>

          <button
            class="btn-primary"
            onclick="window.location.href='responder-quiz.html?quizId=${quiz.id}'"
          >
            Jogar
          </button>

        </div>
      `,
      )
      .join("");

    atualizarTituloTema(quizzes);
  } catch (error) {
    console.log(error);

    const grid = document.getElementById("gridQuizzes");

    if (grid) {
      grid.innerHTML = `
        <div class="error-temas">
          Erro ao carregar quizzes.
        </div>
      `;
    }
  }
}

function atualizarTituloTema(quizzes) {
  const titulo = document.getElementById("tituloTema");

  if (!titulo) return;

  if (quizzes.length > 0) {
    titulo.textContent = quizzes[0].tema?.nome || "Categoria";
  }
}

carregarQuizzes();
