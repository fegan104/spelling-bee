import React, { useReducer } from 'react';
import './Gameboard.css'
import Heaxagon from "./Hexagon";
import { actions } from './actions';
import { reducer } from './reducer';

const initState = {
  innerLetter: "D",
  outerLetters: ["A", "B", "C", "E", "F", "G"],
  score: 0,
  submittedWords: [],
  input: []
}

function GameBoard() {

  const [state, dispatch] = useReducer(reducer, initState)
  const { input, outerLetters, innerLetter } = state

  const onHexClicked = (letter) => {
    dispatch({
      type: actions.ADD_LETTER,
      payload: letter
    })
  }

  const renderSpanWithAccent = (spanContent, accentLetter) => {
    return (
      <span>
        {
          spanContent.map(letter => {
            return (letter === accentLetter) ? <span style={{ color: "#f6cb43" }}>{letter}</span> : letter;
          })
        }
      </span>
    );
  }

  return (
    <div>
      <div className="score">
        Score: {state.score}
      </div>

      <div className="input-section">
        {renderSpanWithAccent(input, innerLetter)}
        <span className="blinking-cursor">|</span>
      </div>

      <div className="gameboard">
        <div className="column">
          <Heaxagon key={0} letter={outerLetters[0]} isCenter={false} onClick={onHexClicked} />
          <Heaxagon key={1} letter={outerLetters[1]} isCenter={false} onClick={onHexClicked} />
        </div>

        <div className="column">
          <Heaxagon key={2} letter={outerLetters[2]} isCenter={false} onClick={onHexClicked} />
          <Heaxagon key={3} letter={innerLetter} isCenter={true} onClick={onHexClicked} />
          <Heaxagon key={4} letter={outerLetters[3]} isCenter={false} onClick={onHexClicked} />
        </div>

        <div className="column">
          <Heaxagon key={5} letter={outerLetters[4]} isCenter={false} onClick={onHexClicked} />
          <Heaxagon key={6} letter={outerLetters[5]} isCenter={false} onClick={onHexClicked} />
        </div>
      </div>

      <div className="controls-section">
        <button key={0} className="pill-button" onClick={() => dispatch({ type: actions.DELETE_LETTER })}> Delete </button>
        <button key={1} className="pill-button" onClick={() => dispatch({ type: actions.SHUFFLE })}> Shuffle </button>
        <button key={2} className="pill-button" onClick={() => dispatch({ type: actions.ENTER_WORD , payload: true})}> Enter </button>
      </div>
    </div>
  );
}

export default GameBoard;
