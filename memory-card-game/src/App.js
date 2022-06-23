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

const handleCardClick = (index) => {

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
          onClick={handleCardClick}
        />
      );
    })}
  </div>
</div>
)
}

export default App;
