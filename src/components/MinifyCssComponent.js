import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('css', css);

const MinifyCssComponent = () => {
  const [inputCss, setInputCss] = useState('');
  const [minifiedCss, setMinifiedCss] = useState('');

  const handleInputChange = (e) => {
    setInputCss(e.target.value);
  };

  const minifyCss = () => {
    const minified = inputCss
      .replace(/\s+/g, ' ')  // Collapse all whitespace
      .replace(/\s*({|}|;|:|,)\s*/g, '$1')  // Remove spaces around specific characters
      .replace(/;\s*}/g, '}');  // Remove unnecessary semicolons before closing braces
    setMinifiedCss(minified.trim());
  };

  const clearText = () => {
    setInputCss('');   // Clear the input CSS
    setMinifiedCss('');  // Clear the minified CSS
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(minifiedCss).then(() => {
      alert('Minified CSS copied to clipboard!');
    });
  };

  return (
    <div>
      <h2>Minify CSS</h2>
      <textarea
        rows="6"
        cols="50"
        value={inputCss}
        onChange={handleInputChange}
        placeholder="Enter or paste CSS here"
        style={{
          width: '100%',
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: '#2d2d2d',
          color: '#f8f8f2',
          border: '1px solid #ccc',
          fontFamily: 'monospace',
        }}
      />
      <br />
      <button onClick={minifyCss} disabled={!inputCss}>
        Minify CSS
      </button>
      <button
        onClick={clearText}
        style={{ marginLeft: '10px' }}
        disabled={!inputCss && !minifiedCss}
      >
        Clear Results
      </button>
      <button
        onClick={copyToClipboard}
        style={{ marginLeft: '10px' }}
        disabled={!minifiedCss}
      >
        Copy Results
      </button>
      <h3>Minified CSS:</h3>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          backgroundColor: '#2d2d2d',
          overflowX: 'auto', // Allow horizontal scrolling for long lines
          whiteSpace: 'pre-wrap', // Preserve formatting of the output
        }}
      >
        <SyntaxHighlighter
          language="css"
          style={vs2015}
          wrapLongLines={true} // Wrap long lines
        >
          {minifiedCss || '// Minified CSS will appear here'}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default MinifyCssComponent;
