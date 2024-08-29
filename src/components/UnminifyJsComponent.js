import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', javascript);

const UnminifyJsComponent = () => {
  const [inputJs, setInputJs] = useState('');
  const [unminifiedJs, setUnminifiedJs] = useState('');

  const handleInputChange = (e) => {
    setInputJs(e.target.value);
  };

  const unminifyJs = () => {
    const unminified = inputJs
      .replace(/([{};])\s*/g, '$1\n')  // Add newlines after braces and semicolons
      .replace(/;\n}/g, '}')          // Remove newline before closing brace
      .replace(/\n\s*\n/g, '\n')      // Remove extra newlines
      .trim();                        // Trim leading and trailing whitespace
    setUnminifiedJs(unminified);
  };

  const clearText = () => {
    setInputJs('');   // Clear the input JS
    setUnminifiedJs('');  // Clear the unminified JS
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(unminifiedJs).then(() => {
      alert('Unminified JS copied to clipboard!');
    });
  };

  return (
    <div>
      <h2>Unminify JS</h2>
      <textarea
        rows="6"
        cols="50"
        value={inputJs}
        onChange={handleInputChange}
        placeholder="Enter or paste minified JavaScript code here"
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
      <button onClick={unminifyJs} disabled={!inputJs}>
        Unminify JS
      </button>
      <button
        onClick={clearText}
        style={{ marginLeft: '10px' }}
        disabled={!inputJs && !unminifiedJs}
      >
        Clear Results
      </button>
      <button
        onClick={copyToClipboard}
        style={{ marginLeft: '10px' }}
        disabled={!unminifiedJs}
      >
        Copy Results
      </button>
      <h3>Unminified JS:</h3>
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
          language="javascript"
          style={vs2015}
          wrapLongLines={true} // Wrap long lines
        >
          {unminifiedJs || '// Unminified JS will appear here'}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default UnminifyJsComponent;
