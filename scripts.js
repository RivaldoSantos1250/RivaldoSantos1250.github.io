document.addEventListener('DOMContentLoaded', function() {
    const filterForm = document.getElementById('filterForm');
    const recipeCards = document.querySelectorAll('.recipe-card');
    const sizes = ['size-small', 'size-medium', 'size-large'];
    const filterToggle = document.getElementById('filterToggle');
    const filters = document.querySelector('.filters');

    function applyRandomSizes() {
        recipeCards.forEach(card => {
            sizes.forEach(size => card.classList.remove(size));
            const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
            card.classList.add(randomSize);
        });
    }

    filterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedCategory = document.getElementById('categoria').value;

        recipeCards.forEach(card => {
            const recipeCategory = card.getAttribute('data-categoria');
            if (selectedCategory === 'todas' || recipeCategory === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        applyRandomSizes();
        filters.classList.remove('show');
        filterToggle.textContent = 'Mostrar Filtros';
    });

    filterToggle.addEventListener('click', function() {
        filters.classList.toggle('show');
        filterToggle.textContent = filters.classList.contains('show') ? 'Esconder Filtros' : 'Mostrar Filtros';
    });

    applyRandomSizes();
});
