import './App.css';
import GameBoard from './GameBoard';

function App() {
  return (
    <div className="App">
      <GameBoard
        innerLetter="D"
        outerLetters={["A", "B", "C", "E", "F", "G"]}
      />
    </div>
  );
}

export default App;
