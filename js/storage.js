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
        cidade: document.querySelector('input[name="cidade"]').value,
        unidade: document.querySelector('input[name="unidade"]').value,
        local: document.querySelector('input[name="local"]').value,
        validade: document.querySelector('input[name="validade"]').value,
        observacoes: document.querySelector('textarea[name="observacoes"]').value,
        servicos: [],
        total: document.querySelector("#total-servicos-input").value,
        responsavel: document.querySelector('input[name="responsavel"]').value
    };

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

// Restaurar dados no formulário
function restaurarDadosFormulario(dados) {
    // Campos básicos
    document.querySelector('input[name="cidade"]').value = dados.cidade || '';
    document.querySelector('input[name="unidade"]').value = dados.unidade || '';
    document.querySelector('input[name="local"]').value = dados.local || '';
    document.querySelector('input[name="validade"]').value = dados.validade || '';
    document.querySelector('textarea[name="observacoes"]').value = dados.observacoes || '';
    document.querySelector('input[name="responsavel"]').value = dados.responsavel || '';
    document.querySelector("#total-servicos-input").value = dados.total || 'R\$ 0,00';

    // Restaurar serviços
    if (dados.servicos && dados.servicos.length > 0) {
        const tabela = document.getElementById("tabela-servicos");
        const tbody = tabela.querySelector("tbody");

        tbody.innerHTML = '';

        dados.servicos.forEach(servico => {
            adicionarServicoNaTabela(servico.descricao, servico.unidade, servico.valor);
        });

        tabela.style.display = "";
    }
}

// Função para adicionar serviço na tabela (usada na restauração)
function adicionarServicoNaTabela(descricao, unidade, valor) {
    const tabela = document.getElementById("tabela-servicos");
    const tbody = tabela.querySelector("tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${descricao}</td>
        <td>${unidade}</td>
        <td>${valor}</td>
        <td><button type="button" class="remove-servico-btn">Remover</button></td>
    `;

    tbody.appendChild(row);

    // Event listener para remover
    row.querySelector(".remove-servico-btn").addEventListener("click", function () {
        row.remove();
        if (tbody.rows.length === 0) {
            tabela.style.display = "none";
        }
        atualizarTotal();
        salvarRascunho(); // Salva após remoção
    });
}