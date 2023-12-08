import {  useState } from "react";
import "./App.css";
import Square from "./Square";
import Board from "./Board";
import React from "react";

function Game() {
  //*******************************component GAME
  const [xIsNext, setXisNext] = useState(true);
  const [status, setStatus] = useState(
    xIsNext ? "Next player is -X" : "Next player is -O"
  );
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  const handlePlay = (nextSquare) => {
    setHistory([...history, nextSquare]);
    setXisNext(!xIsNext);
    console.log("history", history);
  };
  const resetHistory = () => {
    //--------------------------Reset game to initial state
    var newSquare = [Array(9).fill(null)];
    setHistory(newSquare);
    setXisNext(true);
    setStatus("Player X can start the game");
  };
  const moves = history.map((square, move) => {
    let description;
    const jumpTo = (index) => {
      //--------------------------Jump to specific previous step
      let newHistory = history.slice(0, index + 1);
      setHistory(newHistory);
      if (index % 2 === 0) {
        setXisNext(true);
        setStatus("Next player is X");
      } else {
        setXisNext(false);
        setStatus("Next player is O");
      }
    };
    if (move > 0) {
      description = "Go to step #" + move;
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  return (
    <div className="">
      <div className="wrapper">
        <h5>{status}</h5>
      </div>
      <div className="wrapper">
        <Board
          xIsNext={xIsNext}
          square={currentSquares}
          onPlay={handlePlay}
          setStatus={setStatus}
        />
        <div className="game-info">
          <li>
            <button className="reset-btn" onClick={resetHistory}>
              Reset
            </button>
          </li>
          {moves}
        </div>
      </div>
      <div className="wrapper"></div>
    </div>
  );
}

export default Game;
