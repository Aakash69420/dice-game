import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [dice1, setDice1] = useState(faDiceOne);
  const [dice2, setDice2] = useState(faDiceTwo);
  const [dice3, setDice3] = useState(faDiceThree);
  const [locked1, setLocked1] = useState(false);
  const [locked2, setLocked2] = useState(false);
  const [locked3, setLocked3] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const rollDice = () => {
    if (!locked1) setDice1(getRandomDice());
    if (!locked2) setDice2(getRandomDice());
    if (!locked3) setDice3(getRandomDice());
  };

  const lockDice = (diceNum) => {
    if (diceNum === 1) {
      setLocked1(!locked1);
    } else if (diceNum === 2) {
      setLocked2(!locked2);
    } else if (diceNum === 3) {
      setLocked3(!locked3);
    }
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomDice = () => {
    const randomInt = getRandomInt(1, 7);
    switch (randomInt) {
      case 1:
        return faDiceOne;
      case 2:
        return faDiceTwo;
      case 3:
        return faDiceThree;
      case 4:
        return faDiceFour;
      case 5:
        return faDiceFive;
      case 6:
        return faDiceSix;
      default:
        return faDiceOne;
    }
  };

  const resetDice = () => {
    setLocked1(false);
    setLocked2(false);
    setLocked3(false);
    setDice1(getRandomDice());
    setDice2(getRandomDice());
    setDice3(getRandomDice());
  };

  const isAllLocked = locked1 && locked2 && locked3;
  const isAllSame = dice1 === dice2 && dice2 === dice3;
  const isUnlocked = isAllLocked && isAllSame;

  const toggleRules = () => {
    setShowRules(!showRules);
    document.body.classList.toggle("darken-page");
  };

  return (
    <div className="App">
      <h1>Ludo-like Dice Game</h1>
      <div className="dice-container">
        <div
          className={locked1 ? "dice locked" : "dice"}
          onClick={() => lockDice(1)}
        >
          {locked1 && <span className="lock">&#10004;</span>}
          <FontAwesomeIcon className="icon" icon={dice1} />
        </div>
        <div
          className={locked2 ? "dice locked" : "dice"}
          onClick={() => lockDice(2)}
        >
          {locked2 && <span className="lock">&#10004;</span>}
          <FontAwesomeIcon className="icon" icon={dice2} />
        </div>
        <div
          className={locked3 ? "dice locked" : "dice"}
          onClick={() => lockDice(3)}
        >
          {locked3 && <span className="lock">&#10004;</span>}
          <FontAwesomeIcon className="icon" icon={dice3} />
        </div>
      </div>
      <div className="button-container">
        <button className="roll-button" onClick={rollDice}>
          Roll Dice
        </button>
        <button className="roll-button" onClick={resetDice}>
          Reset
        </button>
        <button className="rules-button" onClick={toggleRules}>
          Rules
        </button>
      </div>
      {isUnlocked && <div className="message">Player Unlocked!</div>}
       {showRules && (
      <div className="card">
        <h2>Game Rules:</h2>
        <p>
          You have 3 dice on the screen, you choose a number for the first dice.
        </p>
        <p>Fix that number for the first dice.</p>
        <p>
          Now in the upcoming 2 more rounds, if you get the same number — you
          fix it- for both other dice’s.
        </p>
        <p>
          The time you get all the three dice fixed with the same number —> you
          can unlock the player.
        </p>
        <button className="close-button" onClick={toggleRules}>
          Close
        </button>
      </div>
    )}
  </div>
);
}

export default App;