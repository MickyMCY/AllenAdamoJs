// Validação do formulário de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username.length < 3) {
        errorMessage.textContent = 'Usuário deve ter pelo menos 3 caracteres.';
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'Senha deve ter pelo menos 6 caracteres.';
        return;
    }

    errorMessage.textContent = 'Login bem-sucedido! (Simulação)';
    errorMessage.style.color = '#26a69a';
});

// Gerenciamento de apostas
const betButtons = document.querySelectorAll('.bet-button');
const selectedBetsList = document.getElementById('selected-bets');

betButtons.forEach(button => {
    button.addEventListener('click', function() {
        const betCard = this.parentElement;
        const betId = betCard.dataset.id;
        const betTitle = betCard.querySelector('h3').textContent;
        const betOdds = betCard.querySelector('p').textContent;

        // Adiciona a aposta à lista de selecionadas
        const li = document.createElement('li');
        li.textContent = `${betTitle} - ${betOdds}`;
        selectedBetsList.appendChild(li);

        // Feedback visual
        this.textContent = 'Apostado!';
        this.disabled = true;
        this.style.backgroundColor = '#546e7a';
    });
});
