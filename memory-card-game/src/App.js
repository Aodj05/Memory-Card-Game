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

const uniqueElentsArray = [
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


export default App;
