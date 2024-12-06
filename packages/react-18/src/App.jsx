import { useEffect, useRef, useState } from "react";
import "./App.css";
import "web-components";

function App() {
  const [increment, setIncrement] = useState({ value: 1 });
  const [clickCount, setClickCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const counterRef = useRef(null);

  // switch color scheme
  useEffect(() => {
    const root = document.querySelector(":root");
    isDark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    if (counterRef.current) {
      counterRef.current.increment = increment;
    }
  }, [counterRef, increment]);

  useEffect(() => {
    const node = counterRef.current;
    const addClickCount = () => setClickCount(clickCount + 1);
    if (node) {
      node.addEventListener("IncrementedEvent", addClickCount);
    }
    return () => {
      node.removeEventListener("IncrementedEvent", addClickCount);
    };
  }, [counterRef, clickCount]);

  const props = isDark ? { isDark: true } : {};

  const onThemeChange = () => setIsDark(!isDark);

  return (
    <>
      <div className="controls">
        <div className="container">
          <label>Theme: </label>
          <input type="checkbox" id="dark" checked={isDark} onChange={onThemeChange} />
          <label htmlFor="dark">Dark</label>
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
        <web-counter ref={counterRef} {...props}></web-counter>
      </div>
    </>
  );
}

export default App;
