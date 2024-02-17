// Adiciona um evento de clique ao botão "Ver e-mails" que redireciona para a página de e-mails
document.getElementById("viewEmailsButton").addEventListener("click", () => {
  window.location.href = "/emails.html";
});

// Adiciona um evento de envio ao formulário de e-mail
document.getElementById("emailForm").addEventListener("submit", async (e) => {
  // Previne o comportamento padrão do formulário, que é enviar a requisição HTTP
  e.preventDefault();

  // Cria um objeto FormData a partir do formulário
  const formData = new FormData(e.target);
  // Obtém o valor do campo de e-mail do formulário
  const email = formData.get("email");

  // Verifica se o campo de e-mail está vazio
  if (!email) {
    // Se estiver vazio, exibe uma mensagem de erro usando a biblioteca SweetAlert2
    Swal.fire("Erro!", "Por favor, preencha o campo de e-mail.", "error");
    // Retorna para sair da função e não continuar com o envio do formulário
    return;
  }

  try {
    // Envia uma requisição POST para a rota /send-email do servidor
    const response = await fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Envia o e-mail como um objeto JSON no corpo da requisição
      body: JSON.stringify({ email }),
    });

    // Verifica se a resposta da requisição foi bem-sucedida (status 200)
    if (response.ok) {
      // Se for bem-sucedida, limpa o formulário
      e.target.reset();
      // Exibe uma mensagem de sucesso usando a biblioteca SweetAlert2
      Swal.fire("Sucesso!", "Email enviado com sucesso!", "success");
    } else {
      // Se não for bem-sucedida, exibe uma mensagem de erro
      Swal.fire("Erro!", "Ocorreu um erro ao enviar o email.", "error");
    }
  } catch (error) {
    // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro
    Swal.fire("Erro!", "Ocorreu um erro ao enviar o email.", "error");
  }
});