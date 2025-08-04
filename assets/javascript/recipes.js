document.addEventListener('DOMContentLoaded', function() {
    const recipeListContainer = document.getElementById('recipe-list');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const searchInput = document.getElementById('search-input');
    const noResultsMessage = document.getElementById('no-results');

    const allRecipes = window.todasAsReceitas || [];

    // Função para mapear dificuldade para classe de cor
    function getDifficultyClass(difficulty) {
        if (!difficulty) return '';
        const d = difficulty.toLowerCase();
        if (d === 'fácil') return 'facil';
        if (d === 'médio') return 'medio';
        if (d === 'difícil') return 'dificil';
        return '';
    }

    // Função para criar o HTML do novo card de receita
    function createRecipeCard(recipe) {
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

    // Função para exibir as receitas no container
    function displayRecipes(recipesToDisplay) {
        if (!recipeListContainer) return;
        
        if (recipesToDisplay.length === 0) {
            noResultsMessage.style.display = 'block';
            recipeListContainer.innerHTML = '';
        } else {
            noResultsMessage.style.display = 'none';
            recipeListContainer.innerHTML = recipesToDisplay.map(createRecipeCard).join('');
        }
    }

    // Função para criar os botões de filtro
    function createFilterButtons() {
        if (!allRecipes.length || !categoryFiltersContainer) return;
        
        const categories = ['Todas', ...new Set(allRecipes.map(r => r.categoria).filter(Boolean))].sort();
        
        categoryFiltersContainer.innerHTML = categories.map(category => `
            <button class="filter-btn ${category === 'Todas' ? 'active' : ''}" data-filter="${category.toLowerCase()}">
                ${category}
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

    // Função principal que filtra e busca as receitas
    function filterAndSearchRecipes() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const searchTerm = searchInput.value.toLowerCase().trim();

        const filteredRecipes = allRecipes.filter(recipe => {
            const matchesCategory = (activeFilter === 'todas') || (recipe.categoria && recipe.categoria.toLowerCase() === activeFilter);
            
            const recipeTitle = recipe.titulo.toLowerCase();
            const recipeIngredients = recipe.ingredientes.join(' ').toLowerCase();
            const matchesSearch = searchTerm === '' || recipeTitle.includes(searchTerm) || recipeIngredients.includes(searchTerm);

            return matchesCategory && matchesSearch;
        });

        displayRecipes(filteredRecipes);
    }
    
    // Adiciona o listener para a busca em tempo real
    if(searchInput) {
        searchInput.addEventListener('input', filterAndSearchRecipes);
    }

    // --- FUNÇÃO DE INICIALIZAÇÃO DA PÁGINA ---
    function initializePage() {
        if (!allRecipes.length && recipeListContainer) {
            recipeListContainer.innerHTML = '<p>Nenhuma receita foi carregada. Verifique o arquivo de dados.</p>';
            return;
        }

        createFilterButtons();

        // Pega o termo de busca da URL (vindo da home)
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');

        // Se houver um termo de busca, preenche o campo
        if (searchQuery && searchInput) {
            searchInput.value = searchQuery;
        }

        // Filtra e exibe as receitas na inicialização
        filterAndSearchRecipes();
    }

    // Roda a inicialização
    initializePage();
});