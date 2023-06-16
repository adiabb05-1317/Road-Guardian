import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval;
  
    if (currentIndex < text.length) {
      interval = setInterval(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);
    }
  
    return () => clearInterval(interval);
  }, [currentIndex, text]);
  

  return <h1 style={{ color: 'white', font: 'revert' }}>{currentText}</h1>;
};

export default function WelcomeMessage() {
  const welcomeText = "Welcome to safeRoute Guardian application!";

  return (
    <div>
      <Typewriter text={welcomeText} />
    </div>
  );
};
