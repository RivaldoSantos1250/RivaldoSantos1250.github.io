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
        linkEl.setAttribute('aria-label', `Ver receita completa de ${recipeOfTheDay.titulo}`);
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