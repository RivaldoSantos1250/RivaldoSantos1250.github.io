document.addEventListener('DOMContentLoaded', function() {
    const postsListContainer = document.getElementById('blog-posts-list');
    const searchInput = document.getElementById('blog-search-input');
    const noResultsMessage = document.getElementById('no-results-blog');
    const recentPostsContainer = document.getElementById('recent-posts-widget');
    const tagsContainer = document.getElementById('tags-widget');

    const allPosts = window.blogPosts || [];

    // Função para criar o novo card de resumo do post
    function createPostSummaryCard(post) {
        return `
            <a href="post.html?id=${post.id}" class="post-summary-card">
                <div class="post-summary-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="post-summary-content">
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-meta">Publicado em 01 de Agosto de 2025</div>
                    <p class="post-excerpt">${post.description}</p>
                    <span class="read-more-link">Ler Artigo Completo &rarr;</span>
                </div>
            </a>
        `;
    }
    
    // Função para renderizar os widgets da sidebar
    function renderSidebar() {
        // Renderiza Posts Recentes (os 3 mais novos)
        if (recentPostsContainer) {
            const recentPosts = allPosts.slice(0, 3);
            recentPostsContainer.innerHTML = recentPosts.map(p => `<li><a href="post.html?id=${p.id}">${p.title}</a></li>`).join('');
        }
        
        // Renderiza as Tags
        if (tagsContainer) {
            const allTags = new Set(allPosts.flatMap(p => p.tags));
            tagsContainer.innerHTML = [...allTags].sort().map(tag => `<li><a href="#" data-tag="${tag.toLowerCase()}">${tag}</a></li>`).join('');
        
            // Adiciona evento de clique para as tags
            document.querySelectorAll('.tags-widget a').forEach(tagLink => {
                tagLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    searchInput.value = e.target.innerText;
                    searchPosts();
                });
            });
        }
    }

    // Função principal para exibir os posts filtrados
    function displayPosts(postsToDisplay) {
        if (!postsListContainer) return;
        
        if (postsToDisplay.length === 0) {
            noResultsMessage.style.display = 'block';
            postsListContainer.innerHTML = '';
        } else {
            noResultsMessage.style.display = 'none';
            postsListContainer.innerHTML = postsToDisplay.map(createPostSummaryCard).join('');
        }
    }

    // Função de busca
    function searchPosts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            displayPosts(allPosts);
            return;
        }
        const filteredPosts = allPosts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = post.description.toLowerCase().includes(searchTerm);
            const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            return titleMatch || descriptionMatch || tagsMatch;
        });
        displayPosts(filteredPosts);
    }

    if (searchInput) {
        searchInput.addEventListener('input', searchPosts);
    }
    
    // Inicialização da página
    displayPosts(allPosts);
    renderSidebar();
});