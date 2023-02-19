import React from "react";
import { useNavigate } from "react-router-dom";
import background from '../images/game.png'
import Board from './Board';
import { useState } from 'react';
import { winCalc } from '../winCalc';
import { AppContext } from "../App";
import { useContext } from "react";



const Game = () => {
  const {user1} = useContext(AppContext)
  const {user2} = useContext(AppContext)
  console.log(user1);
  console.log(user2);
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [xcount, setXCount] = useState(0);
  const [count, setCount] = useState(0);
  const [xscore, setXScore] = useState(localStorage.getItem('XScore'))
  const [score, setScore] = useState(localStorage.getItem('Score'))
  const [drawScore, setDrawScore] = useState(localStorage.getItem('DrawScore'))
  const [draw, setDraw] = useState(false)
  // const [userScore1, setUserScore1] = useState(0)
  // const [userScore2, setUserScore2] = useState(0)
  const winner = winCalc(board)
  // Draw checker
  if (!winner && !board.includes(null)) {
    setDraw(true)
    localStorage.removeItem('Winner');
    localStorage.setItem(user1, 0)
    localStorage.setItem(user2, 0)
    setDrawScore(Number(drawScore))
    localStorage.setItem('DrawScore', drawScore+1)
    setBoard(board)
  }

  //Dynamic score
  // if(localStorage.getItem(user1)>localStorage.getItem(user2)){
  //   setUserScore1(Number(userScore1))
  //   localStorage.setItem(user1, Number(userScore1+1))
  //   localStorage.removeItem('Draw');
  // }
  // else{
  //   setUserScore2(Number(userScore2))
  //   localStorage.setItem(user2, Number(userScore2+1))
  //   localStorage.removeItem('Draw');
  // }

  // WinChecker
  if(winner === 'X'){
    setXCount(xcount + 4.5)
    localStorage.setItem(user1, Math.round(xcount + 4.5)); 
    setXScore(Number(xscore))
    localStorage.setItem('XScore', Number(xscore+1))
    localStorage.removeItem('Draw');
  }
    
  if(winner === '0'){
      setCount(count + 4.5)
      localStorage.setItem(user2, Math.round(count + 4.5));
      setScore(Number(score))
      localStorage.setItem('Score', Number(score+1))
      localStorage.removeItem('Draw');
    }
  const clickHandler = (index) => {
    const copyBoard = [...board]
    // Already clicked or not
    if (copyBoard[index]) {
      return
    }
    copyBoard[index] = xIsNext ? 'X' : '0'
    // Who is next 'x' or '0'?
    // Refresh state
    setBoard(copyBoard)
    setXIsNext(!xIsNext)
    // setCount(count+1)
    
    if (xIsNext) {
      setXCount(xcount + 33.33)
      localStorage.setItem(user1, Math.round(xcount + 33.33));
    }
    if (!xIsNext) {
      setCount(count + 33.33)
      localStorage.setItem(user2, Math.round(count + 33.33));
    }
  }

  const card = {
    height: '85vh',
    marginBottom: '2px'
  }
  const startNewGame = () => {
    return (
      <button className='startBtn' onClick={() => setBoard(Array(9).fill(null))}><p onClick={() => setXCount(0)}><p onClick={() => setCount(0)}><p onClick={() => localStorage.clear()}><p onClick={() => localStorage.clear()}>Clear field</p></p></p></p></button>
    )
  }
  return (
    <div className="">
      <div className="card w-96 text-primary-content">
        <div className='plannerstyle' style={{ backgroundImage: `url(${background})` }}>
          <div className="card-body" style={card}>
            <h2 className="card-title"></h2>
            <div className='wrapper'>
              {startNewGame()}
              <Board squares={board} click={clickHandler} />
              <p className='gameInfo'>{winner || draw ? 
              (winner ? localStorage.setItem("Winner" , winner): localStorage.setItem("Draw" , draw )) +
              'Winner: ' + navigate('/data') : 
              'Next step: ' + (xIsNext ? 'X ' + user1 : '0 ' + user2)}
              </p>
            </div>
            <div className="card-actions justify-end"></div>
            <div className="result1">
              <p className='gameInfo'>{user1+': ' + localStorage.getItem('XScore')+' won'}</p>
            </div>
            <div className="result2">
              <p className='gameInfo'>{user2+': ' + localStorage.getItem('Score')+' won'}</p>
            </div>
            <div className="result3">
              <p className='gameInfo'>{'Draw: ' + localStorage.getItem('DrawScore')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;












