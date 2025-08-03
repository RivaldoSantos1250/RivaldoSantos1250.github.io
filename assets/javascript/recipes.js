document.addEventListener('DOMContentLoaded', function() {
    const recipeListContainer = document.getElementById('recipe-list');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const searchInput = document.getElementById('search-input');
    const noResultsMessage = document.getElementById('no-results');

    const allRecipes = window.todasAsReceitas || [];

    function createRecipeCard(recipe) {
        const description = recipe.modoPreparo[0] ? recipe.modoPreparo[0].substring(0, 80) + '...' : 'Clique para ver a receita completa.';
        return `
            <div class="recipe-card" data-categoria="${recipe.categoria || ''}">
                <a href="receita.html?id=${recipe.id}">
                    <div class="card-image-container">
                        <img src="${recipe.imagem}" alt="${recipe.titulo}" loading="lazy">
                    </div>
                    <div class="recipe-card-content">
                        <h3>${recipe.titulo}</h3>
                        <p>${description}</p> 
                    </div>
                </a>
            </div>
        `;
    }

    function displayRecipes(recipesToDisplay) {
        if (recipesToDisplay.length === 0) {
            noResultsMessage.style.display = 'block';
            recipeListContainer.innerHTML = '';
        } else {
            noResultsMessage.style.display = 'none';
            recipeListContainer.innerHTML = recipesToDisplay.map(createRecipeCard).join('');
        }
    }

    function createFilterButtons() {
        if (!allRecipes.length || !categoryFiltersContainer) return;
        
        const categories = ['todas', ...new Set(allRecipes.map(r => r.categoria).filter(Boolean))].sort();
        
        categoryFiltersContainer.innerHTML = categories.map(category => `
            <button class="filter-btn ${category === 'todas' ? 'active' : ''}" data-filter="${category}">
                ${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
            </button>
        `).join('');

        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                button.classList.add('active');
                filterAndSearchRecipes();
            });
        });
    }

    function filterAndSearchRecipes() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const searchTerm = searchInput.value.toLowerCase().trim();

        const filteredRecipes = allRecipes.filter(recipe => {
            const matchesCategory = (activeFilter === 'todas') || (recipe.categoria === activeFilter);
            
            const recipeTitle = recipe.titulo.toLowerCase();
            const recipeIngredients = recipe.ingredientes.join(' ').toLowerCase();
            const matchesSearch = searchTerm === '' || recipeTitle.includes(searchTerm) || recipeIngredients.includes(searchTerm);

            return matchesCategory && matchesSearch;
        });

        displayRecipes(filteredRecipes);
    }
    
    if(searchInput) {
        searchInput.addEventListener('keyup', filterAndSearchRecipes);
    }

    // --- FUNÇÃO DE INICIALIZAÇÃO ---
    function initializePage() {
        createFilterButtons();

        // Pega o termo de busca da URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');

        // Se houver um termo de busca, coloca na caixa de texto
        if (searchQuery) {
            searchInput.value = searchQuery;
        }

        // Filtra e exibe as receitas (com ou sem o termo de busca)
        filterAndSearchRecipes();
    }

    // Roda a inicialização
    initializePage();
});