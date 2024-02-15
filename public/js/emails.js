document.getElementById('voltarButton').addEventListener('click', () => {
  window.location.href = '/';
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/get-emails");
    const emails = await response.json();

    const tbody = document.querySelector("#emailsTable tbody");
    tbody.innerHTML = "";

    if (emails.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td colspan="2" style="text-align: center">Nenhum e-mail encontrado.</td>
      `;
      tbody.appendChild(tr);
    } else {
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
    Swal.fire("Erro!", "Ocorreu um erro ao recuperar os e-mails.", "error");
  }
});
