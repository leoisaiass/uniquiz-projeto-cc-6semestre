function protegerPagina() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
  }
}

// nem todas as páginas públicas precisam disso
function bloquearPaginaPublica() {
  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "quizzes.html";
  }
}
