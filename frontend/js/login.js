const token = localStorage.getItem("token");

if (token) {
  window.location.href = "quizzes.html";
}

const form = document.getElementById("formLogin");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = {
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
    };

    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await response.json();

      if (response.ok) {
        alert(resultado.mensagem);

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
}
