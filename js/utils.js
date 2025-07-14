// ===== FUNÇÕES UTILITÁRIAS =====

// Formatação monetária unificada
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

function extrairValorNumerico(valorMonetario) {
    return parseFloat(valorMonetario.replace(/[R\$\s.]/g, '').replace(",", ".")) || 0;
}

// Aplicar máscara monetária em elemento
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
        e.target.style.border = "";
        e.target.title = "";
    });
    
    elemento.addEventListener('blur', function(e) {
        const valor = extrairValorNumerico(e.target.value);
        if (isNaN(valor) && e.target.value !== "") {
            e.target.style.border = "2px solid #e74c3c";
            e.target.title = "Valor inválido";
        }
    });
}

// Função debounce para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Validação completa do formulário
function validarFormulario() {
    const campos = {
        cidade: document.querySelector('input[name="cidade"]').value,
        unidade: document.querySelector('input[name="unidade"]').value,
        local: document.querySelector('input[name="local"]').value
    };
    
    for (const [campo, valor] of Object.entries(campos)) {
        if (!valor.trim()) {
            alert(`Campo "${campo}" é obrigatório!`);
            return false;
        }
    }
    
    const servicos = document.querySelectorAll("#tabela-servicos tbody tr");
    if (servicos.length === 0) {
        alert("Adicione pelo menos um serviço!");
        return false;
    }
    
    return true;
}