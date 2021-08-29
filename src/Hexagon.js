import './App.css';

function Heaxagon({ letter, isCenter, onClick }) {
  return (
    <div
      className={`hexagon ${isCenter ? "inner" : "outer"}`}
      onClick={() => onClick(letter)}
    >
      {letter}
    </div>
  );
}

export default Heaxagon;