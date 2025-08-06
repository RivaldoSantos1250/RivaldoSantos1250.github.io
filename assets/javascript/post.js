document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('post-container');
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (!postId) {
        postContainer.innerHTML = '<h1>Postagem não encontrada!</h1>';
        return;
    }

    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        postContainer.innerHTML = `<h1>Erro: Postagem não encontrada.</h1>`;
        document.title = "Post não encontrado | Estação Sabor";
        return;
    }

    document.title = `${post.title} | Blog Estação Sabor`;

    const createTagsHtml = (tags) => {
        if (!tags || tags.length === 0) return '';
        return tags.map(tag => `<li><a href="blog.html?q=${tag}">${tag}</a></li>`).join('');
    };

    const postHTML = `
        <article class="post-main-content">
            <header class="post-header">
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <h1 class="post-title">${post.title}</h1>
                <div class="post-meta">
                    Publicado em 01 de Agosto de 2025 por <strong>Estação Sabor</strong>
                </div>
            </header>
            <section class="post-content">
                ${post.content}
                <br>
                <a href="blog.html" class="btn">Voltar para o Blog</a>
            </section>
        </article>
        
        <aside class="post-sidebar">
            <div class="sidebar-widget author-widget">
                <h3 class="widget-title">Sobre o Autor</h3>
                <img src="assets/img/estacaosabor.jpg" alt="Autor do Blog" class="author-avatar">
                <p>Todas as receitas e dicas da "Estação Sabor" são preparadas com muito carinho para inspirar você na cozinha!</p>
            </div>
             <div class="sidebar-widget tags-widget">
                <h3 class="widget-title">Tags</h3>
                <ul class="tag-list">
                    ${createTagsHtml(post.tags)}
                </ul>
            </div>
        </aside>
    `;
    postContainer.innerHTML = postHTML;
});