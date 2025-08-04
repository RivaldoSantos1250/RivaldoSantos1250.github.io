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
    
    // --- SEO: Adicionar Meta Description e Dados Estruturados (JSON-LD) ---
    document.title = `${receita.titulo} | Cozinha da Tia`;
    
    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', `Aprenda a fazer ${receita.titulo}. Ingredientes: ${receita.ingredientes.slice(0, 3).join(', ')}...`);

    // Dados Estruturados (JSON-LD)
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Recipe",
        "name": receita.titulo,
        "image": window.location.origin + receita.imagem,
        "description": `Receita completa de ${receita.titulo}. Uma delícia da Cozinha da Tia.`,
        "prepTime": `PT${receita.tempoPreparo.replace('h', 'H').replace('min', 'M')}`,
        "recipeYield": receita.porcoes,
        "recipeCategory": receita.categoria,
        "recipeIngredient": receita.ingredientes,
        "recipeInstructions": receita.modoPreparo.map((step, index) => {
            return {
                "@type": "HowToStep",
                "text": step
            };
        })
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    
    // --- Fim da Lógica de SEO ---

    const criarListaIngredientes = (ingredientes) => {
        return ingredientes.map((item, index) => `
            <li class="ingredient-item" onclick="document.getElementById('ingredient-${index}').click()" tabindex="0">
                <input type="checkbox" id="ingredient-${index}" tabindex="-1">
                <span class="checkbox-custom" aria-hidden="true"><i class="fas fa-check"></i></span>
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
                        <i class="fas fa-clock" aria-hidden="true"></i>
                        <span>${receita.tempoPreparo}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-utensils" aria-hidden="true"></i>
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
    
    // Adiciona listener para a tecla Enter nos ingredientes para acessibilidade
    document.querySelectorAll('.ingredient-item').forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                item.click();
            }
        });
    });
});