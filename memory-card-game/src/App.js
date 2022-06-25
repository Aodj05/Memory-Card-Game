import { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from '@materials-ui/core';
import Card from './card';
import './App.css';

const uniqueElementsArray = [
  {
    type: 'Pikachu',
    image: require(`./images/Pikachu.png`)
  },
    {
    type: "ButterFree",
    image: require(`./images/ButterFree.png`)
  },
  {
    type: "Charmander",
    image: require(`./images/Charmander.png`)
  },
  {
    type: "Squirtle",
    image: require(`./images/Squirtle.png`)
  },
  {
    type: "Pidgetto",
    image: require(`./images/Pidgetto.png`)
  },
  {
    type: "Bulbasaur",
    image: require(`./images/Bulbasaur.png`)
  }
];

//shuffle logic
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    swap(array, currIndex, randomIndex)
  }
  return array;
}

//logic for 3x4 game board and card deck
export default function App({ uniqueCardsArray }) {
  const [cards, setCards] = useState(
    () => shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
};

const [openCards, setOpenCards,] = useState([]);
const [clearedCards, setClearedCards] = useState({});
const [moves, setMoves] = useState(0);
const [showModal, setShowModal] = useState(false);
const [bestScore, setBestScore] = useState(
  JSON.parse(localStorage,getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
const timeout = useRef;

const disable = () => {
  setShouldDisableAllCards(true);
};
const enable = () => {
  setShouldDisableAllCards(false);
};

const checkCompletion = () => {
  //Store clearedCards as object
  if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
    setShowModal(true);
  }
};

//check to see if cards match if thet do make inactive
const evaluate = () => {
  const [first, second] = openCards;
  if (cards[first].type === cards[second].type) {
    setClearedCards((prev) => ({...prev, [cards[first].type]: true }));
    setOpenCards([]);
    return;
  }
  //flip the cards after 500ms
  timeout.current = setTimeout(() => {
    setOpenCards([]);
  }, 500);
}

const handleCardClick = (index) => {
  //Only a max of 2 items in the array
  if (openCards.length === 1) {
    setOpenCards((prev) => [...prev, index]);
    //Once paired increase the moves
    setMoves((moves) =? moves + 1);
  } else {
    //Cancel timeout for flipping cards once two are flipped
    clearTimeout(timeout.current);
    setOpenCards([index]);
  }
};

useEffect(() => {
  if (openCards.length === 2) {
    setTimeout(evaluate, 500);
  }
}, [openCards]);

const checkIsFlipped = (index) => {
  return openCards.includes(index);
};

return (
  <div className="App">
    <header>
      <h3>Memory Card Game</h3>
      <div>
        Select two cards that match
      </div>
    </header>
    <div className="container">
      {cards.map((card, index) => {
        return(
        <Card
          key={index}
          card={card}
          index={index}
          isDisabled={shouldDisableAllCards}
          isInactive={checkIsInactive(card)}
          isFlipped={checkIsFlipped(index)}
          onClick={handleCardClick}
        />
      );
    })}
  </div>
</div>
)
}

export default App;
