// --- LÓGICA PARA O FORMULÁRIO DE ENVIO DE RECEITA ---
const recipeForm = document.getElementById('recipeForm');
const successMessageContainer = document.getElementById('form-success-message');

if (recipeForm && successMessageContainer) {
    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o redirecionamento padrão

        const formData = new FormData(recipeForm);
        const button = recipeForm.querySelector('button[type="submit"]');
        const originalButtonText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        fetch(recipeForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                recipeForm.style.display = 'none'; // Esconde o formulário
                successMessageContainer.style.display = 'block'; // Mostra a mensagem de sucesso
            } else {
                // Se houver um erro no servidor, o utilizador pode tentar novamente
                throw new Error('Falha no envio do formulário.');
            }
        }).catch(error => {
            console.error(error);
            alert('Ocorreu um erro ao enviar sua receita. Por favor, tente novamente.');
            button.disabled = false;
            button.innerHTML = originalButtonText;
        });
    });
}