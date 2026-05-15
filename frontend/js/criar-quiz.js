const form = document.getElementById("formCriarQuiz");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dados = {
    titulo: document.getElementById("titulo").value,

    descricao: document.getElementById("descricao").value,

    dificuldade: document.getElementById("dificuldade").value,

    tema_id: document.getElementById("tema").value,

    // temporário
    usuario_id: 1,
  };

  try {
    const response = await fetch("http://localhost:3000/quizzes", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    if (response.ok) {
      alert(resultado.mensagem);

      // redirecionar depois
      console.log("Quiz ID:", resultado.quizId);
    } else {
      alert(resultado.erro);
    }
  } catch (error) {
    console.log(error);

    alert("Erro ao conectar com servidor");
  }
});
