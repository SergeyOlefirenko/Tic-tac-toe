import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import Board from "./AiBoard";
import { css } from "styled-components";
import { AppContext } from "../App";
import { useContext } from "react";

import {
  PLAYER_X,
  PLAYER_O,
  SQUARE_DIMS,
  DRAW,
  GAME_STATES,
  DIMS,
  GAME_MODES,
  getRandomInt,
  switchPlayer,
  minimax
} from "./AiBoard";


export const border = css`
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border: 2px solid #41403e;
`;
const arr = new Array(DIMS ** 2).fill(null);
const board = new Board();

const TicTacToe = ({ squares = arr }) => {
  const [players, setPlayers] = useState({ human: null, computer: null });
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);
  const [grid, setGrid] = useState(squares);
  const [winner, setWinner] = useState(null);
  const [nextMove, setNextMove] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState(GAME_MODES.medium);
  const { user1 } = useContext(AppContext)
  const { user2 } = useContext(AppContext)


  /**
   * On every move, check if there is a winner. If yes, set game state to over and open result modal
   */
  useEffect(() => {
    const winner = board.getWinner(grid);
    const declareWinner = winner => {
      let winnerStr;
      switch (winner) {
        case PLAYER_X:
          winnerStr = "Player X wins!";
          break;
        case PLAYER_O:
          winnerStr = "Player O wins!";
          break;
        case DRAW:
        default:
          winnerStr = "It's a draw";
      }
      setGameState(GAME_STATES.over);
      setWinner(winnerStr);
      // Slight delay for the modal so there is some time to see the last move
      setTimeout(() => setModalOpen(true), 300);
    };

    if (winner !== null && gameState !== GAME_STATES.over) {
      declareWinner(winner);
    }
  }, [gameState, grid, nextMove]);

  /*
   * Set the grid square with respective player that made the move. Only make a move when the game is in progress.
   * useCallback is necessary to prevent unnecessary recreation of the function, unless gameState changes, since it is
   * being tracked in useEffect
   */
  const move = useCallback(
    (index, player) => {
      if (player && gameState === GAME_STATES.inProgress) {
        setGrid(grid => {
          const gridCopy = grid.concat();
          gridCopy[index] = player;
          return gridCopy;
        });
      }
    },
    [gameState]
  );

  /*
   * Make computer move. If it's the first move (board is empty), make move at any random cell to skip
   * unnecessary minimax calculations
   */
  const computerMove = useCallback(() => {
    // Important to pass a copy of the grid here
    const board = new Board(grid.concat());
    const emptyIndices = board.getEmptySquares(grid);
    let index;
    switch (mode) {
      case GAME_MODES.easy:
        do {
          index = getRandomInt(0, 8);
        } while (!emptyIndices.includes(index));
        break;
      case GAME_MODES.medium:
        // Medium level is basically ~half of the moves are minimax and the other ~half random
        const smartMove = !board.isEmpty(grid) && Math.random() < 0.5;
        if (smartMove) {
          index = minimax(board, players.computer)[1];
        } else {
          do {
            index = getRandomInt(0, 8);
          } while (!emptyIndices.includes(index));
        }
        break;
      case GAME_MODES.difficult:
      default:
        index = board.isEmpty(grid)
          ? getRandomInt(0, 8)
          : minimax(board, players.computer)[1];
    }
    if (!grid[index]) {
      move(index, players.computer);
      setNextMove(players.human);
    }
  }, [move, grid, players, mode]);

  /**
   * Make computer move when it's computer's turn
   */
  useEffect(() => {
    let timeout;
    if (
      nextMove !== null &&
      nextMove === players.computer &&
      gameState !== GAME_STATES.over
    ) {
      // Delay computer moves to make them more natural
      timeout = setTimeout(() => {
        computerMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, computerMove, players.computer, gameState]);

  const humanMove = index => {
    if (!grid[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.computer);
    }
  };

  const choosePlayer = option => {
    setPlayers({ human: option, computer: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
  };

  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(arr);
    setModalOpen(false);
  };

  const changeMode = e => {
    setMode(e.target.value);
  };
  const card = {
    height: '85vh',
    marginBottom: '2px'
  }

  return gameState === GAME_STATES.notStarted ? (
    <div className="screen">
      <div className="inner">
      <div className="inside1">
        <p>Choose play item</p>
        <div className="buttonRow">
          <button className="aiBtn1" onClick={() => choosePlayer(PLAYER_X)}>X</button>
      <div className="inside2">
        <p>Select level</p>
        <select onChange={changeMode} value={mode}>
          {Object.keys(GAME_MODES).map(key => {
            const gameMode = GAME_MODES[key];
            return (
              <option key={gameMode} value={gameMode}>
                {key}
              </option>
            );
          })}
        </select>
      </div>
          <button className="aiBtn2" onClick={() => choosePlayer(PLAYER_O)}>O</button>
        </div>
      </div>
      </div>
    </div>
  ) : (
    <div className="styleContainer" dims={DIMS}>
      {grid.map((value, index) => {
        const isActive = value !== null;

        return (
          <div className="styleSquares"
            data-testid={`square_${index}`}
            key={index}
            onClick={() => humanMove(index)}
          >
            {isActive && <div className="marker">{value === PLAYER_X ? "X" : "O"}</div>}
          </div>
        );
      })}
      <Strikethrough 
        styles={
          gameState === GAME_STATES.over && board.getStrikethroughStyles()
        }
      />
       {/* <div className="strikethrough" 
        styles={
          gameState === GAME_STATES.over && board.getStrikethroughStyles()
        }
      /> */}
      <ResultModal
        isOpen={modalOpen}
        winner={winner}
        close={() => setModalOpen(false)}
        startNewGame={startNewGame}
      />
    </div>
  );
};
// const style ={
//   position: 'absolute',
//   backgroundColor: 'indianred',
//   height: '5px',
//   width: '350px',
//   display: 'block'
// }
const Strikethrough = styled.div`
  position: absolute;
  ${({ styles }) => styles}
  background-color: indianred;
  height: 5px;
  width: ${({ styles }) => !styles && "0px"};
`;

export default TicTacToe;
// Result
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.6)"
   
  }
};

