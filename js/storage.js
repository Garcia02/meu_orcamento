// ===== GERENCIAMENTO DE RASCUNHOS =====

const STORAGE_KEY = 'lara_engenharia_orcamento';

// Salvar rascunho no localStorage
function salvarRascunho() {
    try {
        const dados = coletarDadosFormulario();
        dados.ultimaSalvamento = new Date().toISOString();

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));

        return true;
    } catch (error) {
        console.error('Erro ao salvar rascunho:', error);
        return false;
    }
}

// Carregar rascunho do localStorage
function carregarRascunho() {
    try {
        const dadosSalvos = localStorage.getItem(STORAGE_KEY);

        if (!dadosSalvos) {
            console.log('Nenhum rascunho encontrado');
            return false;
        }

        const dados = JSON.parse(dadosSalvos);
        restaurarDadosFormulario(dados);

        return true;
    } catch (error) {
        console.error('Erro ao carregar rascunho:', error);
        return false;
    }
}

// Limpar rascunho
function limparRascunho() {
    localStorage.removeItem(STORAGE_KEY);
}

// Coletar dados do formulário
function coletarDadosFormulario() {
    const dados = {
        cidade: document.querySelector('input[name="cidade"]')?.value || '',
        unidade: document.querySelector('input[name="unidade"]')?.value || '',
        local: document.querySelector('input[name="local"]')?.value || '',
        validade: document.querySelector('input[name="validade"]')?.value || '',
        observacoes: document.querySelector('textarea[name="observacoes"]')?.value || '',
        servicos: [],
        total: document.querySelector("#total-servicos-input")?.value || 'R$ 0,00',
        responsavel: document.querySelector('input[name="responsavel"]')?.value || ''
    };

    const linhas = document.querySelectorAll("#tabela-servicos tbody tr");
    linhas.forEach(linha => {
        const colunas = linha.querySelectorAll("td");
        if (colunas.length >= 5) {
            dados.servicos.push({
                servico_produto: colunas[0].textContent.trim(),
                quantidade: colunas[1].textContent.trim(),
                medida: colunas[2].textContent.trim(),
                valor_unitario: colunas[3].textContent.trim(),
                valor_somado: colunas[4].textContent.trim()
            });
        }
    });

    return dados;
}

// Restaurar dados no formulário
function restaurarDadosFormulario(dados) {
    if (!dados) return false;

    // Campos básicos
    const camposBasicos = {
        'input[name="cidade"]': dados.cidade,
        'input[name="unidade"]': dados.unidade,
        'input[name="local"]': dados.local,
        'input[name="validade"]': dados.validade,
        'textarea[name="observacoes"]': dados.observacoes,
        'input[name="responsavel"]': dados.responsavel
    };

    Object.entries(camposBasicos).forEach(([seletor, valor]) => {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            elemento.value = valor || '';
        }
    });

    const totalInput = document.querySelector("#total-servicos-input");
    if (totalInput) {
        totalInput.value = dados.total || 'R$ 0,00';
    }

    // Restaurar serviços
    if (dados.servicos && Array.isArray(dados.servicos) && dados.servicos.length > 0) {
        const tabela = document.getElementById("tabela-servicos");
        if (!tabela) return false;

        const tbody = tabela.querySelector("tbody");
        if (!tbody) return false;

        tbody.innerHTML = '';

        dados.servicos.forEach(servico => {
            adicionarServicoNaTabela(
                servico.servico_produto,
                servico.quantidade,
                servico.medida,
                servico.valor_unitario,
                servico.valor_somado
            );
        });

        tabela.style.display = "";
        return true;
    }

    return false;
}

// Função para adicionar serviço na tabela (usada na restauração)
function adicionarServicoNaTabela(servico_produto, quantidade, medida, valor_unitario, valor_somado) {
    const tabela = document.getElementById("tabela-servicos");
    if (!tabela) return false;

    const tbody = tabela.querySelector("tbody");
    if (!tbody) return false;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${servico_produto}</td>
        <td>${quantidade}</td>
        <td>${medida}</td>
        <td>${valor_unitario}</td>
        <td>${valor_somado}</td>
        <td><button type="button" class="remove-servico-btn">Remover</button></td>
    `;

    tbody.appendChild(row);

    // Event listener para remover
    const removeBtn = row.querySelector(".remove-servico-btn");
    if (removeBtn) {
        removeBtn.addEventListener("click", function () {
            row.remove();
            if (tbody.rows.length === 0) {
                tabela.style.display = "none";
            }
            atualizarTotal();
            salvarRascunho();
        });
    }

    return true;
}