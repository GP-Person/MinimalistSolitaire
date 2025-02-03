const readline = require('readline');

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    toString() {
        return `${this.rank}${this.suit}`;
    }
}

class Deck {
    constructor() {
        this.suits = ['♠', '♥', '♦', '♣'];
        this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.cards = [];
        this.initializeDeck();
        this.shuffle();
    }
    initializeDeck() {
        this.suits.forEach(suit => {
            this.ranks.forEach(rank => {
                this.cards.push(new Card(suit, rank));
            });
        });
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    draw() {
        return this.cards.pop();
    }
}

class Solitaire {
    constructor() {
        this.deck = new Deck();
        this.foundation = [];
        this.stock = this.deck.cards;
        this.waste = [];
    }
    drawCard() {
        if (this.stock.length === 0) {
            console.log("Stock is empty. Reshuffling waste into stock.");
            this.stock = this.waste.reverse();
            this.waste = [];
        }
        let card = this.stock.pop();
        this.waste.push(card);
        console.log(`Drawn Card: ${card}`);
    }
    moveToFoundation() {
        if (this.waste.length > 0) {
            let card = this.waste.pop();
            this.foundation.push(card);
            console.log(`Moved ${card} to foundation.`);
        } else {
            console.log("No cards in waste to move.");
        }
    }
    displayGameState() {
        console.log("\nGame State:");
        console.log("Stock:", this.stock.length, "cards left");
        console.log("Waste:", this.waste.map(card => card.toString()).join(', ') || "Empty");
        console.log("Foundation:", this.foundation.map(card => card.toString()).join(', ') || "Empty");
    }
}

const game = new Solitaire();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    game.displayGameState();
    rl.question('\nEnter command (draw, move, exit): ', (answer) => {
        if (answer === 'draw') {
            game.drawCard();
        } else if (answer === 'move') {
            game.moveToFoundation();
        } else if (answer === 'exit') {
            console.log("Thanks for playing!");
            rl.close();
            return;
        } else {
            console.log("Invalid command. Use 'draw', 'move', or 'exit'.");
        }
        promptUser();
    });
}

console.log("Welcome to Minimalist Solitaire!");
promptUser();
