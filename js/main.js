// ===== FUNÇÕES UTILITÁRIAS =====

// Função para formatar valores em moeda brasileira
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Função para extrair valor numérico de uma string formatada
function extrairValorNumerico(valor) {
    if (typeof valor !== 'string') return 0;
    return parseFloat(valor.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
}

// Função para aplicar máscara monetária em tempo real
function aplicarMascaraMonetaria(input) {
    input.addEventListener('input', function() {
        let valor = this.value.replace(/\D/g, '');
        valor = (parseInt(valor) / 100).toFixed(2);
        this.value = formatarMoeda(parseFloat(valor));
    });
}

// Função debounce para otimizar eventos frequentes
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Função para mostrar/ocultar indicador de carregamento
function mostrarLoading(mostrar) {
    const loading = document.querySelector('.loading-indicator');
    if (loading) {
        if (mostrar) {
            loading.classList.add('active');
        } else {
            loading.classList.remove('active');
        }
    }
}

// ===== FUNÇÕES DE GERENCIAMENTO DE SERVIÇOS =====

// Função para adicionar um novo serviço
function adicionarServico() {
    const desc = document.getElementById("servico-produto").value.trim();
    const qtd = document.getElementById("quantidade").value.trim();
    const med = document.getElementById("medida").value.trim();
    const val = document.getElementById("valor-unitario").value.trim();

    // Extrai valor numérico, converte quantidade e multiplica
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

    // Validação para formato monetário
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

// ===== FUNÇÕES DE GERAÇÃO DE PDF =====

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

// ===== FUNÇÕES DE GERENCIAMENTO DE LOGO =====

// Referências aos elementos do DOM para o logo
const logoUploadInput = document.getElementById('logo-upload');
const logoPreviewImg = document.getElementById('logo-preview');
const logoPlaceholder = document.querySelector('.logo-placeholder');

// Carrega a logo salva no localStorage e exibe na UI
function carregarLogoSalva() {
    const savedLogo = localStorage.getItem('lara_engenharia_logo');
    if (savedLogo && logoPreviewImg) {
        logoPreviewImg.src = savedLogo;
        logoPreviewImg.classList.add('active');
        
        // Ocultar o placeholder
        if (logoPlaceholder) {
            logoPlaceholder.classList.add('hidden');
        }
    }
}

// Salva a logo no localStorage e atualiza a UI
function salvarLogo(logoData) {
    try {
        localStorage.setItem('lara_engenharia_logo', logoData);
        carregarLogoSalva(); // Atualiza a exibição da logo
        salvarRascunho(); // Salva o estado do formulário
    } catch (erro) {
        console.error('Erro ao salvar logo:', erro);
        alert('Erro ao salvar a logo. Tente uma imagem menor.');
    }
}

// Remove a logo do localStorage e da UI
function removerLogo() {
    try {
        localStorage.removeItem('lara_engenharia_logo');
        
        if (logoUploadInput) {
            logoUploadInput.value = ''; // Limpa o input de arquivo
        }
        
        carregarLogoSalva(); // Atualiza a exibição da logo
        salvarRascunho(); // Salva o estado do formulário
    } catch (erro) {
        console.error('Erro ao remover logo:', erro);
    }
}

// Inicializa os event listeners para o upload da logo
function inicializarLogoUpload() {
    const logoBox = document.querySelector('.logo-box');
    
    // Clique no quadrado abre o seletor de arquivo
    if (logoBox) {
        logoBox.addEventListener('click', function() {
            if (logoUploadInput) {
                logoUploadInput.click();
            }
        });
    }
    
    // Quando o usuário seleciona um arquivo
    if (logoUploadInput) {
        logoUploadInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const MAX_SIZE_MB = 5; // 5 MB
            const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

            if (file) {
                // Validar se é uma imagem
                if (!file.type.startsWith('image/')) {
                    alert('Por favor, selecione uma imagem válida');
                    logoUploadInput.value = '';
                    return;
                }

                // Validar tamanho
                if (file.size > MAX_SIZE_BYTES) {
                    alert(`O arquivo é muito grande! O tamanho máximo permitido é ${MAX_SIZE_MB}MB.`);
                    logoUploadInput.value = '';
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    salvarLogo(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Função para obter a logo para o PDF
function obterLogoParaPDF() {
    try {
        return localStorage.getItem('lara_engenharia_logo');
    } catch (erro) {
        console.error('Erro ao obter logo para PDF:', erro);
        return null;
    }
}

// ===== INICIALIZAÇÃO DA PÁGINA (DOMContentLoaded) =====

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function () {
    // Máscara monetária para campo de valor individual
    const campoValor = document.getElementById('valor-unitario');
    if (campoValor) {
        aplicarMascaraMonetaria(campoValor);
    }

    // Máscara monetária para campo de total
    const campoTotal = document.getElementById('total-servicos-input');
    if (campoTotal) {
        aplicarMascaraMonetaria(campoTotal);
    }

    // --- Inicialização do Logo Upload ---
    carregarLogoSalva();
    inicializarLogoUpload();

    // Carregar rascunho ao iniciar
    carregarRascunho();

    // Salvar automaticamente quando campos mudam
    const campos = document.querySelectorAll('input, textarea');
    campos.forEach(campo => {
        campo.addEventListener('input', debounce(salvarRascunho, 1000));
    });

    // Listener do formulário
    const orcamentoForm = document.getElementById('orcamento-form');
    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            gerarPDF();
        });
    }
});