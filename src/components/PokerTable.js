import React, {Component} from 'react';
import PokerHand from './PokerHand'
import './PokerTable.css';
import Deck from '../utilityClasses/Deck';

class PokerTable extends Component{
    constructor(){
        super();
        this.deck = new Deck();
        this.deck.create();
        this.deck.shuffle();
        console.log(this.deck.cards);
        this.state = {
            playerHand: [],
            dealerHand: [],
            communityHand: []
        }
    
    }

    // Method mad by me, not a react methoc
    // Will deal the first 4 cards
    // At tthis point this.deck has 48 elements in it, 4 removed
    prepDeck = ()=>{
        const card1 = this.deck.cards.shift();
        const card2 = this.deck.cards.shift();
        const card3 = this.deck.cards.shift();
        const card4 = this.deck.cards.shift();
        this.setState({
            playerHand: [card1, card3],
            dealerHand: [card2,card4]
        })
    };

    render(){
        return(
            <div className="the-table col-sm-12">
                <PokerHand cards={this.state.playerHand}/>
                <PokerHand cards={this.state.communityHand} />
                <PokerHand cards={this.state.dealerHand}/>
                <button onClick={this.prepDeck} className='btn btn-primary'>Start</button>
            </div>
        )
    }
}

export default PokerTable;