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
        const descriptionSummary = recipeOfTheDay.historia || recipeOfTheDay.modoPreparo.slice(0, 2).join(' ');
        imagePlaceholder.innerHTML = `<img src="${recipeOfTheDay.imagem}" alt="Receita do Dia: ${recipeOfTheDay.titulo}" loading="lazy">`;
        titleEl.textContent = recipeOfTheDay.titulo;
        descriptionEl.textContent = descriptionSummary.substring(0, 150) + '...';
        linkEl.href = `receita.html?id=${recipeOfTheDay.id}`;
    }
}

// --- NOVA FUNÇÃO PARA OS POPULARES DA SEMANA ---
function initFeaturedRecipes() {
    const container = document.getElementById('featured-recipe-list');
    if (!container) return;

    const allRecipes = window.todasAsReceitas || [];
    if (allRecipes.length === 0) return;

    // Defina aqui os IDs das 3 receitas que você quer destacar
    const featuredIds = ['pudim-leite-condensado', 'brownie-caneca', 'feijoada-completa'];
    
    const featuredRecipes = featuredIds.map(id => allRecipes.find(r => r.id === id)).filter(Boolean);

    function getDifficultyClass(difficulty) {
        if (!difficulty) return '';
        const d = difficulty.toLowerCase();
        if (d === 'fácil') return 'facil';
        if (d === 'médio') return 'medio';
        if (d === 'difícil') return 'dificil';
        return '';
    }

    function createFeaturedCard(recipe) {
        const difficultyClass = getDifficultyClass(recipe.dificuldade);
        return `
            <a href="receita.html?id=${recipe.id}" class="recipe-card" data-categoria="${recipe.categoria || ''}">
                <div class="card-image-container">
                    <img src="${recipe.imagem}" alt="${recipe.titulo}" loading="lazy">
                    <span class="card-category-badge">${recipe.categoria || 'Sem Categoria'}</span>
                </div>
                <div class="recipe-card-content">
                    <h3>${recipe.titulo}</h3>
                    <div class="recipe-card-footer">
                        <div class="recipe-meta-item">
                           <span class="difficulty-badge ${difficultyClass}">${recipe.dificuldade || 'N/A'}</span>
                        </div>
                        <div class="recipe-meta-item">
                            <i class="far fa-clock"></i>
                            <span>${recipe.tempoPreparo || 'N/A'}</span>
                        </div>
                         <div class="recipe-meta-item">
                            <i class="fas fa-utensils"></i>
                            <span>${recipe.porcoes || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }
    
    container.innerHTML = featuredRecipes.map(createFeaturedCard).join('');
}


// Listener principal que executa quando a página carrega
document.addEventListener('DOMContentLoaded', () => {

    // --- CORREÇÃO DO HEADER ---
    const header = document.querySelector('.main-header');
    if (header) {
        const isHomePage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');

        const handleHeaderStyle = () => {
            const shouldBeScrolled = window.scrollY > 50;

            if (isHomePage) {
                header.classList.toggle('scrolled', shouldBeScrolled);
            } else {
                header.classList.add('scrolled');
            }
        };
        handleHeaderStyle();
        window.addEventListener('scroll', handleHeaderStyle);
    }

    // --- LÓGICA PARA O NOVO MENU MOBILE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    if (mobileMenuBtn && mobileNavOverlay && mobileMenuCloseBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            mobileNavOverlay.setAttribute('aria-hidden', 'false');
        });
        mobileMenuCloseBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            mobileNavOverlay.setAttribute('aria-hidden', 'true');
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
           searchOverlay.setAttribute('aria-hidden', 'false');
       });
       closeSearch.addEventListener('click', () => {
           searchOverlay.classList.remove('active');
           searchOverlay.setAttribute('aria-hidden', 'true');
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
    
    // --- INICIALIZA AS FUNÇÕES DA PÁGINA ---
    if (typeof initRecipeOfTheDay === 'function') {
        initRecipeOfTheDay();
    }
    if (typeof initFeaturedRecipes === 'function') {
        initFeaturedRecipes();
    }
});