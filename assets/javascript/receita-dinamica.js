document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.getElementById('recipe-placeholder');
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    if (!recipeId) {
        recipeContainer.innerHTML = '<h1>Receita não encontrada!</h1>';
        return;
    }

    const receita = window.todasAsReceitas.find(r => r.id === recipeId);

    if (!receita) {
        recipeContainer.innerHTML = `<h1>Erro: Receita "${recipeId}" não encontrada.</h1>`;
        document.title = "Receita não encontrada | Cozinha da Tia";
        return;
    }

    document.title = `${receita.titulo} | Cozinha da Tia`;

    // Função para gerar a lista de ingredientes com checkboxes
    const criarListaIngredientes = (ingredientes) => {
        return ingredientes.map((item, index) => `
            <li class="ingredient-item" onclick="document.getElementById('ingredient-${index}').click()">
                <input type="checkbox" id="ingredient-${index}">
                <span class="checkbox-custom"><i class="fas fa-check"></i></span>
                <span class="ingredient-text">${item}</span>
            </li>
        `).join('');
    };

    const ingredientesHTML = criarListaIngredientes(receita.ingredientes);
    const modoPreparoHTML = receita.modoPreparo.map(item => `<li>${item}</li>`).join('');
    const observacoesHTML = receita.observacoes.length > 0 
        ? `<div class="recipe-notes">
               <section class="recipe-section">
                   <h2>Observações</h2>
                   <ul>${receita.observacoes.map(item => `<li>${item}</li>`).join('')}</ul>
               </section>
           </div>`
        : '';

    const recipeHTML = `
        <div class="recipe-content-wrapper">
            <div class="recipe-hero">
                <img src="${receita.imagem}" alt="${receita.titulo}">
            </div>

            <div class="recipe-title-section">
                <h1>${receita.titulo}</h1>
                <div class="recipe-meta">
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${receita.tempoPreparo}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-utensils"></i>
                        <span>${receita.porcoes}</span>
                    </div>
                </div>
            </div>

            <div class="recipe-main-content">
                <section class="recipe-section">
                    <h2>Ingredientes</h2>
                    <ul class="ingredients-list">
                        ${ingredientesHTML}
                    </ul>
                </section>
                
                <section class="recipe-section">
                    <h2>Modo de Preparo</h2>
                    <ol class="instructions-list">
                        ${modoPreparoHTML}
                    </ol>
                </section>
            </div>
            ${observacoesHTML}
        </div>
    `;

    recipeContainer.innerHTML = recipeHTML;
});