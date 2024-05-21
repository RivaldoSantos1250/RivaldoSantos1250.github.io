// Função para esconder o preloader e mostrar o conteúdo
function showContent() {
    var preloader = document.getElementById('preloader');
    preloader.style.display = 'none';

    var content = document.getElementById('content');
    content.style.display = 'block';
}

// Adiciona um evento para garantir que o conteúdo será mostrado após todos os recursos serem carregados
window.addEventListener('load', showContent);

// Define um temporizador para forçar a exibição do conteúdo após 10 segundos
setTimeout(showContent, 10000);
