import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {  
      setMode(newMode);
      setHistory(prev => [...prev.slice(0, -1), newMode])
    } else {
      setMode(newMode);
      // setHistory([...history, newMode]) ;
      setHistory(prev => [...prev, newMode]) 
    }
  };

  const back = () => {
    if (history.length !== 0) {
      history.pop() 
      setMode(history[history.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back,
  };
}

export default useVisualMode;