import React, { useState } from 'react';

const LowerToUpperCaseComponent = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const convertToUpperCase = () => {
    setInputText(inputText.toUpperCase());
  };

  const clearText = () => {
    setInputText('');   // Clear the input text
  };

  return (
    <div>
      <h2>Lower to Upper Case Converter</h2>
      <p>
        Change Text Case is a simple tool to convert text from lowercase to uppercase. 
        Just paste or type your text and click the button to convert.
      </p>
      <textarea
        rows="4"
        cols="50"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter or paste lowercase text here"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <div>
        <button 
          onClick={convertToUpperCase} 
          className="btn btn-primary"
        >
          Convert to Uppercase
        </button>
        <button
          onClick={clearText}
          className="btn cls"
          disabled={!inputText} // Disable if the textarea is empty
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default LowerToUpperCaseComponent;
