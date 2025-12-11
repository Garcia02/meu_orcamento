// ===== GERAÇÃO DE PDF MELHORADA =====

// Logo da empresa em Base64
const LOGO_BASE64 = 'data:image/jpeg;base64,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';

// ✅ CONFIGURAÇÕES SEPARADAS PARA CABEÇALHO E RODAPÉ
const LOGO_CONFIG = {
    width: 50,
    height: 50,
    position: 'top-right',
    quality: 0.8,
    crop: {
        enabled: true,
        offsetX: -8,
        offsetY: -15,
        scale: 1.2
    },
    cropRodape: {
        enabled: true,
        offsetX: -4,
        offsetY: -4,
        scale: 1.5
    }
};

// Configurações do PDF
const PDF_CONFIG = {
    format: 'a4',
    orientation: 'portrait',
    unit: 'mm',
    margins: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    },
    rodape: {
        offsetContatos: 10
    },
    colors: {
        primary: '#30475e',
        secondary: '#6c89ae',
        text: '#222222',
        border: '#cccccc'
    },
    fonts: {
        title: 16,
        subtitle: 14,
        normal: 11,
        small: 9
    }
};

// ✅ FUNÇÃO MELHORADA - Adicionar logo com crop inteligente
function adicionarLogoComCrop(doc, x, y, width, height, usarCropRodape = false) {
    try {
        if (!LOGO_BASE64 || LOGO_BASE64.length < 100) return;

        const cropConfig = usarCropRodape ? LOGO_CONFIG.cropRodape : LOGO_CONFIG.crop;

        if (cropConfig.enabled) {
            const novaLargura = width * cropConfig.scale;
            const novaAltura = height * cropConfig.scale;
            const novoX = x + cropConfig.offsetX;
            const novoY = y + cropConfig.offsetY;

            doc.addImage(LOGO_BASE64, 'JPEG', novoX, novoY, novaLargura, novaAltura);

            const corFundo = usarCropRodape ? [248, 248, 248] : [255, 255, 255];
            doc.setFillColor(...corFundo);

            if (novoX < x) {
                doc.rect(novoX, novoY, x - novoX, novaAltura, 'F');
            }
            if (novoY < y) {
                doc.rect(x, novoY, width, y - novoY, 'F');
            }
            if (novoX + novaLargura > x + width) {
                doc.rect(x + width, novoY, (novoX + novaLargura) - (x + width), novaAltura, 'F');
            }
            if (novoY + novaAltura > y + height) {
                doc.rect(x, y + height, width, (novoY + novaAltura) - (y + height), 'F');
            }
        } else {
            doc.addImage(LOGO_BASE64, 'JPEG', x, y, width, height);
        }
    } catch (error) {
        console.warn('Erro ao adicionar logo:', error);
    }
}

// ✅ FUNÇÃO AUXILIAR - Criar link clicável (MOVIDA PARA FORA)
function criarLinkClicavel(doc, texto, url, posicaoX, posicaoY, pageWidth) {
    try {
        if (!doc || !texto || !url) return false;

        doc.setTextColor(0, 102, 204);
        doc.setFont(undefined, 'normal');
        doc.text(texto, posicaoX, posicaoY, { align: 'right' });

        const textWidth = doc.getTextWidth(texto);
        const textX = posicaoX - textWidth;

        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.1);
        doc.line(textX, posicaoY + 0.5, textX + textWidth, posicaoY + 0.5);

        doc.link(textX, posicaoY - 3, textWidth, 4, { url: url });
        return true;
    } catch (error) {
        console.warn('Erro ao criar link:', error);
        return false;
    }
}

// Função principal
function gerarPDFCompleto() {
    try {
        if (typeof window.jspdf === 'undefined') {
            alert('Erro: Biblioteca jsPDF não carregada. Verifique se o arquivo está na pasta assets/');
            return false;
        }

        if (!validarFormulario()) {
            return false;
        }

        const dados = coletarDadosFormulario();

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: PDF_CONFIG.orientation,
            unit: PDF_CONFIG.unit,
            format: PDF_CONFIG.format
        });

        let yPos = adicionarCabecalhoPDF(doc, dados);
        yPos = adicionarDadosClientePDF(doc, dados, yPos);
        yPos = adicionarServicosPDF(doc, dados, yPos);
        yPos = adicionarTotalPDF(doc, dados, yPos);
        yPos = adicionarObservacoesPDF(doc, dados, yPos);
        adicionarRodapePDF(doc, dados);

        const nomeArquivo = gerarNomeArquivo(dados);
        doc.save(nomeArquivo);
        limparRascunho();

        return true;
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar PDF. Verifique se todos os arquivos estão carregados corretamente.');
        return false;
    }
}

