import React, {Component} from 'react';
import PokerHand from './PokerHand'
import './PokerTable.css';
import Deck from '../utilityClasses/Deck';
import Card from './Card';

class PokerTable extends Component{
    constructor(){
        super();
        this.deck = new Deck();  
        this.deck.create();     
        this.deck.shuffle();    
        console.log(this.deck.cards);
        this.state = {
            playerHand: ['deck','deck'],  
            dealerHand: ['deck','deck'],
            communityHand: ['deck','deck','deck','deck','deck'],
            wager: 0,
            bankroll: 100
        }
    
    }

    checkHandRank = ()=>{
        let playerPlusComm = [...this.state.playerHand,...this.state.communityHand];
        let dealerPlusComm = [...this.state.dealerHand,...this.state.communityHand];
        playerPlusComm = playerPlusComm.map((card)=>{return Card.replace(/10/g, "T").replace(/11/g, "J").replace(/12/g, "Q").replace(/13/g, "K").replace(/1/g, "A")})
        const playerHandRank = window.Hand.solve(playerPlusComm);
        const dealerHandRank = window.Hand.solve(dealerPlusComm);
        console.log(playerHandRank);
        console.log(dealerHandRank);
    }

    // Method mad by me, not a react methoc
    // Will deal the first 4 cards
    // At tthis point this.deck has 48 elements in it, 4 removed
    prepDeck = ()=>{
        this.deck.create();     
        this.deck.shuffle(); 
        const card1 = this.deck.cards.shift();
        const card2 = this.deck.cards.shift();
        const card3 = this.deck.cards.shift();
        const card4 = this.deck.cards.shift();
        // const card5 = this.deck.cards.shift();
        // const card6 = this.deck.cards.shift();
        // const card7 = this.deck.cards.shift();
        // const card8 = this.deck.cards.shift();
        // const card9 = this.deck.cards.shift();
        this.setState({
            playerHand: [card1, card3],
            communityHand: ['deck','deck','deck','deck','deck'],
            dealerHand: [card2,card4]
        })
    };

    bet = (amount)=>{
        const newWager = this.state.wager + amount;
        const newBanroll = this.state.bankroll - amount;
        if(newBanroll >= 0){
            this.setState({
                wager: newWager,
                bankroll: newBanroll
            })
        }else{
            this.setState({
                msg: 'Need more FUND$$, to have more FUN!'
            }, this.clearMsg)
        }
    }

    clearMsg=()=>{
        setTimeout(()=>{
            this.setState({
                msg:""
            })
        },2000)
    }
    // check calls to draw a new community card
    check =()=>{
        let communityNewHand = [...this.state.communityHand];
        if(communityNewHand[0] === 'deck'){
            communityNewHand = [
                this.deck.cards.shift(),
                this.deck.cards.shift(),
                this.deck.cards.shift(),
            ]
        }else{
            communityNewHand.push(this.deck.cards.shift());
        }
        if(communityNewHand.length === 5){
            this.checkHandRank();
        }

        this.setState({
            communityHand: communityNewHand
        });
    }

    render(){
        return(
            <div className="the-table col-sm-12">
                <div className="col-sm-12 text center the-numbers">
                    <div className="col-sm-3 col-sm-offset-3">
                        Current Pot: ${this.state.wager}
                    </div>
                    <div className="col-sm-3">
                        Bankroll: ${this.state.bankroll}
                    </div>
                </div>
                <div className="player-message">
                    {this.state.msg}
                </div>

                <PokerHand cards={this.state.playerHand}/>
                <PokerHand cards={this.state.communityHand} />
                <PokerHand cards={this.state.dealerHand}/>
                <div className="col-sm-12 buttons">
                    <button onClick={this.prepDeck} className='btn btn-primary'>Deal</button>
                    <button onClick={()=>{this.bet(5)}} className='btn btn-success'>Bet 5</button>
                    <button onClick={this.check} className='btn btn-warning'>Check</button>
                    <button onClick={this.prepDeck} className='btn btn-danger'>Fold</button>
                </div>
            </div>
        )
    }
}

export default PokerTable;