// Função para adicionar um novo serviço
function adicionarServico() {
    const desc = document.getElementById("servico-produto").value.trim();
    const qtd = document.getElementById("quantidade").value.trim();
    const med = document.getElementById("medida").value.trim();
    const val = document.getElementById("valor-unitario").value.trim();

    // CORRIGIDO: Extrai valor numérico, converte quantidade e multiplica
    const valorNumerico = extrairValorNumerico(val);
    const quantidadeNumerica = parseFloat(qtd);
    const sum = valorNumerico * quantidadeNumerica;

    if (!desc) {
        alert("Preencha a descrição do serviço!");
        document.getElementById("servico-produto").focus();
        return;
    }

    if (!qtd || isNaN(quantidadeNumerica)) {
        alert("Quantidade inválida!");
        document.getElementById("quantidade").focus();
        return;
    }

    // Validação atualizada para formato monetário
    if (val && isNaN(valorNumerico)) {
        alert("Valor inválido!");
        document.getElementById("valor-unitario").focus();
        return;
    }

    const tabela = document.getElementById("tabela-servicos");
    tabela.style.display = "";

    const tbody = tabela.querySelector("tbody");
    const row = document.createElement("tr");

    // Formatação unificada do valor
    const valorFormatado = val ? formatarMoeda(valorNumerico) : "";
    const somaFormatada = formatarMoeda(sum);

    row.innerHTML = `
        <td>${desc}</td>
        <td>${quantidadeNumerica}</td>
        <td>${med}</td>
        <td>${valorFormatado}</td>
        <td>${somaFormatada}</td>
        <td><button type="button" class="remove-servico-btn">Remover</button></td>
    `;

    tbody.appendChild(row);

    // Limpa os inputs
    document.getElementById("servico-produto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("medida").value = "";
    document.getElementById("valor-unitario").value = "";

    // Event listener para remover
    row.querySelector(".remove-servico-btn").addEventListener("click", function () {
        row.remove();
        if (tbody.rows.length === 0) {
            tabela.style.display = "none";
        }
        atualizarTotal();
        salvarRascunho();
    });

    atualizarTotal();
    salvarRascunho();
}

// Atualiza o total automaticamente ao somar os valores da tabela
function atualizarTotal() {
    const tabela = document.querySelector("#tabela-servicos tbody");
    const linhas = tabela.querySelectorAll("tr");

    let total = 0;

    linhas.forEach((linha) => {
        const valorCelula = linha.querySelector("td:nth-child(5)");
        if (valorCelula) {
            total += extrairValorNumerico(valorCelula.textContent);
        }
    });

    // Atualiza o campo de total usando formatação unificada
    const totalInput = document.querySelector("#total-servicos-input");
    totalInput.value = formatarMoeda(total);
}

// Permite que o usuário atualize o total manualmente
function manualTotalInput() {
    const totalInput = document.querySelector("#total-servicos-input");
    const valorNumerico = extrairValorNumerico(totalInput.value);

    if (isNaN(valorNumerico) && totalInput.value !== "") {
        totalInput.style.border = "2px solid #e74c3c";
        totalInput.title = "Formato inválido - Use apenas números";
        return false;
    } else {
        totalInput.style.border = "";
        totalInput.title = "";
        return true;
    }
}

// Função para gerar PDF
function gerarPDF() {
    mostrarLoading(true);
    
    // Pequeno delay para mostrar loading
    setTimeout(() => {
        const sucesso = gerarPDFCompleto();
        mostrarLoading(false);
        
        if (sucesso) {
            alert('PDF gerado com sucesso!');
        }
    }, 100);
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function () {
    // Máscara monetária para campo de valor individual
    const campoValor = document.getElementById('valor-unitario');
    aplicarMascaraMonetaria(campoValor);

    // Máscara monetária para campo de total
    const campoTotal = document.getElementById('total-servicos-input');
    aplicarMascaraMonetaria(campoTotal);

    // Carregar rascunho ao iniciar
    carregarRascunho();

    // Salvar automaticamente quando campos mudam
    const campos = document.querySelectorAll('input, textarea');
    campos.forEach(campo => {
        campo.addEventListener('input', debounce(salvarRascunho, 1000));
    });

    // Listener do formulário
    document.getElementById('orcamento-form').addEventListener('submit', function (e) {
        e.preventDefault();
        gerarPDF();
    });
});