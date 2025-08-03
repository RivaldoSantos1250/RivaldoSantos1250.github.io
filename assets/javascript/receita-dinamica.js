document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.getElementById('recipe-placeholder');
    
    // 1. Pega o parâmetro 'id' da URL
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    if (!recipeId) {
        recipeContainer.innerHTML = '<h1>Receita não encontrada!</h1><p>Por favor, selecione uma receita da nossa lista.</p>';
        return;
    }

    // 2. Encontra a receita correspondente no nosso 'banco de dados'
    // A variável 'todasAsReceitas' vem do arquivo 'dados-receitas.js'
    const receita = window.todasAsReceitas.find(r => r.id === recipeId);

    // 3. Se a receita não for encontrada, mostra uma mensagem de erro
    if (!receita) {
        recipeContainer.innerHTML = `<h1>Erro: Receita "${recipeId}" não encontrada.</h1><p>Verifique o link ou volte para a página de receitas.</p>`;
        document.title = "Receita não encontrada | Cozinha da Tia";
        return;
    }

    // 4. Se encontrou, constrói o HTML da página dinamicamente
    document.title = `${receita.titulo} | Cozinha da Tia`; // Atualiza o título da aba

    // Gera o HTML para as listas (ingredientes, modo de preparo, etc.)
    const ingredientesHTML = receita.ingredientes.map(item => `<li>${item}</li>`).join('');
    const modoPreparoHTML = receita.modoPreparo.map(item => `<li>${item}</li>`).join('');
    const observacoesHTML = receita.observacoes.length > 0 
        ? `<h2>Observações</h2><ul>${receita.observacoes.map(item => `<li>${item}</li>`).join('')}</ul>`
        : '';

    const recipeHTML = `
        <header class="recipe-header">
            <h1>${receita.titulo}</h1>
            <img src="${receita.imagem}" alt="${receita.titulo}">
            <div class="recipe-details">
                <div class="detail-item"><i class="fas fa-clock"></i><span>${receita.tempoPreparo}</span></div>
                <div class="detail-item"><i class="fas fa-utensils"></i><span>${receita.porcoes}</span></div>
            </div>
        </header>

        <div class="recipe-body">
            <section class="recipe-section ingredients-section">
                <h2>Ingredientes</h2>
                <ul>
                    ${ingredientesHTML}
                </ul>
            </section>
            
            <section class="recipe-section instructions-section">
                <h2>Modo de Preparo</h2>
                <ol>
                    ${modoPreparoHTML}
                </ol>
            </section>
        </div>
        
        ${observacoesHTML ? `
        <div class="recipe-footer">
            <section class="recipe-section observations-section">
                ${observacoesHTML}
            </section>
        </div>` : ''}
    `;

    recipeContainer.innerHTML = recipeHTML;
});