// ===== FUNÇÃO PARA OBTER A LOGO =====

function obterLogoParaGerarPDF() {
    try {
        const logoUsuario = localStorage.getItem('lara_engenharia_logo');
        if (logoUsuario) {
            return logoUsuario;
        }
        return null;
    } catch (erro) {
        console.error('Erro ao obter logo:', erro);
        return null;
    }
}

// ===== FUNÇÃO PRINCIPAL DE GERAÇÃO DO PDF =====

function gerarPDFCompleto() {
    try {
        // Coleta dados do formulário
        const dados = coletarDadosFormulario();

        if (!dados) {
            alert('Erro ao coletar dados do formulário');
            return false;
        }

        // Cria o HTML do PDF
        const htmlPDF = criarHTMLPDF(dados);

        // Cria um elemento temporário para o html2pdf
        const elemento = document.createElement('div');
        elemento.innerHTML = htmlPDF;
        // REMOVIDO: Estilos para esconder o elemento temporário.
        // Ele será anexado ao body e ficará visível brevemente.
        document.body.appendChild(elemento);

        // Configurações do html2pdf
        const opcoes = {
            margin: 10,
            filename: gerarNomeArquivo(dados),
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { 
                orientation: 'portrait', 
                unit: 'mm', 
                format: 'a4',
                // ===== AJUSTE PARA RODAPÉ REPETITIVO =====
                html2pdf: {
                    onAfter: function(jsPdf) {
                        const totalPages = jsPdf.internal.getNumberOfPages();
                        const pageWidth = jsPdf.internal.pageSize.getWidth();
                        const pageHeight = jsPdf.internal.pageSize.getHeight();
                        const footerTextHeight = 10; // Altura aproximada para o texto do rodapé

                        for (let i = 1; i <= totalPages; i++) {
                            jsPdf.setPage(i);
                            jsPdf.setFont('helvetica'); // Define a fonte
                            jsPdf.setFontSize(8); // Define o tamanho da fonte
                            jsPdf.setTextColor(100); // Cor cinza para o texto

                            // Informações da empresa alinhadas à esquerda
                            jsPdf.text("Lara Engenharia - (15) 99714-0338", 10, pageHeight - footerTextHeight);

                            // Numeração de página alinhada à direita
                            jsPdf.text(`Página ${i} de ${totalPages}`, pageWidth - 10, pageHeight - footerTextHeight, { align: 'right' });
                        }
                    }
                }
            }
        };

        // Gera o PDF
        html2pdf().set(opcoes).from(elemento).save().then(() => {
            // Remove o elemento temporário
            document.body.removeChild(elemento);
            return true;
        }).catch(erro => {
            console.error('Erro ao gerar PDF:', erro);
            if (document.body.contains(elemento)) {
                document.body.removeChild(elemento);
            }
            alert('Erro ao gerar PDF: ' + erro.message);
            return false;
        });

        return true;
    } catch (erro) {
        console.error('Erro ao gerar PDF:', erro);
        alert('Erro ao gerar PDF: ' + erro.message);
        return false;
    }
}

// ===== FUNÇÃO PARA CRIAR O HTML DO PDF =====

