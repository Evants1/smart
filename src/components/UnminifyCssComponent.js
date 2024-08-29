import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('css', css);

const UnminifyCssComponent = () => {
  const [inputCss, setInputCss] = useState('');
  const [unminifiedCss, setUnminifiedCss] = useState('');

  const handleInputChange = (e) => {
    setInputCss(e.target.value);
  };

  const unminifyCss = () => {
    const unminified = inputCss
      .replace(/;/g, ';\n')  // Add newlines after each semicolon
      .replace(/}/g, '\n}\n')  // Add newlines before and after each closing brace
      .replace(/{/g, '{\n')  // Add newlines after each opening brace
      .replace(/^\s+/gm, '')  // Remove leading spaces from each line
      .replace(/\n+/g, '\n')  // Replace multiple newlines with a single newline
      .trim();  // Trim the result
    setUnminifiedCss(unminified);
  };

  const clearText = () => {
    setInputCss('');   // Clear the input CSS
    setUnminifiedCss('');  // Clear the unminified CSS
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(unminifiedCss).then(() => {
      alert('Unminified CSS copied to clipboard!');
    });
  };

  return (
    <div>
      <h2>Unminify CSS</h2>
      <textarea
        rows="6"
        cols="50"
        value={inputCss}
        onChange={handleInputChange}
        placeholder="Enter or paste minified CSS here"
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
      <button onClick={unminifyCss} disabled={!inputCss}>
        Unminify CSS
      </button>
      <button
        onClick={clearText}
        style={{ marginLeft: '10px' }}
        disabled={!inputCss && !unminifiedCss}
      >
        Clear Results
      </button>
      <button
        onClick={copyToClipboard}
        style={{ marginLeft: '10px' }}
        disabled={!unminifiedCss}
      >
        Copy Results
      </button>
      <h3>Unminified CSS:</h3>
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
          {unminifiedCss || '// Unminified CSS will appear here'}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default UnminifyCssComponent;
