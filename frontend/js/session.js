function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

function mostrarUsuarioLogado() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) return;

  const elemento = document.getElementById("usuarioLogado");

  if (elemento) {
    elemento.innerHTML = `
      <a href="meu-perfil.html" class="usuario-box">

        <div class="usuario-avatar">
          ${usuario.username.charAt(0).toUpperCase()}
        </div>

        <div class="usuario-info">
          <span class="usuario-label">Logado como</span>
          <span class="usuario-nome">${usuario.username}</span>
        </div>

      </a>
    `;
  }
}

mostrarUsuarioLogado();
