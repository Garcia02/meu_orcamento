// ===== GERAÇÃO DE PDF MELHORADA =====

// Logo da empresa em Base64 (mesma que você forneceu)
const LOGO_BASE64 = 'data:image/jpeg;base64,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';

// ✅ CONFIGURAÇÕES SEPARADAS PARA CABEÇALHO E RODAPÉ
const LOGO_CONFIG = {
    width: 50,
    height: 50,
    position: 'top-right',
    quality: 0.8,
    // Crop para cabeçalho
    crop: {
        enabled: true,
        offsetX: -8,
        offsetY: -15,
        scale: 1.2
    },
    // ✅ NOVO: Crop específico para rodapé
    cropRodape: {
        enabled: true,
        offsetX: -4,     // ← Mais offset para centralizar
        offsetY: -4,     // ← Mais offset para centralizar  
        scale: 1.5       // ← ZOOM MAIOR (era 1.2, agora 1.8)
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
    // ✅ NOVA CONFIGURAÇÃO
    rodape: {
        offsetContatos: 10  // ← Afastamento dos contatos da borda direita
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

        // ✅ ESCOLHER CONFIGURAÇÃO DE CROP
        const cropConfig = usarCropRodape ? LOGO_CONFIG.cropRodape : LOGO_CONFIG.crop;

        if (cropConfig.enabled) {
            // EXPLICAÇÃO: Aplicar zoom e reposicionamento
            const novaLargura = width * cropConfig.scale;
            const novaAltura = height * cropConfig.scale;
            const novoX = x + cropConfig.offsetX;
            const novoY = y + cropConfig.offsetY;

            // Adicionar imagem com zoom
            doc.addImage(LOGO_BASE64, 'JPEG', novoX, novoY, novaLargura, novaAltura);

            // ✅ MÁSCARA PARA ESCONDER BORDAS (crop simulado)
            const corFundo = usarCropRodape ? [248, 248, 248] : [255, 255, 255]; // Cor do fundo
            doc.setFillColor(...corFundo);

            // Mascarar bordas que saem da área desejada
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
            // Sem crop, imagem normal
            doc.addImage(LOGO_BASE64, 'JPEG', x, y, width, height);
        }
    } catch (error) {
        console.warn('Erro ao adicionar logo:', error);
    }
}

// Função principal (sem mudanças significativas)
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

        // Construir o PDF
        let yPos = adicionarCabecalhoPDF(doc, dados);
        yPos = adicionarDadosClientePDF(doc, dados, yPos);
        yPos = adicionarServicosPDF(doc, dados, yPos);
        yPos = adicionarTotalPDF(doc, dados, yPos);
        yPos = adicionarObservacoesPDF(doc, dados, yPos);
        adicionarRodapePDF(doc);

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

// ✅ FUNÇÃO MELHORADA - Cabeçalho com logo 50x50
function adicionarCabecalhoPDF(doc, dados) {
    const pageWidth = doc.internal.pageSize.getWidth();

    // Logo 50x50 no topo
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

    // ✅ USAR CROP PADRÃO (false = não usar crop de rodapé)
    adicionarLogoComCrop(doc, logoX, logoY, LOGO_CONFIG.width, LOGO_CONFIG.height, false);

    // Título principal
    doc.setFontSize(PDF_CONFIG.fonts.title);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.text('PROPOSTA COMERCIAL', pageWidth / 2, 35, { align: 'center' });

    // Linha decorativa
    doc.setDrawColor(PDF_CONFIG.colors.primary);
    doc.setLineWidth(0.5);
    doc.line(PDF_CONFIG.margins.left, 40, pageWidth - PDF_CONFIG.margins.right, 40);

    return 50;
}

// ✅ FUNÇÃO CORRIGIDA - Dados do cliente com título
function adicionarDadosClientePDF(doc, dados, yPos) {
    // ✅ TÍTULO DA SEÇÃO (estava faltando!)
    doc.setFontSize(PDF_CONFIG.fonts.subtitle);
    doc.setTextColor(PDF_CONFIG.colors.primary);
    doc.setFont(undefined, 'bold');

    yPos += 4; // Espaço após o título

    // Dados do cliente
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

// ✅ FUNÇÃO MELHORADA - Total com posicionamento correto
function adicionarTotalPDF(doc, dados, yPos) {
    const pageWidth = doc.internal.pageSize.getWidth();

    // EXPLICAÇÃO: Caixa dimensionada corretamente
    const caixaLargura = 85; // Largura suficiente
    const caixaX = pageWidth - PDF_CONFIG.margins.right - caixaLargura;

    doc.setFillColor(PDF_CONFIG.colors.primary);
    doc.rect(caixaX, yPos, caixaLargura, 12, 'F');

    // Configuração do texto
    doc.setFontSize(PDF_CONFIG.fonts.subtitle);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');

    // EXPLICAÇÃO: Posicionamento relativo à caixa
    const textoX = caixaX + 5; // 5mm da borda esquerda da caixa

    doc.text('TOTAL:', textoX, yPos + 8);
    doc.text(dados.total || 'R\$ 0,00', textoX + 25, yPos + 8); // 25mm de espaço

    return yPos + 20;
}

// ✅ RODAPÉ CORRIGIDO - Com links clicáveis e posicionamento correto
function adicionarRodapePDF(doc) {
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

    // ✅ FUNÇÃO AUXILIAR CORRIGIDA
    function criarLinkClicavel(texto, url, yPos) {
        // ✅ USAR A CONFIGURAÇÃO GLOBAL DE OFFSET
        const posicaoX = pageWidth - PDF_CONFIG.margins.right - PDF_CONFIG.rodape.offsetContatos;

        // Texto em azul
        doc.setTextColor(0, 102, 204);
        doc.setFont(undefined, 'normal');
        doc.text(texto, posicaoX, yPos, { align: 'right' });

        // Calcular área do link
        const textWidth = doc.getTextWidth(texto);
        const textX = posicaoX - textWidth;

        // Linha sublinhada para indicar link
        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.1);
        doc.line(textX, yPos + 0.5, textX + textWidth, yPos + 0.5);

        // Adicionar link clicável
        doc.link(textX, yPos - 3, textWidth, 4, { url: url });
    }

    // ✅ APLICAR LINKS
    doc.setFontSize(PDF_CONFIG.fonts.small - 1);

    // E-mail
    criarLinkClicavel(
        'Email: contatolaraengenharia@gmail.com',
        'mailto:contatolaraengenharia@gmail.com?subject=Contato%20via%20Proposta%20Comercial',
        rodapeY + 8
    );

    // Instagram
    criarLinkClicavel(
        'Instagram: @laraengenharia_',
        'https://instagram.com/laraengenharia_',
        rodapeY + 13.5
    );

    // WhatsApp
    const mensagemWhats = encodeURIComponent('Olá! Vi sua proposta comercial e gostaria de mais informações.');
    criarLinkClicavel(
        'WhatsApp: (15) 99714-0338',
        `https://wa.me/5515997140338?text=${mensagemWhats}`,
        rodapeY + 19
    );

    // Data/hora (sem link)
    const dataGeracao = new Date().toLocaleDateString('pt-BR');
    const horaGeracao = new Date().toLocaleTimeString('pt-BR');

    doc.setFontSize(PDF_CONFIG.fonts.small - 1);
    doc.setTextColor(PDF_CONFIG.colors.secondary);
    doc.text(`Proposta gerada em ${dataGeracao} às ${horaGeracao}`, pageWidth / 2, rodapeY + 22, { align: 'center' });
}

// Função para adicionar tabela de serviços com quebras automáticas e bordas corrigidas
function adicionarServicosPDF(doc, dados, yPos) {
    // Título da seção
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

    // Configurações
    const pageWidth = doc.internal.pageSize.getWidth();
    const tableWidth = pageWidth - (PDF_CONFIG.margins.left + PDF_CONFIG.margins.right);
    const colWidths = {
        descricao: tableWidth * 0.5,
        unidade: tableWidth * 0.2,
        valor:   tableWidth * 0.3
    };
    const lineHeight = 5; // Altura de linha base
    const vSpacing = 2;   // Espaço vertical extra para respiro

    // Cabeçalho da tabela
    doc.setFillColor(240, 240, 240);
    doc.rect(PDF_CONFIG.margins.left, yPos, tableWidth, lineHeight + vSpacing, 'F');

    doc.setFontSize(PDF_CONFIG.fonts.normal);
    doc.setTextColor(PDF_CONFIG.colors.text);
    doc.setFont(undefined, 'bold');

    let xPos = PDF_CONFIG.margins.left + 2;
    doc.text('Descrição', xPos, yPos + lineHeight);
    xPos += colWidths.descricao;
    doc.text('Unidade', xPos, yPos + lineHeight);
    xPos += colWidths.unidade;
    doc.text('Valor', xPos, yPos + lineHeight);

    yPos += lineHeight + vSpacing;

    // Parte que muda: cálculo do topo original para desenhar borda depois de todas as linhas
    const yTabelaTopo = yPos - (lineHeight + vSpacing);

    // Linhas da tabela
    doc.setFont(undefined, 'normal');
    let totalHeight = 0;

    dados.servicos.forEach((servico, index) => {
        // Quebra de página
        if (yPos > doc.internal.pageSize.getHeight() - 30) {
            doc.addPage();
            yPos = 30;
        }

        // Split na descrição para quebra automática
        const descricaoLines = doc.splitTextToSize(servico.descricao || '', colWidths.descricao - 4);
        const thisRowLines = Math.max(descricaoLines.length, 1);
        const rowHeight = thisRowLines * lineHeight + vSpacing;

        // Fundo alternado
        if (index % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(PDF_CONFIG.margins.left, yPos, tableWidth, rowHeight, 'F');
        }

        // Conteúdo
        let x = PDF_CONFIG.margins.left + 2;
        let yText = yPos + lineHeight; // Um pouco abaixo do topo
        doc.text(descricaoLines, x, yText-4, {baseline: "top"}); // baseline garante início correto do texto
        x += colWidths.descricao;
        doc.text(servico.unidade || '', x, yText);
        x += colWidths.unidade;
        doc.text(servico.valor || '', x, yText);

        yPos += rowHeight;
        totalHeight += rowHeight;
    });

    // Bordas externas da tabela
    doc.setDrawColor(PDF_CONFIG.colors.border);
    doc.setLineWidth(0.2);
    // Altura total = head + todas as linhas
    doc.rect(
        PDF_CONFIG.margins.left,
        yTabelaTopo,
        tableWidth,
        totalHeight + lineHeight + vSpacing // + head
    );

    // Bordas internas coluna
    let x = PDF_CONFIG.margins.left;
    x += colWidths.descricao;
    doc.line(x, yTabelaTopo, x, yTabelaTopo + totalHeight + lineHeight + vSpacing);
    x += colWidths.unidade;
    doc.line(x, yTabelaTopo, x, yTabelaTopo + totalHeight + lineHeight + vSpacing);

    return yPos + 5;
}

// Adicionar observações
function adicionarObservacoesPDF(doc, dados, yPos) {
    if (dados.observacoes) {
        // Título
        doc.setFontSize(PDF_CONFIG.fonts.subtitle);
        doc.setTextColor(PDF_CONFIG.colors.primary);
        doc.setFont(undefined, 'bold');
        doc.text('OBSERVAÇÕES', PDF_CONFIG.margins.left, yPos);

        yPos += 8;

        // Conteúdo
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
    if (mostrar) {
        botao.textContent = 'Gerando PDF...';
        botao.disabled = true;
    } else {
        botao.textContent = 'Gerar Orçamento em PDF';
        botao.disabled = false;
    }
}