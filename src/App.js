import { useReducer } from 'react';
import GameBoard from './Gameboard/GameBoard';
import { reducer } from './reducer';
import GameSetup from './GameSetup/GameSetup';

const initState = {
  innerLetter: "",
  outerLetters: [],
  score: 0,
  submittedWords: [],
  activeInput: [],
  error: ""
}

function App() {

  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <div className="App">
      {
        state.outerLetters.length === 0 ?
          <GameSetup dispatch={dispatch} /> :
          <GameBoard
            innerLetter={state.innerLetter}
            outerLetters={state.outerLetters}
            score={state.score}
            activeInput={state.activeInput}
            previousWords={state.submittedWords}
            error={state.error}
            dispatch={dispatch}
          />
      }

    </div>
  );
}

export default App;
