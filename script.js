const modeToggleButton = document.getElementById('modeToggleButton');
const body = document.body;

modeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Verifica se o modo escuro está ativado ao carregar a página
window.onload = () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        body.classList.add('dark-mode');
    }
};
