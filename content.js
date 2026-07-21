function destruirBotaoIA() {
    // 1. Tática CSS: Adiciona uma regra invisível direto na cabeça do site para links conhecidos
    if (!document.getElementById('ext-remover-ia-style')) {
        const style = document.createElement('style');
        style.id = 'ext-remover-ia-style';
        style.innerHTML = `a[href*="udm=14"] { display: none !important; }`;
        if (document.head) document.head.appendChild(style);
    }

    // 2. Os termos que vamos caçar (tudo em minúsculo para não ter erro de digitação do Google)
    const termos = ['modo ia', 'ai mode', 'modo ai'];

    // 3. Pega todos os elementos que podem ser um botão
    const elementos = document.querySelectorAll('a, button, div[role="button"], div[role="tab"], span');

    elementos.forEach(el => {
        // Pega o texto e força tudo para minúsculo
        let texto = (el.innerText || el.textContent || '').toLowerCase().trim();

        // Se o texto contém algum dos termos e é curtinho
        if (termos.some(termo => texto.includes(termo)) && texto.length < 35) {
            
            // Procura o botão inteiro
            let container = el.closest('a, button, div[role="button"], div[role="tab"]') || el;
            let largura = container.getBoundingClientRect().width;

            // Trava de Segurança: Só apaga se for menor que 300 pixels (protege a barra de pesquisa)
            if (largura > 0 && largura < 300) {
                container.style.setProperty('display', 'none', 'important');
                container.style.setProperty('visibility', 'hidden', 'important');
                container.style.setProperty('opacity', '0', 'important');
            }
        }
    });
}

// Executa logo de cara
destruirBotaoIA();

// O "Grampo": O MutationObserver vigia qualquer mudança na tela instantaneamente
// Isso burla o bloqueio de tempo do Brave
const observador = new MutationObserver(() => {
    destruirBotaoIA();
});

// Começa a vigiar o site inteiro
if (document.body) {
    observador.observe(document.body, { childList: true, subtree: true });
} else {
    observador.observe(document.documentElement, { childList: true, subtree: true });
}