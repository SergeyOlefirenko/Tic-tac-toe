import React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";
import background from '../images/main.png'
import shipPic from '../images/ship.png'
import pirategirlPic from '../images/pirategirl.png'
import { useState } from "react";
function Home() {
  const {setUser1} = useContext(AppContext)
  const {setUser2} = useContext(AppContext)
  const navigate = useNavigate();
  // Get data from localStorage
  let users = ['Computer']
  if(localStorage.getItem('User')){
    users.push(localStorage.getItem('User'))
  }
  // Separate data by coma and put it to array 'user' like elements of new array
      const user = users.map((i) => (
            i.split(',')
          ))
  function next() {
    navigate('/data')
  }
  const card = {
    height: '85vh',
    marginBottom: '2px'
  }

  function submitHandler(e) {
    e.preventDefault();
    if (
      e.target.userSelect1.value == "Select participant" && e.target.userSelect2.value == "Select participant"
    ) {
      alert("Please select participant");
      return;
    }
    if (
      e.target.userSelect1.value == "Select participant" || e.target.userSelect2.value == "Select participant"
    ) {
      alert("Please select next participant");
      return;
    }
    const foundUser1 = e.target.userSelect1.value
    const foundUser2 = e.target.userSelect2.value
    {
      if (foundUser1 && foundUser2) {
        setUser1(foundUser1)
        setUser2(foundUser2)
        navigate('/game')
        // alert("Participant selected "+foundUser);
        console.log(foundUser1);
        console.log(foundUser2);
        return foundUser1 && foundUser2
      }

    }
  }
  return (
    <div className="">
      <div className="card w-96 text-primary-content">
        <div className='plannerstyle' style={{ backgroundImage: `url(${background})` }}>
          <div className="card-body" style={card}>
            <h2 className="card-title"></h2>
            <div className="home-buttons">
              <form className="form" onSubmit={submitHandler}>
                    <select name="userSelect1" className="select w-24">
                      <option disabled selected>Select participant</option> 
                      {/* <option>Computer</option> */}
{/* Pass data to selector */}
                        {user.map((i) => (
                        i.map((j) => (
                          <option>{j}</option>
                          )) 
                      ))}  
                    </select>
                  <div className="user-choice">
                  <button type="submit" className="btn1">
                  <h1>Start</h1>
                </button>
                  </div>
                  <select name="userSelect2" className="select w-24">
                      <option disabled selected>Select participant</option> 
                      {/* <option>Computer</option> */}
{/* Pass data to selector */}
                        {user.map((i) => (
                        i.map((j) => (
                          <option>{j}</option>
                          )) 
                      ))}  
                    </select>
                {/* <div className="choice-form">
                <button onClick={next} className="btn2">
                  <img src={pirategirlPic} alt="" />
                </button>
                </div> */}
              </form>
            </div>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;