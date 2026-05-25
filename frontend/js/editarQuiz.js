/* =========================
   CONFIG
========================= */

const API_URL = "http://localhost:3000";
const quizId = new URLSearchParams(window.location.search).get("quizId");

/* =========================
   ESTADO
========================= */

let quizData = null;
let alternativasTemp = [];
let perguntaEditandoId = null;

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  carregarQuiz();
  criarAlternativasIniciais();
});

/* =========================
   REQUEST
========================= */

async function request(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro na requisição");
  }

  return data;
}

/* =========================
   QUIZ
========================= */

async function carregarQuiz() {
  try {
    quizData = await request(`/quizzes/${quizId}`);

    document.getElementById("quizTitulo").value = quizData.titulo;
    document.getElementById("quizDificuldade").value = quizData.dificuldade;

    renderPerguntas();
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar quiz");
  }
}

async function salvarQuiz() {
  try {
    await request(`/quizzes/${quizId}`, {
      method: "PUT",
      body: JSON.stringify({
        titulo: document.getElementById("quizTitulo").value,
        dificuldade: document.getElementById("quizDificuldade").value,
      }),
    });

    alert("Quiz atualizado com sucesso!");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

/* =========================
   RENDER
========================= */

function renderPerguntas() {
  const container = document.getElementById("listaPerguntas");

  if (!quizData.perguntas?.length) {
    container.innerHTML = `
      <div class="card-vazio">
        <p>Nenhuma pergunta cadastrada ainda.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = quizData.perguntas
    .map((pergunta, perguntaIndex) => {
      const editando = perguntaEditandoId === pergunta.id;

      return `
        <div class="card-pergunta">

          <div class="pergunta-header">

            <span class="badge-topo">
              Pergunta ${perguntaIndex + 1}
            </span>

            <div class="acoes-pergunta">

              ${
                editando
                  ? `
                    <button
                      class="btn-primary"
                      onclick="salvarEdicaoPergunta(${pergunta.id})"
                    >
                      Salvar
                    </button>
                  `
                  : `
                    <button
                      class="btn-secundario"
                      onclick="habilitarEdicao(${pergunta.id})"
                    >
                      Editar
                    </button>
                  `
              }

              <button
                class="btn-delete"
                onclick="deletarPergunta(${pergunta.id})"
              >
                Excluir
              </button>

            </div>

          </div>

          <input
            id="pergunta-${pergunta.id}"
            class="input-pergunta"
            type="text"
            value="${pergunta.texto}"
            ${editando ? "" : "disabled"}
          />

          <div class="lista-alternativas">

            ${pergunta.alternativas
              .map(
                (alternativa, altIndex) => `
                  <div class="alternativa-item ${alternativa.correta ? "correta" : ""}">

                    <span class="letra">
                      ${String.fromCharCode(65 + altIndex)}
                    </span>

                    <input
                      id="alternativa-${alternativa.id}"
                      type="text"
                      value="${alternativa.texto}"
                      ${editando ? "" : "disabled"}
                    />

                    <input
                      type="radio"
                      name="correta-${pergunta.id}"
                      value="${alternativa.id}"
                      ${alternativa.correta ? "checked" : ""}
                      ${editando ? "" : "disabled"}
                    />

                  </div>
                `,
              )
              .join("")}

          </div>

        </div>
      `;
    })
    .join("");
}

/* =========================
   EDIÇÃO
========================= */

function habilitarEdicao(perguntaId) {
  perguntaEditandoId = perguntaId;

  renderPerguntas();
}

async function salvarEdicaoPergunta(perguntaId) {
  try {
    const pergunta = quizData.perguntas.find((p) => p.id === perguntaId);

    const novoTextoPergunta = document.getElementById(
      `pergunta-${perguntaId}`,
    ).value;

    await request(`/perguntas/${perguntaId}`, {
      method: "PUT",
      body: JSON.stringify({
        texto: novoTextoPergunta,
      }),
    });

    const alternativaCorretaId = Number(
      document.querySelector(`input[name="correta-${perguntaId}"]:checked`)
        ?.value,
    );

    const promises = pergunta.alternativas.map((alternativa) => {
      const novoTextoAlternativa = document.getElementById(
        `alternativa-${alternativa.id}`,
      ).value;

      return request(`/alternativas/${alternativa.id}`, {
        method: "PUT",
        body: JSON.stringify({
          texto: novoTextoAlternativa,
          correta: alternativa.id === alternativaCorretaId,
        }),
      });
    });

    await Promise.all(promises);

    perguntaEditandoId = null;

    await carregarQuiz();

    alert("Pergunta atualizada!");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

/* =========================
   PERGUNTAS
========================= */

async function salvarPergunta() {
  try {
    const texto = document.getElementById("textoPergunta").value.trim();

    if (!texto) {
      alert("Digite a pergunta");
      return;
    }

    const alternativasValidas = alternativasTemp.filter(
      (alt) => alt.texto.trim() !== "",
    );

    if (alternativasValidas.length < 2) {
      alert("Mínimo de 2 alternativas");
      return;
    }

    const possuiCorreta = alternativasValidas.some((alt) => alt.correta);

    if (!possuiCorreta) {
      alert("Selecione uma alternativa correta");
      return;
    }

    await request("/perguntas", {
      method: "POST",
      body: JSON.stringify({
        quiz_id: Number(quizId),
        texto,
        alternativas: alternativasValidas,
      }),
    });

    document.getElementById("textoPergunta").value = "";

    criarAlternativasIniciais();

    carregarQuiz();
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

async function deletarPergunta(perguntaId) {
  const confirmar = confirm("Deseja realmente excluir essa pergunta?");

  if (!confirmar) return;

  try {
    await request(`/perguntas/${perguntaId}`, {
      method: "DELETE",
    });

    carregarQuiz();
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

/* =========================
   ALTERNATIVAS TEMP
========================= */

function criarAlternativasIniciais() {
  alternativasTemp = [
    {
      texto: "",
      correta: true,
    },
    {
      texto: "",
      correta: false,
    },
  ];

  renderAlternativasTemp();
}

function adicionarAlternativa() {
  if (alternativasTemp.length >= 4) {
    alert("Máximo de 4 alternativas");
    return;
  }

  alternativasTemp.push({
    texto: "",
    correta: false,
  });

  renderAlternativasTemp();
}

function removerAlternativa(index) {
  if (alternativasTemp.length <= 2) {
    alert("Mínimo de 2 alternativas");
    return;
  }

  alternativasTemp.splice(index, 1);

  if (!alternativasTemp.some((alt) => alt.correta)) {
    alternativasTemp[0].correta = true;
  }

  renderAlternativasTemp();
}

function definirCorretaTemp(index) {
  alternativasTemp.forEach((alt, i) => {
    alt.correta = i === index;
  });

  renderAlternativasTemp();
}

function renderAlternativasTemp() {
  const container = document.getElementById("alternativasContainer");

  container.innerHTML = alternativasTemp
    .map(
      (alternativa, index) => `
        <div class="alt-item">

          <span class="letra">
            ${String.fromCharCode(65 + index)}
          </span>

          <input
            type="text"
            placeholder="Alternativa ${index + 1}"
            value="${alternativa.texto}"
            oninput="alternativasTemp[${index}].texto = this.value"
          />

          <input
            type="radio"
            name="correta-temp"
            ${alternativa.correta ? "checked" : ""}
            onchange="definirCorretaTemp(${index})"
          />

          <button
            class="btn-delete-alt"
            onclick="removerAlternativa(${index})"
          >
            ✕
          </button>

        </div>
      `,
    )
    .join("");
}
