// Inicialização do tsParticles
tsParticles.load('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 1000 } },
        color: { value: ['#00d4ff', '#7b2cbf'] },
        shape: { type: 'circle' },
        opacity: { value: 0.6, random: true },
        size: { value: 4, random: true },
        move: { enable: true, speed: 3, direction: 'none', random: true }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: 'bubble' },
            onclick: { enable: true, mode: 'push' }
        },
        modes: {
            bubble: { distance: 150, size: 6, duration: 2 },
            push: { quantity: 5 }
        }
    }
});

// Contador de apostas
let betCount = 0;
const betCountElement = document.getElementById('bet-count');
const countUp = new CountUp('bet-count', 0, { duration: 1 });

// Login Modal
const loginModal = document.getElementById('login-modal');
function openLoginModal() {
    loginModal.style.display = 'flex';
}
document.getElementById('close-login').onclick = () => {
    loginModal.style.display = 'none';
};

// Validação do formulário de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username.length < 3) {
        showError(errorMessage, 'Usuário deve ter pelo menos 3 caracteres.');
        return;
    }
    if (password.length < 6) {
        showError(errorMessage, 'Senha deve ter pelo menos 6 caracteres.');
        return;
    }
    showSuccess(errorMessage, 'Login bem-sucedido! (Simulação)');
    setTimeout(() => loginModal.style.display = 'none', 1000);
});

// Gerenciamento de apostas
const selectedBetsList = document.getElementById('selected-bets');
const betModal = document.getElementById('bet-modal');
const modalText = document.getElementById('modal-text');
const confirmBet = document.getElementById('confirm-bet');
const cancelBet = document.getElementById('cancel-bet');

document.querySelectorAll('.bet-button').forEach(button => {
    button.addEventListener('click', function() {
        const betCard = this.parentElement;
        const betId = betCard.dataset.id;
        const betTitle = betCard.querySelector('h3').textContent;
        const betOdds = betCard.querySelector('.odds-value').textContent;

        modalText.textContent = `Deseja apostar em ${betTitle} com odds ${betOdds}?`;
        betModal.style.display = 'flex';

        confirmBet.onclick = () => {
            betCount++;
            countUp.update(betCount);
            const li = document.createElement('li');
            li.textContent = `${betTitle} - Odds: ${betOdds}`;
            selectedBetsList.appendChild(li);
            this.textContent = 'Apostado!';
            this.disabled = true;
            betModal.style.display = 'none';
            showToast('Aposta confirmada com sucesso!');
        };

        cancelBet.onclick = () => {
            betModal.style.display = 'none';
        };
    });
});

// Filtro de apostas
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const category = this.dataset.category;
        document.querySelectorAll('.bet-card').forEach(card => {
            card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none';
        });
    });
});

// Carrinho de apostas
const betCart = document.getElementById('bet-cart');
document.querySelector('.cart-toggle').addEventListener('click', () => {
    betCart.classList.toggle('open');
});

// Limpar apostas
document.getElementById('clear-cart').addEventListener('click', () => {
    selectedBetsList.innerHTML = '';
    betCount = 0;
    countUp.update(0);
    document.querySelectorAll('.bet-button').forEach(button => {
        button.textContent = 'Apostar';
        button.disabled = false;
    });
    showToast('Carrinho limpo!');
});

// Simulação de odds ao vivo
setInterval(() => {
    document.querySelectorAll('.odds-value').forEach(odds => {
        const base = parseFloat(odds.dataset.base);
        const variation = (Math.random() - 0.5) * 0.2;
        const newOdds = (base + variation).toFixed(2);
        odds.textContent = newOdds;
        odds.style.color = variation > 0 ? '#00ff88' : '#ff006e';
        setTimeout(() => odds.style.color = '#00d4ff', 500);
    });
}, 5000);

// Menu hambúrguer
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('active');
});

// Alternância de tema
document.getElementById('theme-switch').addEventListener('click', function() {
    document.body.classList.toggle('body-light');
    this.innerHTML = document.body.classList.contains('body-light') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Funções de feedback
function showError(element, message) {
    element.textContent = message;
    element.style.color = '#ff006e';
}

function showSuccess(element, message) {
    element.textContent = message;
    element.style.color = '#00ff88';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
}
