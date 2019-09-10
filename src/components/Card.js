import React from 'react';


function Card(props){
    const thisCard =`/cards/${props.card}.png`
    return(
        <div className="col-sm-1 card">
            <img src={thisCard} />
        </div>
    )
}

export default Card;