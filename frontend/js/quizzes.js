async function carregarTemas() {
  const grid = document.getElementById("gridTemas");

  if (!grid) return;

  // estado de loading
  grid.innerHTML = `
    <div class="loading-temas">
      Carregando temas...
    </div>
  `;

  try {
    const res = await fetch("http://localhost:3000/temas");

    if (!res.ok) throw new Error("Erro na API");

    const temas = await res.json();

    grid.innerHTML = temas
      .map(
        (tema) => `
        <a href="temas.html?temaId=${tema.id}" class="link-quiz">
          <div class="quiz-item cat-azul">
            <span>${tema.nome}</span>
          </div>
        </a>
      `,
      )
      .join("");
  } catch (error) {
    console.log("Erro ao carregar temas", error);

    grid.innerHTML = `
      <p class="error-temas">
        Não foi possível carregar os temas.
      </p>
    `;
  }
}

carregarTemas();
