import React, { useState } from 'react';

const LowerToUpperCaseComponent = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const convertToUpperCase = () => {
    setOutputText(inputText.toUpperCase());
  };

  const clearText = () => {
    setInputText('');   // Clear the input text
    setOutputText('');  // Clear the output text
  };

  return (
    <div>
      <h2>Lower to Upper Case Converter</h2>
      <p>Change Text Case is a simple tool to convert text from lowercase to uppercase and more. Just paste your text and choose the case you need.</p>
      <textarea
        rows="4"
        cols="50"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter or paste lowercase text here"
      />
      <br />
      <button onClick={convertToUpperCase}>Convert to Uppercase</button>
      <button
        onClick={clearText}
        style={{ marginLeft: '10px' }}
        disabled={!inputText && !outputText} // Disable if both input and output are empty
      >
        Clear Results
      </button>
      <h3>Converted Text:</h3>
      <p>{outputText}</p>
    </div>
  );
};

export default LowerToUpperCaseComponent;
