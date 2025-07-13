function adicionarServico() {
    const desc = document.getElementById('descricao-servico').value.trim();
    const und = document.getElementById('unidade-servico').value.trim();
    const val = document.getElementById('valor-servico').value.trim();

    // Só a descrição é obrigatória
    if (!desc) {
        alert('Preencha a descrição do serviço!');
        return;
    }

    const tabela = document.getElementById('tabela-servicos');
    tabela.style.display = '';

    const tbody = tabela.querySelector('tbody');
    const row = document.createElement('tr');

    // Formatação do valor apenas se preenchido
    let valorFormatado = '';
    if (val !== '') {
        const num = Number(val.replace(',', '.')); // Suporte a vírgula ou ponto
        valorFormatado = isNaN(num) ? '' : `R\$ ${num.toFixed(2).replace('.', ',')}`;
    }

    // Cria a linha da tabela (evita duplicação)
    row.innerHTML = `
        <td>${desc}</td>
        <td>${und}</td>
        <td>${valorFormatado}</td>
        <td><button type="button" class="remove-servico-btn">Remover</button></td>
    `;

    // Adiciona a linha
    tbody.appendChild(row);

    // Limpa os inputs
    document.getElementById('descricao-servico').value = '';
    document.getElementById('unidade-servico').value = '';
    document.getElementById('valor-servico').value = '';

    // Função de remover linha
    row.querySelector('.remove-servico-btn').addEventListener('click', function() {
        row.remove();
        // Esconde a tabela se vazio
        if (tbody.rows.length === 0) {
            tabela.style.display = 'none';
        }
    });
}