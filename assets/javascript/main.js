// Função para inicializar a Receita do Dia
function initRecipeOfTheDay() {
    const rotdContainer = document.getElementById('rotd-container');
    if (!rotdContainer) return;

    const allRecipes = window.todasAsReceitas;
    if (!allRecipes || allRecipes.length === 0) {
        document.getElementById('rotd-title').textContent = "Nenhuma receita encontrada.";
        return;
    }

    const msPerDay = 1000 * 60 * 60 * 24;
    const dayIndex = Math.floor(Date.now() / msPerDay);
    const recipeIndex = dayIndex % allRecipes.length;
    const recipeOfTheDay = allRecipes[recipeIndex];

    const imagePlaceholder = document.getElementById('rotd-image-placeholder');
    const titleEl = document.getElementById('rotd-title');
    const descriptionEl = document.getElementById('rotd-description');
    const linkEl = document.getElementById('rotd-link');

    const descriptionSummary = recipeOfTheDay.modoPreparo.slice(0, 2).join(' ');

    imagePlaceholder.innerHTML = `<img src="${recipeOfTheDay.imagem}" alt="Receita do Dia: ${recipeOfTheDay.titulo}" loading="lazy">`;
    titleEl.textContent = recipeOfTheDay.titulo;
    descriptionEl.textContent = descriptionSummary;
    linkEl.href = `receita.html?id=${recipeOfTheDay.id}`;
}


// Listener principal que executa quando a página carrega
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para o Tema Escuro/Claro ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            }
        }
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeToggle.querySelector('i').classList.toggle('fa-moon');
            themeToggle.querySelector('i').classList.toggle('fa-sun');
        });
    }

    // --- Lógica para o Menu Mobile ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }

    // --- Lógica para o Overlay de Busca ---
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    if (searchIcon && searchOverlay && closeSearch) {
        searchIcon.addEventListener('click', () => searchOverlay.classList.add('active'));
        closeSearch.addEventListener('click', () => searchOverlay.classList.remove('active'));
    }

    // --- Lógica para o Botão "Scroll to Top" ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Lógica para o Cookie Consent ---
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    if (cookieConsent && acceptCookies) {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieConsent.classList.add('show');
        }
        acceptCookies.addEventListener('click', () => {
            cookieConsent.classList.remove('show');
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

    // --- Lógica para Animação de Fade-in ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    if (fadeInSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -100px 0px'
        });

        fadeInSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // --- Inicializa a Receita do Dia ---
    initRecipeOfTheDay();
});