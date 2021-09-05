import { useState } from 'react';
import { actions } from '../actions';
import './GameSetup.css'
import { sendGameStartEvent } from '../firebase'

function GameSetup({ dispatch }) {

  const [centerLetterInput, setCenterLetterInput] = useState("")
  const [outerLetterInput, setOuterLetterInput] = useState("")

  return (
    <div className="inputs-container">

      <div style={{ textAlign: "center" }}>
        <div className="bee-icon">🐝</div>
        <div className="setup-title">Spelling Bee</div>
      </div>

      <div>
        <input
          className="game-setup-input"
          placeholder="Center Letter"
          autoFocus
          value={centerLetterInput}
          onChange={event => {
            const text = event.target.value?.charAt(0).toLocaleUpperCase()
            if (text?.match(/[A-Z]/i) || text === "") {
              setCenterLetterInput(text)
            }
          }} />

        <input
          className="game-setup-input"
          placeholder="Outer Letters"
          value={outerLetterInput}
          onChange={event => setOuterLetterInput(
            [...new Set(
              event.target.value
                .toUpperCase()
                .split("")
                .filter(char => char.match(/[A-Z]/i))
            )].splice(0, 6).join("")
          )}
        />

        <button
          className="pill-button game-setup-button"
          disabled={outerLetterInput.length < 6 || centerLetterInput === ""}
          onClick={() => {
            sendGameStartEvent()
            dispatch({
              type: actions.SET_LETTERS,
              payload: {
                innerLetter: centerLetterInput,
                outerLetters: outerLetterInput.split(""),
              }
            })
          }}>Submit</button>
      </div>
    </div>
  )
}

export default GameSetup;