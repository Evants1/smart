import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', javascript);

const MinifyJsComponent = () => {
  const [inputJs, setInputJs] = useState('');
  const [minifiedJs, setMinifiedJs] = useState('');

  const handleInputChange = (e) => {
    setInputJs(e.target.value);
  };

  const minifyJs = () => {
    const minified = inputJs
      .replace(/\s+/g, ' ')  // Remove all excess whitespace
      .replace(/\s*([{};:,])\s*/g, '$1')  // Remove spaces around curly braces, semicolons, colons, and commas
      .replace(/\/\*.*?\*\/|\/\/.*(?=[\n\r])/g, '')  // Remove comments
      .trim();  // Trim the result
    setMinifiedJs(minified);
  };

  const clearText = () => {
    setInputJs('');   // Clear the input JS
    setMinifiedJs('');  // Clear the minified JS
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(minifiedJs).then(() => {
      alert('Minified JS copied to clipboard!');
    });
  };

  return (
    <div>
      <h2>Minify JS</h2>
      <textarea
        rows="6"
        cols="50"
        value={inputJs}
        onChange={handleInputChange}
        placeholder="Enter or paste JavaScript code here"
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
      <button onClick={minifyJs} disabled={!inputJs}>
        Minify JS
      </button>
      <button
        onClick={clearText}
        style={{ marginLeft: '10px' }}
        disabled={!inputJs && !minifiedJs}
      >
        Clear Results
      </button>
      <button
        onClick={copyToClipboard}
        style={{ marginLeft: '10px' }}
        disabled={!minifiedJs}
      >
        Copy Results
      </button>
      <h3>Minified JS:</h3>
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
          {minifiedJs || '// Minified JS will appear here'}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default MinifyJsComponent;
