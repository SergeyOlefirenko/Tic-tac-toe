import React from "react";
import { useNavigate } from "react-router-dom";
import background from '../images/game.png'
import AI from "./AI";
import { useState } from "react";



const AiGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [xcount, setXCount] = useState(0);
  const [count, setCount] = useState(0);
 
  const card = {
    height: '85vh',
    marginBottom: '2px'
  }
  const startNewGame = () => {
    return (
      // <button className='startBtn' onClick={() => setBoard(Array(9).fill(null))}><p onClick={() => setXCount(0)}><p onClick={() => setCount(0)}><p onClick={() => localStorage.clear()}><p onClick={() => localStorage.clear()}>Clear field</p></p></p></p></button>
      <button className='startBtn' onClick={() => setBoard(Array(9).fill(null))}><div onClick={() => setXCount(0)}><div onClick={() => setCount(0)}><div onClick={() => localStorage.clear()}><div onClick={() => localStorage.clear()}>Clear field</div></div></div></div></button>
      )
  }
  return (
      <div className="card w-96 text-primary-content">
        <div className='plannerstyle' style={{ backgroundImage: `url(${background})` }}>
          <div className="card-body" style={card}>
            <h2 className="card-title"></h2>
            <div className='wrapper'>
              {startNewGame()}
              <AI/>
            </div>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
  );
}

export default AiGame;