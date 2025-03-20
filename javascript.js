document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const icons = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍓", "🥭", "🍍"];
    let cards = [...icons, ...icons]; // Duplicate icons for matching
    let flippedCards = [];
    let matchedCards = [];

    // Shuffle the cards using Fisher-Yates algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(icon) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.innerHTML = "?"; // Initially hidden
        card.addEventListener("click", flipCard);
        return card;
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
            this.innerHTML = this.dataset.icon;
            this.classList.add("flipped");
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 800);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.icon === card2.dataset.icon) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedCards.push(card1, card2);
        } else {
            card1.innerHTML = "?";
            card2.innerHTML = "?";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            setTimeout(() => alert("You won!"), 500);
        }
    }

    function initGame() {
        gameBoard.innerHTML = "";
        shuffle(cards);
        cards.forEach(icon => gameBoard.appendChild(createCard(icon)));
        flippedCards = [];
        matchedCards = [];
    }

    initGame();
});