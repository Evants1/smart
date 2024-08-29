import React, { useState } from 'react';

const ReverseTextComponent = () => {
  const [inputText, setInputText] = useState('');
  const [reversedText, setReversedText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const reverseText = () => {
    setReversedText(inputText.split('').reverse().join(''));
  };

  const clearText = () => {
    setInputText('');   // Clear the input text
    setReversedText('');  // Clear the reversed text
  };

  return (
    <div>
      <h2>Reverse Text</h2>
      <textarea
        rows="4"
        cols="50"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text here"
      />
      <br />
      <button onClick={reverseText} disabled={!inputText}>
        Reverse Text
      </button>
      <button
        onClick={clearText}
        style={{ marginLeft: '10px' }}
        disabled={!inputText && !reversedText}
      >
        Clear Results
      </button>
      <h3>Reversed Text:</h3>
      <p>{reversedText}</p>
    </div>
  );
};

export default ReverseTextComponent;
