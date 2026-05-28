import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      if (mode === 'focus') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  return (
    <div className={`app-wrapper ${mode}`}>
      <div className="glass-card">
        <h1 className="title">Focus Vibe.</h1>
        
        <div className="mode-selector">
          <button 
            className={mode === 'focus' ? 'active' : ''} 
            onClick={() => switchMode('focus')}
          >
            Focus
          </button>
          <button 
            className={mode === 'break' ? 'active' : ''} 
            onClick={() => switchMode('break')}
          >
            Break
          </button>
        </div>

        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>

        <div className="controls">
          <button className="play-btn" onClick={() => setIsActive(!isActive)}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="reset-btn" onClick={() => switchMode(mode)}>
            Reset
          </button>
        </div>

        <p className="quote">
          {mode === 'focus' 
            ? `"Deep work is your superpower."` 
            : `"Take a breath, you earned it."`}
        </p>
      </div>
    </div>
  );
}

export default App;