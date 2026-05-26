const params = new URLSearchParams(window.location.search);
const quizId = params.get("quizId");

/* ========================================= */
/* ESTADO GLOBAL */
/* ========================================= */

let quiz = null;
let perguntaAtual = 0;
let pontuacao = 0;
let respostaSelecionada = null;
let tempoRestante = 15;
let intervaloTimer = null;
let tempoInicio = Date.now();

/* ========================================= */
/* ELEMENTOS */
/* ========================================= */

const tituloQuiz = document.getElementById("tituloQuiz");
const numeroPergunta = document.getElementById("numeroPergunta");
const textoPergunta = document.getElementById("textoPergunta");
const alternativasContainer = document.getElementById("alternativasContainer");
const pontuacaoElemento = document.getElementById("pontuacao");
const contadorElemento = document.getElementById("contador");
const btnProxima = document.getElementById("btnProxima");

/* ========================================= */
/* REQUEST HELPER */
/* ========================================= */

async function request(url, options = {}) {
  const response = await fetch(`http://localhost:3000${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro na requisição");
  }

  return data;
}

/* ========================================= */
/* CARREGAR QUIZ */
/* ========================================= */

async function carregarQuiz() {
  try {
    quiz = await request(`/quizzes/${quizId}`);

    tituloQuiz.innerText = quiz.titulo;

    atualizarPontuacao();
    mostrarPergunta();
  } catch (error) {
    console.log(error);

    document.querySelector(".card-pergunta-principal").innerHTML = `
      <div class="resultado-quiz">

        <div class="resultado-badge">
          Erro
        </div>

        <h2>
          Não foi possível carregar o quiz
        </h2>

        <p>
          Tente novamente mais tarde.
        </p>

      </div>
    `;
  }
}

/* ========================================= */
/* MOSTRAR PERGUNTA */
/* ========================================= */

function mostrarPergunta() {
  const pergunta = quiz.perguntas[perguntaAtual];

  if (!pergunta) return;

  respostaSelecionada = null;

  btnProxima.disabled = true;

  numeroPergunta.innerText = `Pergunta ${perguntaAtual + 1}`;
  textoPergunta.innerText = pergunta.texto;

  alternativasContainer.innerHTML = "";

  pergunta.alternativas.forEach((alternativa, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("campo-alternativa-quiz");

    button.innerHTML = `
      <span class="alternativa-letra">
        ${String.fromCharCode(65 + index)}
      </span>

      <span class="alternativa-texto">
        ${alternativa.texto}
      </span>
    `;

    button.addEventListener("click", () => {
      selecionarAlternativa(button, alternativa);
    });

    alternativasContainer.appendChild(button);
  });

  atualizarTextoBotao();
  iniciarTimer();
}

/* ========================================= */
/* SELECIONAR ALTERNATIVA */
/* ========================================= */

function selecionarAlternativa(elemento, alternativa) {
  document.querySelectorAll(".campo-alternativa-quiz").forEach((el) => {
    el.classList.remove("selecionada");
  });

  elemento.classList.add("selecionada");

  respostaSelecionada = alternativa;

  btnProxima.disabled = false;
}

/* ========================================= */
/* BOTÃO */
/* ========================================= */

function atualizarTextoBotao() {
  const ultimaPergunta = perguntaAtual === quiz.perguntas.length - 1;

  btnProxima.innerText = ultimaPergunta ? "Finalizar Quiz" : "Próxima";
}

/* ========================================= */
/* PONTUAÇÃO */
/* ========================================= */

function atualizarPontuacao() {
  pontuacaoElemento.innerText = pontuacao;
}

/* ========================================= */
/* TIMER */
/* ========================================= */

function iniciarTimer() {
  clearInterval(intervaloTimer);

  tempoRestante = 15;

  atualizarTimer();

  intervaloTimer = setInterval(() => {
    tempoRestante--;

    atualizarTimer();

    if (tempoRestante <= 0) {
      clearInterval(intervaloTimer);

      avancarPergunta();
    }
  }, 1000);
}

function atualizarTimer() {
  contadorElemento.innerText = `${tempoRestante}s`;
}

/* ========================================= */
/* SALVAR TENTATIVA */
/* ========================================= */

async function salvarTentativa() {
  try {
    const tempoSegundos = Math.floor((Date.now() - tempoInicio) / 1000);

    await request("/tentativas", {
      method: "POST",

      body: JSON.stringify({
        quiz_id: Number(quizId),
        pontuacao,
        total_questoes: quiz.perguntas.length,
        tempo_segundos: tempoSegundos,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

/* ========================================= */
/* RANKING */
/* ========================================= */

async function buscarRanking() {
  try {
    return await request(`/tentativas/ranking/${quizId}`);
  } catch (error) {
    console.log(error);

    return [];
  }
}

/* ========================================= */
/* AVANÇAR */
/* ========================================= */

async function avancarPergunta() {
  clearInterval(intervaloTimer);

  if (respostaSelecionada && respostaSelecionada.correta) {
    pontuacao++;
  }

  atualizarPontuacao();

  perguntaAtual++;

  if (perguntaAtual < quiz.perguntas.length) {
    mostrarPergunta();
  } else {
    await salvarTentativa();

    const ranking = await buscarRanking();

    mostrarResultado(ranking);
  }
}

/* ========================================= */
/* EVENTO BOTÃO */
/* ========================================= */

btnProxima.addEventListener("click", async () => {
  await avancarPergunta();
});

/* ========================================= */
/* RESULTADO */
/* ========================================= */

function mostrarResultado(ranking = []) {
  const totalPerguntas = quiz.perguntas.length;

  const porcentagem = Math.round((pontuacao / totalPerguntas) * 100);

  let mensagem = "";

  if (porcentagem === 100) {
    mensagem = "Perfeito! Você acertou tudo 🎉";
  } else if (porcentagem >= 70) {
    mensagem = "Mandou muito bem 🚀";
  } else if (porcentagem >= 50) {
    mensagem = "Bom resultado 👏";
  } else {
    mensagem = "Continue praticando 📚";
  }

  const rankingHTML = ranking
    .slice(0, 5)
    .map((item, index) => {
      return `
        <div class="ranking-item">

          <span>
            #${index + 1}
          </span>

          <strong>
            ${item.usuarios.username}
          </strong>

          <span>
            ${item.pontuacao}/${item.total_questoes}
          </span>

          <span>
            ${item.tempo_segundos}s
          </span>

        </div>
      `;
    })
    .join("");

  document.querySelector(".card-pergunta-principal").innerHTML = `
    <div class="resultado-quiz">

      <div class="resultado-badge">
        Quiz Finalizado
      </div>

      <h2>
        ${mensagem}
      </h2>

      <div class="resultado-pontuacao">

        <strong>
          ${pontuacao}
        </strong>

        <span>
          / ${totalPerguntas}
        </span>

      </div>

      <p>
        Você acertou ${porcentagem}% das perguntas.
      </p>

      <div class="ranking-box">

        <h3>
          Ranking
        </h3>

        ${rankingHTML || "<p>Nenhuma tentativa ainda.</p>"}

      </div>

      <div class="resultado-acoes">

        <button
          class="btn-voltar-pergunta"
          onclick="window.location.href='temas.html?temaId=${quiz.tema_id}'"
        >
          Voltar ao Tema
        </button>

        <button
          class="btn-finalizar-quiz"
          onclick="window.location.reload()"
        >
          Jogar Novamente
        </button>

      </div>

    </div>
  `;
}

/* ========================================= */
/* INICIAR */
/* ========================================= */

carregarQuiz();
