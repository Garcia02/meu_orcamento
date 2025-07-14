// Função unificada para formatação monetária
function formatarMoeda(valor) {
    const numero = typeof valor === 'string' 
        ? parseFloat(valor.replace(/[R\$\s.]/g, '').replace(",", "."))
        : valor;
    
    if (isNaN(numero)) return "R\$ 0,00";
    
    return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para extrair valor numérico de string monetária
function extrairValorNumerico(valorMonetario) {
    return parseFloat(valorMonetario.replace(/[R\$\s.]/g, '').replace(",", ".")) || 0;
}

// Atualiza o total automaticamente ao somar os valores da tabela
function atualizarTotal() {
    const tabela = document.querySelector("#tabela-servicos tbody");
    const linhas = tabela.querySelectorAll("tr");

    let total = 0;

    linhas.forEach((linha) => {
        const valorCelula = linha.querySelector("td:nth-child(3)");
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

// Função para adicionar um novo serviço
function adicionarServico() {
    const desc = document.getElementById("descricao-servico").value.trim();
    const und = document.getElementById("unidade-servico").value.trim();
    const val = document.getElementById("valor-servico").value.trim();

    if (!desc) {
        alert("Preencha a descrição do serviço!");
        document.getElementById("descricao-servico").focus();
        return;
    }

    // Validação atualizada para formato monetário
    if (val && isNaN(extrairValorNumerico(val))) {
        alert("Valor inválido!");
        document.getElementById("valor-servico").focus();
        return;
    }

    const tabela = document.getElementById("tabela-servicos");
    tabela.style.display = "";

    const tbody = tabela.querySelector("tbody");
    const row = document.createElement("tr");

    // Formatação unificada do valor
    const valorFormatado = val ? formatarMoeda(extrairValorNumerico(val)) : "";

    row.innerHTML = `
        <td>${desc}</td>
        <td>${und}</td>
        <td>${valorFormatado}</td>
        <td><button type="button" class="remove-servico-btn">Remover</button></td>
    `;

    tbody.appendChild(row);

    // Limpa os inputs
    document.getElementById("descricao-servico").value = "";
    document.getElementById("unidade-servico").value = "";
    document.getElementById("valor-servico").value = "";

    // Event listener para remover
    row.querySelector(".remove-servico-btn").addEventListener("click", function () {
        row.remove();
        if (tbody.rows.length === 0) {
            tabela.style.display = "none";
        }
        atualizarTotal();
    });

    atualizarTotal();
}

// Função para coletar dados do formulário
function coletarDadosFormulario() {
    const dados = {
        cidade: document.querySelector('input[name="cidade"]').value,
        unidade: document.querySelector('input[name="unidade"]').value,
        local: document.querySelector('input[name="local"]').value,
        validade: document.querySelector('input[name="validade"]').value,
        observacoes: document.querySelector('textarea[name="observacoes"]').value,
        servicos: [],
        total: document.querySelector("#total-servicos-input").value
    };

    // Coletar serviços da tabela
    const linhas = document.querySelectorAll("#tabela-servicos tbody tr");
    linhas.forEach(linha => {
        const colunas = linha.querySelectorAll("td");
        if (colunas.length >= 3) {
            dados.servicos.push({
                descricao: colunas[0].textContent,
                unidade: colunas[1].textContent,
                valor: colunas[2].textContent
            });
        }
    });

    return dados;
}

// Função para gerar PDF (estrutura básica)
function gerarPDF() {
    const dados = coletarDadosFormulario();
    
    // Validação básica
    if (!dados.cidade || !dados.unidade || !dados.local) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }
    
    if (dados.servicos.length === 0) {
        alert("Adicione pelo menos um serviço!");
        return;
    }
    
    console.log("Dados coletados para PDF:", dados);
    alert("Funcionalidade de PDF será implementada aqui!");
    
    // TODO: Implementar geração real do PDF
    // Sugestão: usar jsPDF ou PDFKit
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Máscara monetária para campo de valor individual
    const campoValor = document.getElementById('valor-servico');
    aplicarMascaraMonetaria(campoValor);
    
    // ✅ NOVA: Máscara monetária para campo de total
    const campoTotal = document.getElementById('total-servicos-input');
    aplicarMascaraMonetaria(campoTotal);
    
    // Listener do formulário
    document.getElementById('orcamento-form').addEventListener('submit', function(e) {
        e.preventDefault();
        gerarPDF();
    });
});

// Função unificada para aplicar máscara monetária
function aplicarMascaraMonetaria(elemento) {
    elemento.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length > 0) {
            valor = (parseInt(valor) / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        }
        
        e.target.value = valor;
        
        // Remove borda de erro se existir
        e.target.style.border = "";
        e.target.title = "";
    });
    
    // ✅ NOVO: Validação ao sair do campo
    elemento.addEventListener('blur', function(e) {
        const valor = extrairValorNumerico(e.target.value);
        if (isNaN(valor) && e.target.value !== "") {
            e.target.style.border = "2px solid #e74c3c";
            e.target.title = "Valor inválido";
        }
    });
}