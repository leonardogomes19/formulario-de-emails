document.getElementById("viewEmailsButton").addEventListener("click", () => {
  window.location.href = "/emails.html";
});

document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");

  // Verifica se o campo de e-mail está vazio
  if (!email) {
    Swal.fire("Erro!", "Por favor, preencha o campo de e-mail.", "error");
    return;
  }

  try {
    const response = await fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      // Limpa o campo de e-mail
      e.target.reset();
      
      Swal.fire("Sucesso!", "Email enviado com sucesso!", "success");
    } else {
      Swal.fire("Erro!", "Ocorreu um erro ao enviar o email.", "error");
    }
  } catch (error) {
    Swal.fire("Erro!", "Ocorreu um erro ao enviar o email.", "error");
  }
});
