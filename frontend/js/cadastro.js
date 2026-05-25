const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dados = {
    username: document.getElementById("username").value,
    nomeCompleto: document.getElementById("nomeCompleto").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
    confirmarSenha: document.getElementById("confirmarSenha").value,
  };

  try {
    const response = await fetch("http://localhost:3000/usuarios/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    alert(resultado.mensagem || resultado.erro);

    if (response.ok) {
      localStorage.setItem("token", resultado.token);

      localStorage.setItem("usuario", JSON.stringify(resultado.usuario));

      window.location.href = "quizzes.html";
    } else {
      alert(resultado.erro);
    }
  } catch (error) {
    console.log(error);

    alert("Erro ao conectar com servidor");
  }
});
