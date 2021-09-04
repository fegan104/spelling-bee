import { useState, useEffect } from 'react';
import './Hexagon.css';

const FADE_CLASS = {
  IN: "fadeIn",
  OUT: "fadeOut"
}

function Heaxagon({ letter, isCenter, onClick }) {
  const [fadeState, setFadeState] = useState("")

  useEffect(() => {
    setFadeState(FADE_CLASS.OUT)
    setTimeout(() => setFadeState(FADE_CLASS.IN), 300)
  }, [letter]);

  return (
    <div
      className={`hexagon ${isCenter ? "inner" : "outer"}`}
      onClick={() => { onClick(letter) }}
    >
      <span className={fadeState}>{letter}</span>
    </div>
  );
}

export default Heaxagon;