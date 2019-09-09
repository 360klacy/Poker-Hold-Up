// No extend, not a component, just oop js
class Deck{
    constructor(){
        this.cards = [];
    }
    // Make a new deck of cards from nothing
    // card has a number and a suit 1.suit 2. value
    // innerloop for value
    // push onto this.deck, c + suit
    create(){
        console.log("Yall good");
        const suits =['h','s','d','c'];
        suits.forEach((suit)=>{
            for(let c = 1; c<=13; c++){
                this.cards.push(c+suit);
            }
        })

    }
    // Take new deck, and shuffle cards
    // The deck is inside this.deck
    // To shuffle swap 2 indicies in the array many, many times
    // Store the value in this.dec[rand1] in a temp variable
    // Put the value of 2 in card 1
    shuffle(){
        console.log("yall still good")
        let rand1 = Math.floor(Math.random() * 52);
        let rand2 = Math.floor(Math.random() * 52);
        let temp = this.cards[rand1];
        this.cards[rand1] = this.cards[rand2];
        this.cards[rand2] = temp;
    }
}

export default Deck;