import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(update, replace = false) {
    if (replace) {
      history.pop();
    }

    setMode(update);
    history.push(update);
  }

  function back(reversion) {
    if (history.length > 1) {
      history.pop();
    }

    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}
