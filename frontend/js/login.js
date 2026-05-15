const form = document.getElementById("formLogin");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const dados = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    try {

        const response = await fetch(
            "http://localhost:3000/usuarios/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            }
        );

        const resultado = await response.json();

        if (response.ok) {

            alert(resultado.mensagem);

            // redirecionar
            window.location.href = "quizes.html";

        } else {

            alert(resultado.erro);

        }

    } catch (error) {

        console.log(error);

        alert("Erro ao conectar com servidor");

    }

});