export const ResultModal = ({ isOpen, close, startNewGame, winner }) => {

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={close}
      style={customStyles}
      ariaHideApp={false}
    >
      {/* <Main>
      </Main> */}
      <Footer>
        <FooterInner>
          View the code on{" "}
          <a href='https://github.com/SergeyOlefirenko/Tic-tac-toe'>Github</a>
        </FooterInner>
      </Footer>
      <ModalWrapper>
        <ModalTitle>Game over</ModalTitle>
        <ModalContent>{winner}</ModalContent>

        <ModalFooter>
          <Button onClick={close}>Close</Button>
          <Button onClick={startNewGame}>Start over</Button>
        </ModalFooter>
      </ModalWrapper>
    </StyledModal>
  );
};


// Game over style
const Footer = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 0 0 auto;
`;

const FooterInner = styled.div`
  padding: 16px 0;
`;
const StyledModal = styled(Modal)`
  height: 300px;
  position: relative;
  margin: 0 auto;
  top: 10%;
  right: auto;
  bottom: auto;
  width: 320px;
  outline: none;
  display: flex;
  flex-direction: column;
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: #fff;
  max-height: 100%;
  height: 100%;
  align-items: center;
  backface-visibility: hidden;
  padding: 1.25rem;
  ${border};
`;

// Game over styles

const ModalTitle = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
`;

const ModalContent = styled.p`
  flex: 1 1 auto;
  text-align: center;
`;
// ModalContent.displayName = "ModalContent";

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0 0 auto;
  width: 100%;
`;

const Button = styled.button`
  font-size: 16px;
`;
