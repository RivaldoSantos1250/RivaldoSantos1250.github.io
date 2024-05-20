
        function toggleIngredient(element) {
        const checkbox = element.querySelector('.checkbox');
        const ingredientName = element.querySelector('span');

        // Alternar marcação no checkbox
        checkbox.checked = !checkbox.checked;

        // Adicionar/remover classe de corte no nome do ingrediente
        if (checkbox.checked) {
            ingredientName.classList.add('cut');
        } else {
            ingredientName.classList.remove('cut');
        }
    }
    