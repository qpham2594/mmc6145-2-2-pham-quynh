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

  function timerBegin() {
    timerStart()
  }

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

