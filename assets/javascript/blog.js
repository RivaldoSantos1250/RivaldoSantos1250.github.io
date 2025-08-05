document.addEventListener('DOMContentLoaded', function() {
    const postsListContainer = document.getElementById('blog-posts-list');
    const searchInput = document.getElementById('blog-search-input');
    const noResultsMessage = document.getElementById('no-results-blog');

    function createPostCard(post) {
        return `
            <a href="post.html?id=${post.id}" class="recipe-card">
                <div class="card-image-container" style="height: 250px;">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="recipe-card-content">
                    <h3>${post.title}</h3>
                    <p style="color: var(--secondary-color); font-size: 1rem;">${post.description}</p>
                </div>
            </a>
        `;
    }

    function displayPosts(postsToDisplay) {
        if (!postsListContainer) return;
        if (postsToDisplay.length === 0) {
            noResultsMessage.style.display = 'block';
            postsListContainer.innerHTML = '';
        } else {
            noResultsMessage.style.display = 'none';
            postsListContainer.innerHTML = postsToDisplay.map(createPostCard).join('');
        }
    }

    function searchPosts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            displayPosts(blogPosts);
            return;
        }
        const filteredPosts = blogPosts.filter(post => {
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

    displayPosts(blogPosts);
});