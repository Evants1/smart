import React, { useState } from 'react';

const SpeechToTextComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognizer, setRecognizer] = useState(null);
  const [message, setMessage] = useState(''); // State for validation message

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const newRecognizer = new SpeechRecognition();
      newRecognizer.lang = 'en-US';
      newRecognizer.continuous = true;

      newRecognizer.onstart = () => {
        setIsListening(true);
        setMessage('You are now recording. You may stop when done recording.'); // Message for recording started
      };

      newRecognizer.onend = () => {
        setIsListening(false);
        setMessage('Recording stopped. Below is your result:'); // Message for recording stopped
      };

      newRecognizer.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript((prev) => prev + transcriptText);
      };

      newRecognizer.onerror = (event) => {
        console.error(event.error);
      };

      setRecognizer(newRecognizer); // Store the recognizer in state
      newRecognizer.start();
    } else {
      alert('Speech Recognition API not supported in this browser.');
    }
  };

  const stopListening = () => {
    if (recognizer) {
      recognizer.stop();
      setIsListening(false);
      setMessage('Recording stopped. Below is your result:');
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setMessage(''); // Optionally clear the message as well
  };

  return (
    <div>
      <h2>Speech to Text</h2>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <button onClick={clearTranscript} disabled={isListening || !transcript}>
        Clear Results
      </button>
      {message && <p>{message}</p>} {/* Display the message if present */}
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToTextComponent;
