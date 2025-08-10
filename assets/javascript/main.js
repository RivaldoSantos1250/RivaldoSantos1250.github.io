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

// --- NOVA FUNÇÃO PARA A NOTÍCIA DO BLOG NA HOME ---
function initBlogPostOfTheHour() {
    const container = document.getElementById('blog-post-of-the-hour');
    if (!container) return;

    const allPosts = window.blogPosts || [];
    if (allPosts.length === 0) return;

    // Seleciona um post com base na hora atual
    const currentHour = new Date().getHours();
    const postIndex = currentHour % allPosts.length;
    const post = allPosts[postIndex];

    const postHTML = `
        <a href="post.html?id=${post.id}" class="recipe-card">
            <div class="card-image-container" style="height: 250px;">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="recipe-card-content">
                <h3>${post.title}</h3>
                <p style="color: var(--secondary-color); font-size: 1rem;">${post.description}</p>
            </div>
        </a>
    `;
    container.innerHTML = postHTML;
}


// ======== NOVA FUNÇÃO PARA DEIXAR O LINK DO MENU ATIVO AUTOMATICAMENTE ========
function setActiveNavLink() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        // Limpa a classe de todos para garantir
        link.classList.remove('active');

        // Adiciona a classe se o caminho do link for igual à localização atual
        if (linkPath === currentLocation) {
            link.classList.add('active');
        }

        // Caso especial: se estivermos numa página de receita, ativa o link "Receitas"
        if (currentLocation.includes('/receita.html') && linkPath.includes('/receitas.html')) {
            link.classList.add('active');
        }
    });
}


// Listener principal que executa quando a página carrega
document.addEventListener('DOMContentLoaded', () => {

    setActiveNavLink(); // <-- CHAMA A NOVA FUNÇÃO

    // --- CORREÇÃO DO HEADER ---
    const header = document.querySelector('.main-header');
    if (header) {
        // Verifica se a página atual é a home
        const isHomePage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');

        const handleHeaderStyle = () => {
            const shouldBeScrolled = window.scrollY > 50;

            if (isHomePage && !shouldBeScrolled) {
                // Se for a home E estiver no topo, remove o 'scrolled'
                header.classList.remove('scrolled');
            } else {
                // Em todas as outras páginas ou se a home for rolada, adiciona o 'scrolled'
                header.classList.add('scrolled');
            }
        };
        handleHeaderStyle(); // Executa na primeira vez
        window.addEventListener('scroll', handleHeaderStyle); // E depois no scroll
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
    if (typeof initBlogPostOfTheHour === 'function') {
        initBlogPostOfTheHour();
    }
});

// SUBSTITUA O CÓDIGO DE BUSCA ANTERIOR POR ESTE EM assets/javascript/main.js

/**
 * Função para intercalar dois arrays.
 * Ex: [1, 2], [A, B] se torna [1, A, 2, B]
 */
function interleaveArrays(arr1, arr2) {
    const results = [];
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++) {
        if (i < arr1.length) {
            results.push(arr1[i]);
        }
        if (i < arr2.length) {
            results.push(arr2[i]);
        }
    }
    return results;
}

/**
 * Função de Pesquisa Unificada
 * Busca em receitas e posts de blog e intercala os resultados.
 */
function unifiedSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    if (searchTerm === '') {
        return [];
    }

    const allRecipes = window.todasAsReceitas || [];
    const allPosts = window.blogPosts || [];

    // Busca nas receitas
    const matchedRecipes = allRecipes.filter(recipe => {
        const titleMatch = recipe.titulo.toLowerCase().includes(searchTerm);
        const ingredientsMatch = recipe.ingredientes.join(' ').toLowerCase().includes(searchTerm);
        return titleMatch || ingredientsMatch;
    }).map(recipe => ({
        type: 'recipe',
        title: recipe.titulo,
        url: `receita.html?id=${recipe.id}`,
        image: recipe.imagem,
        category: 'Receita'
    }));

    // Busca nos posts do blog
    const matchedPosts = allPosts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = post.description.toLowerCase().includes(searchTerm);
        const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        return titleMatch || descriptionMatch || tagsMatch;
    }).map(post => ({
        type: 'post',
        title: post.title,
        url: `post.html?id=${post.id}`,
        image: post.image,
        category: 'Blog'
    }));

    // Intercala os resultados para uma exibição mista
    return interleaveArrays(matchedRecipes, matchedPosts);
}

/**
 * Mostra a prévia dos resultados da busca
 */
function displaySearchResultsPreview(results, container) {
    if (results.length === 0) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';
    container.innerHTML = `
        <ul class="search-results-list">
            ${results.slice(0, 10).map(result => `
                <li>
                    <a href="${result.url}">
                        <img src="${result.image}" alt="${result.title}" class="result-image">
                        <div class="result-info">
                            <span class="result-title">${result.title}</span>
                            <span class="result-category">${result.category}</span>
                        </div>
                    </a>
                </li>
            `).join('')}
        </ul>
    `;
}

// Modifica o listener do overlay de busca para adicionar a prévia
const searchOverlay = document.getElementById('search-overlay');
if (searchOverlay) {
    const searchInput = searchOverlay.querySelector('input[type="search"]');
    let resultsContainer = searchOverlay.querySelector('.search-results-preview');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-preview';
        searchInput.parentElement.style.position = 'relative'; // Garante o posicionamento correto
        searchInput.parentElement.appendChild(resultsContainer);
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        if (query.length < 2) { // Não busca com menos de 2 caracteres
            resultsContainer.style.display = 'none';
            return;
        }
        const results = unifiedSearch(query);
        displaySearchResultsPreview(results, resultsContainer);
    });
}

// --- LÓGICA PARA A BUSCA NA PÁGINA INICIAL ---
const homeSearchInput = document.getElementById('home-search-input');
const homeSearchBtn = document.getElementById('home-search-btn');

if (homeSearchInput && homeSearchBtn && searchOverlay) {
    // Abre a busca quando o botão é clicado
    homeSearchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchOverlay.setAttribute('aria-hidden', 'false');
        // Coloca o texto do input da home no input da busca
        const overlayInput = searchOverlay.querySelector('input[type="search"]');
        if (overlayInput) {
            overlayInput.value = homeSearchInput.value;
            // Dispara um evento para que a pré-visualização de resultados funcione
            overlayInput.dispatchEvent(new Event('input'));
            overlayInput.focus();
        }
    });

    // Permite buscar pressionando Enter no campo
    homeSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            homeSearchBtn.click(); // Simula um clique no botão
        }
    });
}