// ✅ CABEÇALHO COM LOGO 50x50
function adicionarCabecalhoPDF(doc, dados) {
    const pageWidth = doc.internal.pageSize.getWidth();

    let logoX, logoY;

    switch (LOGO_CONFIG.position) {
        case 'top-left':
            logoX = PDF_CONFIG.margins.left;
            logoY = 3;
            break;
        case 'top-center':
            logoX = (pageWidth - LOGO_CONFIG.width) / 2;
            logoY = 3;
            break;
        case 'top-right':
        default:
            logoX = pageWidth - PDF_CONFIG.margins.right - LOGO_CONFIG.width;
            logoY = 3;
            break;
    }

    adicionarLogoComCrop(doc, logoX, logoY, LOGO_CONFIG.width, LOGO_CONFIG.height, false);

    doc.setFontSize(PDF_CONFIG.fonts.title);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.text('PROPOSTA COMERCIAL', PDF_CONFIG.margins.left, 35);

    doc.setDrawColor(PDF_CONFIG.colors.primary);
    doc.setLineWidth(0.5);
    doc.line(PDF_CONFIG.margins.left, 40, pageWidth - PDF_CONFIG.margins.right, 40);

    return 50;
}

// ✅ DADOS DO CLIENTE COM VALIDAÇÃO
function adicionarDadosClientePDF(doc, dados, yPos) {
    if (!dados) return yPos;

    doc.setFontSize(PDF_CONFIG.fonts.subtitle);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.setFont(undefined, 'bold');

    yPos += 4;

    doc.setFontSize(PDF_CONFIG.fonts.normal);
    doc.setTextColor(PDF_CONFIG.colors.text);

    const dadosCliente = [
        { label: 'Cidade:', valor: dados.cidade },
        { label: 'Unidade:', valor: dados.unidade },
        { label: 'Local:', valor: dados.local }
    ];

    dadosCliente.forEach(item => {
        if (item.valor) {
            doc.setFont(undefined, 'bold');
            doc.text(item.label, PDF_CONFIG.margins.left, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(item.valor, PDF_CONFIG.margins.left + 25, yPos);
            yPos += 6;
        }
    });

    return yPos + 5;
}

// ✅ TABELA DE SERVIÇOS CORRIGIDA COM LOOP PARA LINHAS
function adicionarServicosPDF(doc, dados, yPos) {
    if (!dados || !Array.isArray(dados.servicos)) {
        console.warn('Dados de serviços inválidos');
        return yPos;
    }

    doc.setFontSize(PDF_CONFIG.fonts.subtitle);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.text('SERVIÇOS', PDF_CONFIG.margins.left, yPos);

    yPos += 10;

    if (dados.servicos.length === 0) {
        doc.setFontSize(PDF_CONFIG.fonts.normal);
        doc.setTextColor(PDF_CONFIG.colors.text);
        doc.text('Nenhum serviço adicionado', PDF_CONFIG.margins.left, yPos);
        return yPos + 10;
    }

    const pageWidth = doc.internal.pageSize.getWidth();
    const tableWidth = pageWidth - (PDF_CONFIG.margins.left + PDF_CONFIG.margins.right);
    const colWidths = {
        descricao: tableWidth * 0.4,
        quantidade: tableWidth * 0.15,
        medida: tableWidth * 0.15,
        valor: tableWidth * 0.15,
        somado: tableWidth * 0.15
    };
    const lineHeight = 5;
    const vSpacing = 2;
    const paddingInterno = 6; // Aumentado para 6mm para evitar vazamentos visuais

    // Cabeçalho
    doc.setFillColor(240, 240, 240);
    doc.rect(PDF_CONFIG.margins.left, yPos, tableWidth, lineHeight + vSpacing, 'F');

    doc.setFontSize(PDF_CONFIG.fonts.normal);
    doc.setTextColor(PDF_CONFIG.colors.text);
    doc.setFont(undefined, 'bold');

    let xPos = PDF_CONFIG.margins.left + 2;
    doc.text('Serviço/Produto', xPos, yPos + lineHeight);
    xPos += colWidths.descricao;
    doc.text('Qtd', xPos, yPos + lineHeight);
    xPos += colWidths.quantidade;
    doc.text('Medida', xPos, yPos + lineHeight);
    xPos += colWidths.medida;
    doc.text('Valor Unit.', xPos, yPos + lineHeight);
    xPos += colWidths.valor;
    doc.text('Total', xPos, yPos + lineHeight);

    yPos += lineHeight + vSpacing;
    const yTabelaTopo = yPos - (lineHeight + vSpacing);

    doc.setFont(undefined, 'normal');
    let totalHeight = 0;

    dados.servicos.forEach((servico, index) => {
        if (yPos > doc.internal.pageSize.getHeight() - 30) {
            doc.addPage();
            yPos = 30;
        }

        // Dividir texto em linhas com largura estrita (subtrair padding duplo)
        const maxWidthTexto = colWidths.descricao - (2 * paddingInterno);
        const descricaoLines = doc.splitTextToSize(servico.servico_produto || '', maxWidthTexto);
        const thisRowLines = Math.max(descricaoLines.length, 1);
        const rowHeight = thisRowLines * lineHeight + vSpacing;

        if (index % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(PDF_CONFIG.margins.left, yPos, tableWidth, rowHeight, 'F');
        }

        // Desenhar texto da primeira coluna linha por linha com padding e alinhamento top-left
        const xDescricao = PDF_CONFIG.margins.left + paddingInterno;
        let yAtual = yPos + paddingInterno;
        descricaoLines.forEach(linha => {
            doc.text(linha, xDescricao, yAtual);
            yAtual += lineHeight;
        });

        // Demais colunas (alinhadas no meio da altura da linha)
        const yMeioLinha = yPos + (rowHeight / 2);
        let x = PDF_CONFIG.margins.left + colWidths.descricao + 2;
        doc.text(servico.quantidade || '', x, yMeioLinha);
        x += colWidths.quantidade;
        doc.text(servico.medida || '', x, yMeioLinha);
        x += colWidths.medida;
        doc.text(servico.valor_unitario || '', x, yMeioLinha);
        x += colWidths.valor;
        doc.text(servico.valor_somado || '', x, yMeioLinha);

        yPos += rowHeight;
        totalHeight += rowHeight;
    });

    doc.setDrawColor(PDF_CONFIG.colors.border);
    doc.setLineWidth(0.2);
    doc.rect(
        PDF_CONFIG.margins.left,
        yTabelaTopo,
        tableWidth,
        totalHeight + lineHeight + vSpacing
    );

    let x = PDF_CONFIG.margins.left;
    x += colWidths.descricao;
    doc.line(x, yTabelaTopo, x, yTabelaTopo + totalHeight + lineHeight + vSpacing);
    x += colWidths.quantidade;
    doc.line(x, yTabelaTopo, x, yTabelaTopo + totalHeight + lineHeight + vSpacing);
    x += colWidths.medida;
    doc.line(x, yTabelaTopo, x, yTabelaTopo + totalHeight + lineHeight + vSpacing);
    x += colWidths.valor;
    doc.line(x, yTabelaTopo, x, yTabelaTopo + totalHeight + lineHeight + vSpacing);

    return yPos + 5;
}

// ✅ TOTAL COM POSICIONAMENTO CORRETO
function adicionarTotalPDF(doc, dados, yPos) {
    const pageWidth = doc.internal.pageSize.getWidth();

    const caixaLargura = 85;
    const caixaX = pageWidth - PDF_CONFIG.margins.right - caixaLargura;

    doc.setFillColor(PDF_CONFIG.colors.primary);
    doc.rect(caixaX, yPos, caixaLargura, 12, 'F');

    doc.setFontSize(PDF_CONFIG.fonts.subtitle);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');

    const textoX = caixaX + 5;

    doc.text('TOTAL:', textoX, yPos + 8);
    doc.text(dados.total || 'R$ 0,00', textoX + 25, yPos + 8);

    return yPos + 20;
}

// ✅ RODAPÉ CORRIGIDO COM VALIDAÇÕES
function adicionarRodapePDF(doc, dados) {
    if (!doc) return;

    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    const rodapeY = pageHeight - 35;
    const areaUtil = pageWidth - (PDF_CONFIG.margins.left + PDF_CONFIG.margins.right);

    // Fundo sutil
    doc.setFillColor(248, 248, 248);
    doc.rect(PDF_CONFIG.margins.left, rodapeY, areaUtil, 30, 'F');

    // Linha superior
    doc.setDrawColor(PDF_CONFIG.colors.primary);
    doc.setLineWidth(0.3);
    doc.line(PDF_CONFIG.margins.left, rodapeY, pageWidth - PDF_CONFIG.margins.right, rodapeY);

    // Logo
    const logoRodapeSize = 15;
    const logoRodapeX = PDF_CONFIG.margins.left + 5;
    const logoRodapeY = rodapeY + 5;
    adicionarLogoComCrop(doc, logoRodapeX, logoRodapeY, logoRodapeSize, logoRodapeSize, true);

    // Informações da empresa
    const textoX = PDF_CONFIG.margins.left + 25;

    doc.setFontSize(PDF_CONFIG.fonts.normal);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.setFont(undefined, 'bold');
    doc.text('Lara Engenharia', textoX, rodapeY + 8);

    doc.setFontSize(PDF_CONFIG.fonts.small);
    doc.setTextColor(PDF_CONFIG.colors.text);
    doc.setFont(undefined, 'normal');
    doc.text('Especializada em drywall e serviços civis.', textoX, rodapeY + 13);

    // ✅ APLICAR LINKS COM VALIDAÇÃO
    doc.setFontSize(PDF_CONFIG.fonts.small - 1);

    // E-mail
    criarLinkClicavel(
        doc,
        'Email: contatolaraengenharia@gmail.com',
        'mailto:contatolaraengenharia@gmail.com?subject=Contato%20via%20Proposta%20Comercial',
        pageWidth - PDF_CONFIG.margins.right - PDF_CONFIG.rodape.offsetContatos,
        rodapeY + 8,
        pageWidth
    );

    // Instagram
    criarLinkClicavel(
        doc,
        'Instagram: @laraengenharia_',
        'https://instagram.com/laraengenharia_',
        pageWidth - PDF_CONFIG.margins.right - PDF_CONFIG.rodape.offsetContatos,
        rodapeY + 13.5,
        pageWidth
    );

    // WhatsApp
    const mensagemWhats = encodeURIComponent('Olá! Vi sua proposta comercial e gostaria de mais informações.');
    criarLinkClicavel(
        doc,
        'WhatsApp: (15) 99714-0338',
        `https://wa.me/5515997140338?text=${mensagemWhats}`,
        pageWidth - PDF_CONFIG.margins.right - PDF_CONFIG.rodape.offsetContatos,
        rodapeY + 19,
        pageWidth
    );

    // Data/hora (sem link)
    const dataGeracao = new Date().toLocaleDateString('pt-BR');
    const horaGeracao = new Date().toLocaleTimeString('pt-BR');

    doc.setFontSize(PDF_CONFIG.fonts.small - 1);
    doc.setTextColor(PDF_CONFIG.colors.secondary);
    doc.text(`Proposta gerada em ${dataGeracao} às ${horaGeracao}`, pageWidth / 2, rodapeY + 22, { align: 'center' });

    // ✅ VALIDAÇÃO DE RESPONSÁVEL
    if (dados && dados.responsavel) {
        doc.text(`${dados.responsavel}`, pageWidth / 2, rodapeY + 26, { align: 'center' });
    }
}

// Adicionar observações
function adicionarObservacoesPDF(doc, dados, yPos) {
    if (!dados) return yPos;

    if (dados.observacoes) {
        doc.setFontSize(PDF_CONFIG.fonts.subtitle);
        doc.setTextColor(PDF_CONFIG.colors.primary);
        doc.setFont(undefined, 'bold');
        doc.text('OBSERVAÇÕES', PDF_CONFIG.margins.left, yPos);

        yPos += 8;

        doc.setFontSize(PDF_CONFIG.fonts.normal);
        doc.setTextColor(PDF_CONFIG.colors.text);
        doc.setFont(undefined, 'normal');

        const linhas = doc.splitTextToSize(dados.observacoes, 170);
        doc.text(linhas, PDF_CONFIG.margins.left, yPos);

        yPos += linhas.length * 5;
    }

    if (dados.validade) {
        yPos += 5;
        doc.setFontSize(PDF_CONFIG.fonts.normal);
        doc.setTextColor(PDF_CONFIG.colors.text);
        doc.setFont(undefined, 'bold');
        doc.text('Validade:', PDF_CONFIG.margins.left, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(dados.validade, PDF_CONFIG.margins.left + 25, yPos);
    }

    return yPos;
}

function gerarNomeArquivo(dados) {
    const data = new Date().toISOString().slice(0, 10);
    const cliente = dados.cidade ? dados.cidade.replace(/\s+/g, '_') : 'Cliente';
    return `Proposta_${cliente}_${data}.pdf`;
}

function mostrarLoading(mostrar = true) {
    const botao = document.querySelector('button[type="submit"]');
    if (botao) {
        if (mostrar) {
            botao.textContent = 'Gerando PDF...';
            botao.disabled = true;
        } else {
            botao.textContent = 'Gerar Orçamento em PDF';
            botao.disabled = false;
        }
    }
}