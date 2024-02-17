// Adiciona um evento de clique ao botão "Voltar" que redireciona para a página inicial
document.getElementById('voltarButton').addEventListener('click', () => {
  window.location.href = '/';
});

// Adiciona um evento que é disparado quando o DOM está completamente carregado
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Envia uma requisição GET para a rota /get-emails do servidor
    const response = await fetch("/get-emails");
    // Converte a resposta para um objeto JSON
    const emails = await response.json();

    // Obtém a tabela de e-mails do DOM
    const tbody = document.querySelector("#emailsTable tbody");
    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = "";

    // Verifica se não há e-mails
    if (emails.length === 0) {
      // Se não houver e-mails, exibe uma mensagem na tabela
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td colspan="2" style="text-align: center">Nenhum e-mail encontrado.</td>
      `;
      tbody.appendChild(tr);
    } else {
      // Se houver e-mails, itera sobre cada e-mail e adiciona uma linha na tabela
      emails.forEach((email) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${email.id}</td>
          <td>${email.email}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  } catch (error) {
    // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro
    Swal.fire("Erro!", "Ocorreu um erro ao recuperar os e-mails.", "error");
  }
});