function criarHTMLPDF(dados) {
    const logo = obterLogoParaGerarPDF();
    const logoHTML = logo ? `<img src="${logo}" class="pdf-logo" alt="Logo">` : '';

    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataAtual.toLocaleTimeString('pt-BR');

    // Cria as linhas da tabela de serviços
    let linhasServicos = '';

    if (dados.servicos && Array.isArray(dados.servicos) && dados.servicos.length > 0) {
        dados.servicos.forEach((servico, index) => {
            const classeAlternada = index % 2 === 0 ? 'par' : 'impar';

            // Acessa as propriedades corretas do serviço
            const descricao = servico.servico_produto || servico.descricao || '';
            const quantidade = servico.quantidade || '';
            const medida = servico.medida || '';
            const valorUnitario = servico.valor_unitario || servico.valorUnitario || '';
            const valorTotal = servico.valor_somado || servico.valorSomado || '';

            linhasServicos += `
                <tr class="${classeAlternada}">
                    <td class="descricao">${descricao}</td>
                    <td class="quantidade">${quantidade}</td>
                    <td class="medida">${medida}</td>
                    <td class="valor-unitario">${valorUnitario}</td>
                    <td class="valor-total">${valorTotal}</td>
                </tr>
            `;
        });
    } else {
        linhasServicos = '<tr><td colspan="5" style="text-align: center; color: #999;">Nenhum serviço adicionado</td></tr>';
    }

    return `
        <div class="pdf-container">
            <!-- CABEÇALHO -->
            <div class="pdf-cabecalho">
                <div class="pdf-logo-container">
                    ${logoHTML}
                </div>
                <div class="pdf-titulo">
                    <h1>PROPOSTA COMERCIAL</h1>
                    <p class="pdf-subtitulo">Lara Engenharia</p>
                </div>
            </div>
            
            <!-- LINHA SEPARADORA -->
            <div class="pdf-linha-separadora"></div>
            
            <!-- DADOS DO CLIENTE -->
            <div class="pdf-secao">
                <h2 class="pdf-titulo-secao">DADOS DO CLIENTE</h2>
                <div class="pdf-dados-cliente">
                    <div class="pdf-dado">
                        <span class="pdf-label">Cidade:</span>
                        <span class="pdf-valor">${dados.cidade || '-'}</span>
                    </div>
                    <div class="pdf-dado">
                        <span class="pdf-label">Unidade:</span>
                        <span class="pdf-valor">${dados.unidade || '-'}</span>
                    </div>
                    <div class="pdf-dado">
                        <span class="pdf-label">Local:</span>
                        <span class="pdf-valor">${dados.local || '-'}</span>
                    </div>
                </div>
            </div>
            
            <!-- LINHA SEPARADORA -->
            <div class="pdf-linha-separadora"></div>
            
            <!-- SERVIÇOS -->
            <div class="pdf-secao">
                <h2 class="pdf-titulo-secao">SERVIÇOS</h2>
                           <!-- TOTAL -->
                <div class="pdf-total">
                    <span class="pdf-total-label">TOTAL:</span>
                    <span class="pdf-total-valor">${dados.total || 'R$ 0,00'}</span>
                </div>
                <table class="pdf-tabela-servicos">
                    <thead>
                        <tr>
                            <th class="descricao">Serviço/Produto</th>
                            <th class="quantidade">Qtd</th>
                            <th class="medida">Medida</th>
                            <th class="valor-unitario">Valor Unit.</th>
                            <th class="valor-total">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${linhasServicos}
                    </tbody>
                </table>
            </div>
            
            <!-- OBSERVAÇÕES -->
            <div class="pdf-secao">
                <h2 class="pdf-titulo-secao">OBSERVAÇÕES</h2>
                <p class="pdf-observacoes">${dados.observacoes || 'Nenhuma observação'}</p>
                <p class="pdf-validade"><strong>Validade:</strong> ${dados.validade || '-'}</p>
            </div>
            
            <!-- LINHA SEPARADORA -->
            <div class="pdf-linha-separadora"></div>
            
            <!-- RODAPÉ PRINCIPAL (aparecerá no final do conteúdo) -->
            <div class="pdf-rodape">
                <div class="pdf-info-empresa">
                    <p><strong>Lara Engenharia</strong></p>
                    <p>Especializada em drywall e serviços civis</p>
                </div>
                <div class="pdf-contatos">
                    <p>📧 contatolaraengenharia@gmail.com</p>
                    <p>📱 (15) 99714-0338</p>
                </div>
                <div class="pdf-assinatura">
                    <p>${dados.responsavel || '-'}</p>
                    <p class="pdf-data">Gerado em ${dataFormatada} às ${horaFormatada}</p>
                </div>
            </div>
        </div>
    `;
}

// ===== FUNÇÃO PARA GERAR NOME DO ARQUIVO =====

function gerarNomeArquivo(dados) {
    const dataAtual = new Date();
    const data = dataAtual.toISOString().split('T')[0];
    const hora = dataAtual.toTimeString().split(' ')[0].replace(/:/g, '-');
    const cidade = (dados.cidade || 'orcamento').replace(/\s+/g, '_');

    return `Orcamento_${cidade}_${data}_${hora}.pdf`;
}