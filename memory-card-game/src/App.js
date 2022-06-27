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
    type: 'annoyed',
    image: require(`./images/annoyed.webp`)
  },
    {
    type: "hat",
    image: require(`./images/hat.jpg`)
  },
  {
    type: "point",
    image: require(`./images/point.jpg`)
  },
  {
    type: "shoot",
    image: require(`./images/shoot.png`)
  },
  {
    type: "thumb",
    image: require(`./images/thumb.webp`)
  },
  {
    type: "VaultBoy",
    image: require(`./images/VaultBoy.webp`)
  }
];

//shuffle logic
/*function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}*/

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
    //swap(array, currIndex, randomIndex)
  }
  return array;
}

//logic for 3x4 game board and card deck
export default function App() {
  const [cards, setCards] = useState(
    shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
);
const [openCards, setOpenCards,] = useState([]);
const [clearedCards, setClearedCards] = useState({});
const [ShouldDisableAllCards, setShouldDisableAllCards] = useState(false);
const [moves, setMoves] = useState(0);
const [showModal, setShowModal] = useState(false);
const [bestScore, setBestScore] = useState(
  JSON.parse(localStorage,getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
const timeout = useRef(null);

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
    const highScore = Math.min(moves, bestScore);
    setBestScore(highScore);
    localStorage.setItem("bestScore", highScore);
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
};

const handleCardClick = (index) => {
  //Only a max of 2 items in the array
  if (openCards.length === 1) {
    setOpenCards((prev) => [...prev, index]);
    //Once paired increase the moves
    setMoves((moves) => moves + 1);
    disable();
  } else {
    //Cancel timeout for flipping cards once two are flipped
    clearTimeout(timeout.current);
    setOpenCards([index]);
  }
};

useEffect(() => {
  let timeout = null;
  if (openCards.length === 2) {
    timeout = setTimeout(evaluate, 300);
  }
  return () => {
    clearTimeout(timeout);
  };
}, [openCards]);

useEffect(() => {
  checkCompletion();
}, [clearedCards]);
const checkIsFlipped = (index) => {
  return openCards.includes(index);
};

const checkIsInactive = (card) => {
  return Boolean(clearedCards[cards.type]);
};

const handleRestart = () => {
  setClearedCards({});
  setOpenCards({});
  setShowModal(false);
  setMoves(0);
  setShouldDisableAllCards(false);
  //set shuffled deck
  setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)));
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
  <footer>
    <div className="score">
      <div className="moves">
        <span className="bold">Moves:</span> {bestScore}
      </div>
      {localStorage.getItem("bestScore") && (
        <div> className="high-score">
          <span className="bold">Best Score:</span> {bestScore}
        </div>
        )}
      </div>
      <div className="restart">
        <Button onClick={handleRestart} color="primary" variant="contained">
          Restart
        </Button>
      </div>
    </footer>
    <Dialog
      open={showModal}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
      You have Won
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        It took you {moves} to finish. Best score is {" "}
        {bestScore} moves.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleRestart} color="primary">
        Restart
      </Button>
    </DialogActions>
  </Dialog>
</div>
);
}
