document.addEventListener('DOMContentLoaded', () => {
    const totalCards = 20;
    const trophyCardIndex = Math.floor(Math.random() * totalCards);
    const gameBoard = document.getElementById('game-board');
    const result = document.getElementById('result');

    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = 'Card ' + (i + 1);
        card.addEventListener('click', () => {
            if (i === trophyCardIndex) {
                result.textContent = "Congratulations! You found the trophy!";
                card.classList.add('winner');
            } else {
                result.textContent = "Try again!";
            }
            disableCards();
        });
        gameBoard.appendChild(card);
    }

    function disableCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.pointerEvents = 'none';
        });
    }
});
