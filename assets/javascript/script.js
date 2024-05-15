function toggleMenu() {
    var mobileMenu = document.getElementById("mobile-menu");
    var menuIcon = document.querySelector(".menu-icon");

    // Verifica se o menu está visível ou não e alterna sua exibição
    if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
        menuIcon.classList.remove("open"); // Remove a classe 'open' para voltar ao ícone do menu hamburguer
    } else {
        mobileMenu.style.display = "block";
        menuIcon.classList.add("open"); // Adiciona a classe 'open' para mostrar o ícone "X" do menu aberto
    }
}

// Função para alternar o modo escuro
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}

// Event listener para ajustar o menu móvel ao redimensionar a tela
window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var mobileMenu = document.getElementById('mobile-menu');
    var mainNav = document.getElementById('main-nav');

    if (width > 768) {
        mobileMenu.style.display = 'none';
    } else {
        if (mainNav.style.display === 'none') {
            mobileMenu.style.display = 'block';
        }
    }
});

// Event listener para o formulário de pesquisa
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    var query = document.getElementById('search-input').value.trim().toLowerCase();
    if (query !== '') {
        searchRecipes(query);
    }
});

// Função para pesquisar receitas
function searchRecipes(query) {
    // Conjunto de dados de exemplo das receitas
    var recipes = [
        { nome: "Receita 1", descricao: "Descrição da Receita 1" },
        { nome: "Receita 2", descricao: "Descrição da Receita 2" },
        { nome: "ze", descricao: "Descrição da Receita ze" }, // Receita "ze"
    ];

    // Filtra as receitas que correspondem à consulta
    var results = recipes.filter(function(recipe) {
        return recipe.nome.toLowerCase().includes(query);
    });

    // Exibe os resultados na página
    displayResults(results);
}

// Função para exibir os resultados da pesquisa
function displayResults(results) {
    var resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Limpa os resultados anteriores

    if (results.length > 0) {
        results.forEach(function(recipe) {
            var recipeHTML = '<div>';
            recipeHTML += '<h3>' + recipe.nome + '</h3>';
            recipeHTML += '<p>' + recipe.descricao + '</p>';
            recipeHTML += '</div>';
            resultsContainer.innerHTML += recipeHTML;
        });
    } else {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
}

// Função para alternar a exibição do campo de pesquisa
function toggleSearch() {
    var searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('active');
}