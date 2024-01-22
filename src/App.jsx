import React, { useEffect, useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [previousTime, setPreviousTime] = useState()
  const [bestTime, setBestTime] = useState()

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer()

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  // function for starting the timer
  function timerBegin() {
    timerStart()
  }
  // function for stopping timer and reset timer
  // also the logic on best time to make sure it's always the shortest time - if current time is shorter than recorded best time, or if the best time is empty, then it will
  // update the best time with that current time
  // also set current time with previous time
  function timerEnd() {
    timerStop()
    timerReset()
    if (bestTime === undefined || time < bestTime) {
      setBestTime(time);
    }
    setPreviousTime(time)
  }

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        openModal={() => setShowModal(true)}
        time = {time}
        previousTime={previousTime}
        bestTime = {bestTime}
        
      />
      <CardGame
        // add onGameStart, onGameEnd props
        cardTexts={cardTexts}
        onGameStart={timerBegin}
        onGameEnd={timerEnd}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

