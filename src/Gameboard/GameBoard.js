import React, { useEffect, useState } from 'react';
import './Gameboard.css'
import Heaxagon from "../Hexagon/Hexagon";
import { actions } from '../actions';
import { isValidWordAsync } from '../dictionaryDataSource.js'


const ERROR_TIMEOUT = 2_000

function GameBoard({
  innerLetter,
  outerLetters,
  score,
  activeInput,
  previousWords,
  error,
  dispatch
}) {

  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setTimeout(() => dispatch({ type: actions.CLEAR_ERROR }), ERROR_TIMEOUT)
  }, [error, dispatch])

  const onHexClicked = (letter) => {
    dispatch({
      type: actions.ADD_LETTER,
      payload: letter
    })
  }

  const onEnter = async () => {
    console.log(`Submitting ${activeInput.join("")}`)
    const isValid = await isValidWordAsync(activeInput.join(""))
    console.log(`isValid(${activeInput.join("")}) = ${isValid}`)
    dispatch({ type: actions.ENTER_WORD, payload: isValid })
  }

  const renderSpanWithAccent = (spanContent, accentLetter) => {
    return (
      <span>
        {
          spanContent.map((letter, index) => {
            return (letter === accentLetter) ? <span key={index} style={{ color: "#f6cb43" }}>{letter}</span> : letter;
          })
        }
      </span>
    );
  }

  return (
    <div>
      <div className="score">
        Score: {score}
      </div>

      <div className="word-bank">
        <div
          className="word-bank-flex-section"
          style={{
            flexWrap: expanded ? "wrap" : "nowrap"
          }}
        >
          {
            previousWords?.map(word =>
              <div key={word} style={{ margin: "4px", fontSize: "18px" }}>
                {word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()}
              </div>
            )
          }
        </div>

        <span
          id="expand-icon"
          className="material-icons"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "expand_less" : "expand_more"}
        </span>
      </div>

      <div className="error-container" >
        {error ? <div className="error">{error}</div> : <div />}
      </div>

      <div className="input-section">
        {renderSpanWithAccent(activeInput, innerLetter)}
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
        <button key={2} className="pill-button" onClick={onEnter}> Enter </button>
      </div>
    </div>
  );
}

export default GameBoard;
