import { useEffect, useState } from "react";
import "./App.css";
import "web-components";

function App() {
  const [increment, setIncrement] = useState({ value: 1 });
  const [clickCount, setClickCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // switch color scheme
  useEffect(() => {
    const root = document.querySelector(":root");
    isDark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [isDark]);

  const onThemeChange = () => setIsDark(!isDark);

  return (
    <>
      <div className="controls">
        <div className="container">
          <label>Theme: </label>
          <label>
            <input type="checkbox" checked={isDark} onChange={onThemeChange} />
            Dark
          </label>
        </div>
        <div className="container">
          <label>Increment by: </label>
          <button
            className={increment.value === 1 ? "selected" : ""}
            onClick={() => setIncrement({ value: 1 })}
          >
            Increment by 1
          </button>
          <button
            className={increment.value === 2 ? "selected" : ""}
            onClick={() => setIncrement({ value: 2 })}
          >
            Increment by 2
          </button>
        </div>
        <div className="container">
          <label>Click count: </label>
          <span>{clickCount}</span>
        </div>
      </div>
      <div className="container">
        <label>Web Component Counter:</label>
        <web-counter
          increment={increment}
          isDark={isDark}
          onIncrementedEvent={() => setClickCount(clickCount + 1)}
        ></web-counter>
      </div>
    </>
  );
}

export default App;
