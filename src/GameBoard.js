import React, { useState } from 'react';
import Heaxagon from "./Hexagon";


function GameBoard({ outerLetters, innerLetter }) {

  const [currentInput, updateInput] = useState([]);

  const onHexClicked = (letter) => {
    console.log(letter)
    updateInput([...currentInput, letter])
  }

  return (
    <div>
      <div className="input-section">
        {SpanWithAccent(currentInput, innerLetter)}
        <span className="blinking-cursor ">|</span>
      </div>

      <div className="gameboard">
        <div className="column">
          <Heaxagon letter={outerLetters[0]} isCenter={false} onClick={onHexClicked} />
          <Heaxagon letter={outerLetters[1]} isCenter={false} onClick={onHexClicked} />
        </div>

        <div className="column">
          <Heaxagon letter={outerLetters[2]} isCenter={false} onClick={onHexClicked} />
          <Heaxagon letter={innerLetter} isCenter={true} onClick={onHexClicked} />
          <Heaxagon letter={outerLetters[3]} isCenter={false} onClick={onHexClicked} />
        </div>

        <div className="column">
          <Heaxagon letter={outerLetters[4]} isCenter={false} onClick={onHexClicked} />
          <Heaxagon letter={outerLetters[5]} isCenter={false} onClick={onHexClicked} />
        </div>
      </div>

      <div className="controls-section">
        <button className="pill-button" onClick={() => updateInput(currentInput.slice(0, -1))}> Delete </button>
        <button className="pill-button"> Shuffle </button>
        <button className="pill-button" onClick={() => updateInput([])}> Enter </button>
      </div>
    </div>
  );
}

export default GameBoard;

function SpanWithAccent(spanContent, accentLetter) {
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
