document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const recipeCards = document.querySelectorAll('#recipe-list .recipe-card');

    function filterRecipes() {
        const selectedCategory = categoryFilter.value;
        
        recipeCards.forEach(card => {
            const cardCategory = card.getAttribute('data-categoria');
            if (selectedCategory === 'todas' || cardCategory === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Aplicar filtro ao carregar a página se houver parâmetro na URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filtro');
    if (urlFilter) {
        categoryFilter.value = urlFilter;
    }
    
    filterRecipes(); // Aplica o filtro inicial

    // Event listener para mudança no select
    categoryFilter.addEventListener('change', filterRecipes);
});