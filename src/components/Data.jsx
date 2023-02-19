import React from "react";
import { useNavigate } from "react-router-dom";
import background from '../images/treasuremap.png'
import shipPic from '../images/ship.png'
import pirategirlPic from '../images/pirategirl.png'
import { AppContext } from "../App";
import { useContext } from "react";


const Data = () => {
  const {user1} = useContext(AppContext)
  const {user2} = useContext(AppContext)
    const navigate = useNavigate();
    function previous() {
      navigate('/home')
    }
    function next() {
      navigate('/result')
    }
    const card = {
      height: '85vh',
      marginBottom: '2px'
    }
    return (
      <div className="">
      <div className="card w-96 text-primary-content">
        <div className='plannerstyle' style={{ backgroundImage: `url(${background})` }}>
        <div className="card-body" style={card}>
          <h2 className="card-title"></h2>
          <div className='showResult'>
          <p className='gameResult'>{localStorage.getItem('Winner') ? 'Winner: ' + localStorage.getItem('Winner') : 'Draw'}</p> 
        </div> 
          <div className="buttons">  
          <button onClick={previous} className="btn2">
          <img src={shipPic} alt="" />
          </button>
          <div className="res">
          <p className='gameSteps'>Highscore:</p> 
          <div className="res1">
          <p className='gameInfo'>{user1+': '+localStorage.getItem(user1)+ " diamond's"}</p> 
          </div>
          <div className="res2">
          <p className='gameInfo'>{user2+': '+localStorage.getItem(user2)+ " diamond's"}</p> 
          </div>
          </div>
          <button onClick={next} className="btn2">
          <img src={pirategirlPic} alt="" /> 
          </button>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
}

export default Data;

