import React, { useState } from 'react';

const TextToSpeechComponent = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState(''); // State for validation message

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const speakText = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';

      utterance.onstart = () => {
        setMessage('Speaking...'); // Message for speaking started
      };

      utterance.onend = () => {
        setMessage('Finished speaking.'); // Message for speaking stopped
      };

      utterance.onerror = (event) => {
        console.error(event.error);
        setMessage('An error occurred during speech synthesis.'); // Message for errors
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech Synthesis API not supported in this browser.');
    }
  };

  const clearText = () => {
    setText('');
    setMessage(''); // Optionally clear the message as well
  };

  return (
    <div>
      <h2>Text to Speech</h2>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to be spoken"
      />
      <br />
      <button onClick={speakText} disabled={!text}>
        Speak Text
      </button>
      <button
        onClick={clearText}
        style={{ marginLeft: '10px' }}
        disabled={!text}
      >
        Clear Text
      </button>
      {message && <p>{message}</p>} {/* Display the message if present */}
    </div>
  );
};

export default TextToSpeechComponent;
