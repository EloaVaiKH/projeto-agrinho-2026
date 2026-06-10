/* ==========================================================================
   PROJETO AGRINHO 2026 - ENSINO MÉDIO
   TEMA: MST (ESTÉTICA COQUETTE)
   ARQUIVO: script.js (LÓGICA, INTERATIVIDADE E ANIMAÇÕES)
   ========================================================================== */

// Garante que o script só rode após todo o HTML ser carregado no navegador
document.addEventListener("DOMContentLoaded", () => {
    
    // Executa as funções principais do site
    initReadingProgressBar();
    initScrollReveal();
    initScrollSpy();
    initCoquetteClickEffects();
    initBackToTopButton();
});

/**
 * 1. BARRA DE PROGRESSO DE LEITURA (FITA COQUETTE)
 * Cria dinamicamente uma fita rosa no topo da página que mostra o progresso da leitura.
 */
function initReadingProgressBar() {
    // Cria o elemento da barra
    const progressBar = document.createElement("div");
    progressBar.id = "reading-progress-bar";
    
    // Estiliza diretamente via JS para garantir que fique no topo fixo
    Object.assign(progressBar.style, {
        position: "fixed",
        top: "0",
        left: "0",
        height: "4px",
        backgroundColor: "var(--coquette-rose-deep)",
        width: "0%",
        zIndex: "9999",
        transition: "width 0.1s ease-out",
        boxShadow: "0 2px 8px rgba(255, 133, 161, 0.4)"
    });
    
    document.body.appendChild(progressBar);

    // Atualiza a largura da barra conforme o scroll acontece
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY; // Quanto o usuário já rolou
        const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Altura total rolável
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + "%";
    });
}

/**
 * 2. EFEITO DE REVELAÇÃO SUAVE (SCROLL REVEAL)
 * Usa a Intersection Observer API para fazer as seções surgirem romanticamente ao rolar a tela.
 */
function initScrollReveal() {
    const sections = document.querySelectorAll(".content-section, .pilar-card");

    // Configuração inicial de estilo para os elementos sumirem antes do scroll
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    });

    // Cria o observador que detecta quando o elemento aparece na tela
    const observerOptions = {
        root: null, // Usa o viewport do navegador
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplica os estilos para fazer o elemento surgir
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Para de observar o elemento já revelado para economizar memória
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Ativa o observador em todas as seções selecionadas
    sections.forEach(section => revealObserver.observe(section));
}

/**
 * 3. DESTAQUE AUTOMÁTICO NO MENU (SCROLL SPY)
 * Ilumina o link do menu correspondente à seção que está visível na tela.
 */
function initScrollSpy() {
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll("#main-nav ul li a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Desconto da altura do menu fixo/topo
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        // Remove a classe ativa de todos e adiciona apenas no link atual
        navLinks.forEach(link => {
            link.classList.remove("active-coquette-link");
            // Estilização extra temporária via JS para o link ativo
            link.style.color = "var(--text-secondary)";
            link.style.fontWeight = "500";

            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active-coquette-link");
                link.style.color = "var(--coquette-rose-deep)";
                link.style.fontWeight = "600";
            }
        });
    });
}

/**
 * 4. PARTÍCULAS DE FLORES E BRILHOS AO CLICAR (COQUETTE TOUCH)
 * Cria pequenas flores ou faíscas estéticas que flutuam e somem quando o usuário clica no site.
 */
function initCoquetteClickEffects() {
    const coquetteSymbols = ["✿", "✧", "ʚɞ", "❀"];

    window.addEventListener("click", (event) => {
        // Escolhe um símbolo aleatório do array
        const randomSymbol = coquetteSymbols[Math.floor(Math.random() * coquetteSymbols.length)];
        
        // Cria o container da partícula
        const particle = document.createElement("span");
        particle.innerText = randomSymbol;
        
        // Estilização da partícula voadora
        Object.assign(particle.style, {
            position: "absolute",
            left: `${event.pageX}px`,
            top: `${event.pageY}px`,
            pointerEvents: "none", // Evita que a partícula atrapalhe outros cliques
            color: "var(--coquette-blush)",
            fontSize: "1.5rem",
            transform: "translate(-50%, -50%)",
            transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
            opacity: "1",
            zIndex: "10000"
        });

        document.body.appendChild(particle);

        // Força o navegador a processar o estilo inicial antes de rodar a animação
        requestAnimationFrame(() => {
            particle.style.top = `${event.pageY - 50}px`; // Sobe um pouco
            particle.style.opacity = "0"; // Esmaece
            particle.style.transform = "translate(-50%, -50%) scale(1.5) rotate(30deg)";
        });

        // Remove a partícula do HTML após o término da animação
        setTimeout(() => {
            particle.remove();
        }, 800);
    });
}

/**
 * 5. BOTÃO "VOLTAR AO TOPO" (SMOOTH BACK TO TOP)
 * Um botão delicado que aparece discretamente no canto inferior para retornar ao topo.
 */
function initBackToTopButton() {
    const topButton = document.createElement("button");
    topButton.innerHTML = "☝ ʚɞ";
    topButton.id = "back-to-top";
    
    // Estilização do botão em harmonia com o CSS Coquette
    Object.assign(topButton.style, {
        position: "fixed",
        bottom: "30px",
        right: "-60px", // Começa escondido para fora da tela
        backgroundColor: "var(--coquette-white)",
        color: "var(--coquette-rose-deep)",
        border: "2px double var(--coquette-pink-main)",
        borderRadius: "50%",
        width: "45px",
        height: "45px",
        cursor: "pointer",
        boxShadow: "var(--main-shadow)",
        transition: "right 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease",
        fontFamily: "var(--font-body)",
        fontSize: "1.1rem",
        zIndex: "999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    });

    document.body.appendChild(topButton);

    // Mostra ou esconde o botão com base no scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topButton.style.right = "30px"; // Mostra o botão
        } else {
            topButton.style.right = "-60px"; // Esconde o botão
        }
    });

    // Efeito de hover interativo
    topButton.addEventListener("mouseenter", () => {
        topButton.style.transform = "scale(1.1)";
        topButton.style.backgroundColor = "var(--coquette-pink-light)";
    });
    topButton.addEventListener("mouseleave", () => {
        topButton.style.transform = "scale(1)";
        topButton.style.backgroundColor = "var(--coquette-white)";
    });

    // Ação de clique para rolar suavemente para o topo
    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
