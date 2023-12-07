import { useEffect, useState } from 'react';
import './App.css'

function Square({ value, squareClick }) {
  // const [value, setValue] = useState()
  // const handleClick = () => {
  //   setValue('O')
  // }
  return (<button className="square" onClick={squareClick}>{value}</button>);
}
function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}

var winner = null
const Board = ({ xIsNext, square, onPlay }) => {
  // console.log(xIsNext, square)
  const [status, setStatus] = useState('Player X can start the game')
  // const [xIsNext, setXisNext] = useState(true)
  // const [square, setSquare] = useState(Array(9).fill(null))
  // const square=square
  if (xIsNext === 'reset') {
    // setStatus('Next player is X')
    winner = null
    xIsNext = true
  }
  const squareClick = (i) => {
    const nextSquares = square.slice();
    if (square[i] === null && winner === null) {
      if (xIsNext) {
        nextSquares[i] = 'X';
        // setXisNext(false)
      } else {
        nextSquares[i] = 'O'
        // setXisNext(true)
      }
      onPlay(nextSquares)
      // setSquare(nextSquares)
      winner = calculateWinner(nextSquares)
      let st
      if (winner) {
        st = 'Winner is ' + winner
      } else {
        st = 'Next player is ' + (xIsNext ? 'O' : 'X')
      }
      setStatus(st)
      console.log(st);

    }

  }

  return (
    <>
      <div className="">
        <div>
          <div className='textCenter'><h5>{status}</h5></div>
          <div className="board-row">
            <Square value={square[0]} squareClick={() => squareClick(0)} />
            <Square value={square[1]} squareClick={() => squareClick(1)} />
            <Square value={square[2]} squareClick={() => squareClick(2)} />

          </div>
          <div className="board-row">
            <Square value={square[3]} squareClick={() => squareClick(3)} />
            <Square value={square[4]} squareClick={() => squareClick(4)} />
            <Square value={square[5]} squareClick={() => squareClick(5)} />

          </div>
          <div className="board-row">
            <Square value={square[6]} squareClick={() => squareClick(6)} />
            <Square value={square[7]} squareClick={() => squareClick(7)} />
            <Square value={square[8]} squareClick={() => squareClick(8)} />

          </div>
        </div>
      </div>


    </>
  );
}
import React from 'react'

function Game() {
  const [xIsNext, setXisNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currentSquares = history[history.length - 1]

  // console.log('current square',currentSquares);
  const handlePlay = (nextSquare) => {
    setHistory([...history, nextSquare])
    setXisNext(!xIsNext)
    console.log('history', history)
  }
  const resetHistory = () => {
    var newSquare = [Array(9).fill(null)]
    // console.log(newSquare)
    setHistory(newSquare)
    setXisNext('reset')
    // setStatus('Player X can start the game')
    // winner = null
  }
  const moves = history.map((square, move) => {
    let description
    const jumpTo=(index)=>{
      console.log(history,'------------')
      // currentSquares=history[index]
      let newHistory=history.slice(0,index+1)
      console.log('newHistory',newHistory)
      setHistory(newHistory)
    }
    if (move > 0) {
      description = 'Go to step #' + move
      return (
        <li key={move}>
          <button onClick={()=>jumpTo(move)}>{description}</button>
        </li>
      )
    }
  })

  return (
    <div className="">
      <div className="wrapper">
        <Board xIsNext={xIsNext} square={currentSquares} onPlay={handlePlay} />
        <div className="game-info">
          {/* <ol><button>Go to game start</button></ol> */}
        <li><button className='reset-btn' onClick={resetHistory} >Reset</button></li>
          <>{moves}</>
        </div>
      </div>
      <div className='wrapper'>
      </div>

    </div>
  )
}

export default Game