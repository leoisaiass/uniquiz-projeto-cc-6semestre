const form = document.getElementById("formCriarQuiz");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token");

  const temaId = document.getElementById("tema").value;

  if (!temaId) {
    alert("Selecione um tema");
    return;
  }

  const dados = {
    titulo: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    dificuldade: document.getElementById("dificuldade").value,
    tema_id: temaId,
  };

  try {
    const response = await fetch("http://localhost:3000/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    if (response.ok) {
      window.location.href = `editar-quiz.html?quizId=${resultado.quizId}`;
      console.log("Quiz ID:", resultado.quizId);
    } else {
      alert(resultado.erro);
    }
  } catch (error) {
    console.log(error);
    alert("Erro ao conectar com servidor");
  }
});

async function carregarTemasSelect() {
  try {
    const res = await fetch("http://localhost:3000/temas");

    if (!res.ok) throw new Error("Erro ao buscar temas");

    const temas = await res.json();

    const select = document.getElementById("tema");

    if (!select) return;

    select.disabled = true;

    select.innerHTML = `<option value="">Carregando...</option>`;

    select.innerHTML = `<option value="">Selecione um tema</option>`;

    temas.forEach((tema) => {
      const option = document.createElement("option");
      option.value = tema.id;
      option.textContent = tema.nome;
      select.appendChild(option);
    });

    select.disabled = false;
  } catch (error) {
    console.error("Erro ao carregar temas:", error);

    const select = document.getElementById("tema");

    if (select) {
      select.innerHTML = `<option value="">Erro ao carregar temas</option>`;
    }
  }
}

carregarTemasSelect();
