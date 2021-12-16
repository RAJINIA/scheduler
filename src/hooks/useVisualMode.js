import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {  
      setHistory(prev => [...prev.slice(0, -1), newMode])
      return setMode(newMode);
    } else {
      setHistory(prev => [...prev, newMode]) 
      return setMode(newMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, -1)])
      return setMode(history[history.length - 1]);
    }
  };

  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
}

export default useVisualMode;