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
    const postHTML = `
        <h1>${post.title}</h1>
        ${post.content}
        <br>
        <a href="blog.html" class="btn">Voltar para o Blog</a>
    `;
    postContainer.innerHTML = postHTML;
});