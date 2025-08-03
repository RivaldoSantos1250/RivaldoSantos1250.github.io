// Função para inicializar a Receita do Dia
function initRecipeOfTheDay() {
    const rotdContainer = document.getElementById('rotd-container');
    if (!rotdContainer) return;

    const allRecipes = window.todasAsReceitas || [];
    if (allRecipes.length === 0) {
        if(document.getElementById('rotd-title')) {
            document.getElementById('rotd-title').textContent = "Nenhuma receita encontrada.";
        }
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

    if (imagePlaceholder && titleEl && descriptionEl && linkEl) {
        const descriptionSummary = recipeOfTheDay.modoPreparo.slice(0, 2).join(' ');
        imagePlaceholder.innerHTML = `<img src="${recipeOfTheDay.imagem}" alt="Receita do Dia: ${recipeOfTheDay.titulo}" loading="lazy">`;
        titleEl.textContent = recipeOfTheDay.titulo;
        descriptionEl.textContent = descriptionSummary;
        linkEl.href = `receita.html?id=${recipeOfTheDay.id}`;
    }
}


// Listener principal que executa quando a página carrega
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA O HEADER MODERNO ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- LÓGICA PARA O NOVO MENU MOBILE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    if (mobileMenuBtn && mobileNavOverlay && mobileMenuCloseBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
        });
        mobileMenuCloseBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
        });
    }

    // --- LÓGICA PARA O TEMA ESCURO/CLARO ---
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

    // --- LÓGICA PARA O OVERLAY DE BUSCA (CORRIGIDA) ---
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    if (searchIcon && searchOverlay && closeSearch) {
       searchIcon.addEventListener('click', () => {
           searchOverlay.classList.add('active');
       });
       closeSearch.addEventListener('click', () => {
           searchOverlay.classList.remove('active');
       });
    }

    // --- LÓGICA PARA O BOTÃO "SCROLL TO TOP" ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- LÓGICA PARA O COOKIE CONSENT ---
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    if (cookieConsent && acceptCookies) {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieConsent.style.display = 'flex';
        }
        acceptCookies.addEventListener('click', () => {
            cookieConsent.style.display = 'none';
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

    // --- LÓGICA PARA ANIMAÇÃO DE FADE-IN ---
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
    
    // --- INICIALIZA A RECEITA DO DIA ---
    if (typeof initRecipeOfTheDay === 'function') {
        initRecipeOfTheDay();
    }
});