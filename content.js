function removerModoIA() {
    // 1. Procura o texto exato "Modo IA" em qualquer lugar da tela
    const xpath = "//text()[normalize-space()='Modo IA']";
    const resultado = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let i = 0; i < resultado.snapshotLength; i++) {
        let noDeTexto = resultado.snapshotItem(i);
        let elementoPai = noDeTexto.parentElement;

        if (elementoPai) {
            // Tenta achar o botão, link ou aba que envolve esse texto
            let botaoEnvolvendoTexto = elementoPai.closest('a, button, div[role="button"], div[role="tab"]');
            
            // Se achou a estrutura do botão, mira nela. Se não, mira no texto direto.
            let alvo = botaoEnvolvendoTexto || elementoPai;

            // TRAVA DE SEGURANÇA: Verifica o tamanho do alvo.
            // Só apaga se for menor que 200 pixels (isso protege a barra de pesquisa de sumir!)
            let largura = alvo.getBoundingClientRect().width;
            
            if (largura > 0 && largura < 200) {
                alvo.style.setProperty('display', 'none', 'important');
            }
        }
    }

    // 2. Proteção extra para as abas de pesquisa: Oculta pelo link (udm=14)
    document.querySelectorAll('a[href*="udm=14"]').forEach(link => {
        let largura = link.getBoundingClientRect().width;
        if (largura > 0 && largura < 200) {
            link.style.setProperty('display', 'none', 'important');
        }
    });
}

// Executa imediatamente
removerModoIA();

// Continua monitorando a cada meio segundo para caso o botão tente reaparecer
setInterval(removerModoIA, 500);