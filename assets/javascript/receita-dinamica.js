document.addEventListener('DOMContentLoaded', () => {
    const recipePlaceholder = document.getElementById('recipe-placeholder');
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    if (!recipeId) {
        recipePlaceholder.innerHTML = '<h1>Receita não encontrada!</h1>';
        return;
    }

    setTimeout(() => {
        const todasAsReceitas = window.todasAsReceitas || [];
        const receita = todasAsReceitas.find(r => r.id === recipeId);

        if (!receita) {
            recipePlaceholder.innerHTML = `<h1>Erro: Receita "${recipeId}" não encontrada.</h1>`;
            document.title = "Receita não encontrada | Cozinha da Tia";
            return;
        }

        renderRecipe(receita, todasAsReceitas);
        setupEventListeners();
        updateMetadata(receita);
        loadDisqus(receita); // Carrega os comentários
        checkExistingRating(receita.id);
    }, 500);

    function renderRecipe(data, allRecipes) {
        const dicasHtml = data.dicasDoChef && data.dicasDoChef.length > 0 ? `
            <div class="extra-section">
                <h2 class="section-title"><i class="fas fa-lightbulb"></i>Dicas do Chef</h2>
                <ul class="extra-list">
                    ${data.dicasDoChef.map(dica => `<li>${dica}</li>`).join('')}
                </ul>
            </div>
        ` : '';

        const variacoesHtml = data.variacoes && data.variacoes.length > 0 ? `
            <div class="extra-section">
                <h2 class="section-title"><i class="fas fa-blender"></i>Variações da Receita</h2>
                <ul class="extra-list">
                    ${data.variacoes.map(variacao => `<li>${variacao}</li>`).join('')}
                </ul>
            </div>
        ` : '';

        const autorHtml = `
            <div class="author-bio-box sidebar-section">
                 <h2 class="section-title"><i class="fas fa-user-edit"></i>Sobre o Autor</h2>
                 <div class="author-content">
                    <img src="${data.autor.avatar}" alt="Foto de ${data.autor.nome}" class="author-avatar-bio">
                    <h3>${data.autor.nome}</h3>
                    <p>Todas as receitas do site são preparadas com muito carinho e testadas para garantir o melhor resultado na sua cozinha!</p>
                 </div>
            </div>
        `;
        
        const relatedRecipes = allRecipes.filter(r => r.id !== data.id && r.categoria === data.categoria).slice(0, 3);
        const relatedHtml = relatedRecipes.length > 0 ? `
            <div class="related-recipes-section">
                <h2 class="section-title"><i class="fas fa-stream"></i>Veja Também</h2>
                <div class="recipe-grid related-grid">
                    ${relatedRecipes.map(r => `
                        <a href="receita.html?id=${r.id}" class="recipe-card">
                            <div class="card-image-container">
                                <img src="${r.imagem}" alt="${r.titulo}" loading="lazy">
                            </div>
                            <div class="recipe-card-content">
                                <h3>${r.titulo}</h3>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        ` : '';
        
        const commentsHtml = `
            <div class="comments-section">
                <h2 class="section-title"><i class="fas fa-comments"></i>Deixe o seu Comentário</h2>
                <div id="disqus_thread"></div>
            </div>
        `;

        const recipeHTML = `
            <div class="recipe-layout">
                <div class="recipe-header-group">
                    <h1 class="recipe-title">${data.titulo}</h1>
                    <div class="recipe-meta-bar">
                        ${createMetaItem('fa-regular fa-clock', 'Tempo', data.tempoPreparo)}
                        ${createMetaItem('fa-solid fa-utensils', 'Rende', data.porcoes)}
                        ${createMetaItem('fa-solid fa-bookmark', 'Categoria', data.categoria)}
                        ${createAuthorItem(data.autor)}
                    </div>
                    <img src="${data.imagem}" alt="Foto de ${data.titulo}" class="recipe-hero-image">
                    <div class="author-note-box">
                        <p>${data.historia}</p>
                    </div>
                </div>

                <div class="recipe-sidebar-column">
                    <div class="sidebar-section">
                        <h2 class="section-title"><i class="fas fa-shopping-basket"></i>Ingredientes</h2>
                        <ul class="ingredients-list">
                            ${data.ingredientes.map((item, index) => createIngredientItem(item, index)).join('')}
                        </ul>
                    </div>
                    ${autorHtml}
                    <div class="sidebar-section">
                        <h2 class="section-title"><i class="fas fa-tools"></i>Ferramentas</h2>
                        <ul class="tools-list">
                           ${data.ferramentas.map(tool => `<li><i class="fas fa-check"></i>${tool}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="sidebar-section">
                        <h2 class="section-title"><i class="fas fa-chart-pie"></i>Info Nutricional</h2>
                         <ul class="nutrition-list">
                            <li class="nutrition-list-item"><strong>Calorias:</strong> <span>${data.infoNutricional.calorias}</span></li>
                            <li class="nutrition-list-item"><strong>Carboidratos:</strong> <span>${data.infoNutricional.carboidratos}</span></li>
                            <li class="nutrition-list-item"><strong>Proteínas:</strong> <span>${data.infoNutricional.proteinas}</span></li>
                            <li class="nutrition-list-item"><strong>Gorduras:</strong> <span>${data.infoNutricional.gorduras}</span></li>
                        </ul>
                    </div>
                    <div class="sidebar-section">
                        <h2 class="section-title"><i class="fas fa-star"></i>Avalie</h2>
                        <div class="rating-stars" aria-label="Avaliação por estrelas">
                            <i class="far fa-star" data-value="1" role="button" aria-label="Avaliar com 1 estrela"></i>
                            <i class="far fa-star" data-value="2" role="button" aria-label="Avaliar com 2 estrelas"></i>
                            <i class="far fa-star" data-value="3" role="button" aria-label="Avaliar com 3 estrelas"></i>
                            <i class="far fa-star" data-value="4" role="button" aria-label="Avaliar com 4 estrelas"></i>
                            <i class="far fa-star" data-value="5" role="button" aria-label="Avaliar com 5 estrelas"></i>
                        </div>
                         <h2 class="section-title"><i class="fas fa-share-alt"></i>Compartilhe</h2>
                         <div class="share-buttons">
                            <a href="#" class="share-btn" aria-label="Compartilhar no Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="#" class="share-btn" aria-label="Compartilhar no WhatsApp"><i class="fab fa-whatsapp"></i></a>
                            <a href="#" class="share-btn" aria-label="Compartilhar no Pinterest"><i class="fab fa-pinterest"></i></a>
                         </div>
                    </div>
                </div>

                <div class="recipe-body-group">
                    <h2 class="section-title"><i class="fas fa-clipboard-list"></i>Modo de Preparo</h2>
                    <ol class="instructions-list">
                        ${data.modoPreparo.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                    ${dicasHtml}
                    ${variacoesHtml}
                    ${relatedHtml}
                    ${commentsHtml}
                </div>
            </div>
        `;
        recipePlaceholder.innerHTML = recipeHTML;
    }
    
    // --- FUNÇÃO DO DISQUS ATUALIZADA COM O SEU CÓDIGO ---
    function loadDisqus(receita) {
        var disqus_config = function () {
            this.page.url = window.location.href;  // URL da página atual
            this.page.identifier = receita.id; // Identificador único da receita
        };
        
        (function() { // NÃO EDITE DAQUI PARA BAIXO
            var d = document, s = d.createElement('script');
            s.src = 'https://estacao-sabor.disqus.com/embed.js'; // SEU CÓDIGO AQUI
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }

    function createMetaItem(icon, label, value) {
        return `<div class="meta-item"><i class="${icon}"></i> <div><strong>${label}:</strong> ${value}</div></div>`;
    }
    function createAuthorItem(author) {
        return `<div class="meta-item"><img src="${author.avatar}" alt="Foto de ${author.nome}" class="author-avatar"> <div><strong>Autor:</strong> <a href="sobre.html" style="color: var(--secondary-color); text-decoration: underline;">${author.nome}</a></div></div>`;
    }
    function createIngredientItem(item, index) {
        return `
            <li class="ingredient-item" tabindex="0" role="checkbox" aria-checked="false">
                <input type="checkbox" id="ingredient-${index}" tabindex="-1">
                <span class="checkbox-custom" aria-hidden="true"><i class="fas fa-check"></i></span>
                <label for="ingredient-${index}" class="ingredient-text">${item}</label>
            </li>`;
    }

    function setupEventListeners() {
    // Lógica dos ingredientes (permanece a mesma)
    document.querySelectorAll('.ingredient-item').forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const toggleCheck = () => {
            checkbox.checked = !checkbox.checked;
            item.setAttribute('aria-checked', checkbox.checked);
        };
        item.addEventListener('click', toggleCheck);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCheck();
            }
        });
    });

    // --- NOVA LÓGICA DE AVALIAÇÃO ---
    const ratingContainer = document.querySelector('.rating-stars');
    if (!ratingContainer) return;

    const stars = ratingContainer.querySelectorAll('i');
    const recipeId = new URLSearchParams(window.location.search).get('id');
    const ratingKey = `rating_${recipeId}`;

    const setRating = (ratingValue) => {
        stars.forEach(star => {
            const isSelected = star.dataset.value <= ratingValue;
            star.classList.toggle('fas', isSelected); // Preenchida
            star.classList.toggle('far', !isSelected); // Vazia
        });
    };

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            if (!ratingContainer.hasAttribute('data-rating-set')) {
                setRating(star.dataset.value);
            }
        });

        star.addEventListener('click', () => {
            const rating = star.dataset.value;
            localStorage.setItem(ratingKey, rating);
            ratingContainer.setAttribute('data-rating-set', 'true');
            setRating(rating);
        });
    });

    ratingContainer.addEventListener('mouseout', () => {
        if (!ratingContainer.hasAttribute('data-rating-set')) {
            setRating(0); // Limpa as estrelas se nenhuma foi clicada
        } else {
            const savedRating = localStorage.getItem(ratingKey) || 0;
            setRating(savedRating); // Restaura a avaliação guardada
        }
    });
}
    
    function updateMetadata(receita) {
        document.title = `${receita.titulo} | Cozinha da Tia`;
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', `Receita completa de ${receita.titulo}. Ingredientes e passo a passo detalhado.`);
        }
        
        const oldSchema = document.querySelector('script[type="application/ld+json"]');
        if (oldSchema) oldSchema.remove();

        const schema = {
            "@context": "https://schema.org/",
            "@type": "Recipe",
            "name": receita.titulo,
            "image": window.location.origin + receita.imagem,
            "author": {
                "@type": "Person",
                "name": receita.autor.nome
            },
            "datePublished": "2024-05-15",
            "description": receita.historia,
            "prepTime": `PT${receita.tempoPreparo.replace('h', 'H').replace('min', 'M')}`,
            "recipeYield": receita.porcoes,
            "recipeCategory": receita.categoria,
            "recipeIngredient": receita.ingredientes,
            "recipeInstructions": receita.modoPreparo.map(step => ({ "@type": "HowToStep", "text": step })),
            "nutrition": {
                "@type": "NutritionInformation",
                "calories": receita.infoNutricional.calorias
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
    }
});

function checkExistingRating(recipeId) {
    const ratingKey = `rating_${recipeId}`;
    const savedRating = localStorage.getItem(ratingKey);

    if (savedRating) {
        const ratingContainer = document.querySelector('.rating-stars');
        const stars = ratingContainer.querySelectorAll('i');
        
        ratingContainer.setAttribute('data-rating-set', 'true');
        stars.forEach(star => {
            const isSelected = star.dataset.value <= savedRating;
            star.classList.toggle('fas', isSelected);
            star.classList.toggle('far', !isSelected);
        });
    }
}