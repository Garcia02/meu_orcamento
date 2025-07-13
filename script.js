// Atualiza o total automaticamente ao somar os valores da tabela
function atualizarTotal() {
    const tabela = document.querySelector("#tabela-servicos tbody");
    const linhas = tabela.querySelectorAll("tr");

    let total = 0;

    // Itera por cada linha da tabela e soma os valores da coluna "Valor (R\$)"
    linhas.forEach((linha) => {
        const valorCelula = linha.querySelector("td:nth-child(3)");
        if (valorCelula) {
            const valor = parseFloat(
                valorCelula.textContent.replace("R\$", "").replace(",", ".").trim()
            );
            total += isNaN(valor) ? 0 : valor; // Ignora valores inválidos
        }
    });

    // Atualiza o campo de total (mantém formato de moeda)
    const totalInput = document.querySelector("#total-servicos-input");
    totalInput.value = `R\$ ${total.toFixed(2).replace(".", ",")}`;
}

// Permite que o usuário atualize o total manualmente através do input
function manualTotalInput() {
    const totalInput = document.querySelector("#total-servicos-input");
    let total = totalInput.value.replace("R\$", "").replace(",", ".").trim();

    // Valida se o valor manual é um número válido
    if (isNaN(parseFloat(total))) {
        totalInput.style.border = "1px solid red"; // Destaca erro no formato
    } else {
        totalInput.style.border = ""; // Remove o destaque de erro
    }
}

// Função para adicionar um novo serviço
function adicionarServico() {
    const desc = document.getElementById("descricao-servico").value.trim();
    const und = document.getElementById("unidade-servico").value.trim();
    const val = document.getElementById("valor-servico").value.trim();

    // Só a descrição é obrigatória
    if (!desc) {
        alert("Preencha a descrição do serviço!");
        return;
    }

    const tabela = document.getElementById("tabela-servicos");
    tabela.style.display = ""; // Garante que a tabela esteja visível

    const tbody = tabela.querySelector("tbody");
    const row = document.createElement("tr");

    // Formatação do valor apenas se preenchido
    let valorFormatado = "";
    if (val !== "") {
        const num = Number(val.replace(",", ".")); // Suporte a vírgula ou ponto
        valorFormatado = isNaN(num) ? "" : `R\$ ${num.toFixed(2).replace(".", ",")}`;
    }

    // Cria a linha da tabela
    row.innerHTML = `
        <td>${desc}</td>
        <td>${und}</td>
        <td>${valorFormatado}</td>
        <td><button type="button" class="remove-servico-btn">Remover</button></td>
    `;

    // Adiciona a linha
    tbody.appendChild(row);

    // Limpa os inputs
    document.getElementById("descricao-servico").value = "";
    document.getElementById("unidade-servico").value = "";
    document.getElementById("valor-servico").value = "";

    // Função de remover linha
    row.querySelector(".remove-servico-btn").addEventListener("click", function () {
        row.remove();
        // Esconde a tabela se vazio
        if (tbody.rows.length === 0) {
            tabela.style.display = "none";
        }

        atualizarTotal(); // Recalcula o total após remoção
    });

    atualizarTotal(); // Recalcula o total após adição
}