import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('html', html);

const MinifyHtmlComponent = () => {
  const [inputHtml, setInputHtml] = useState('');
  const [minifiedHtml, setMinifiedHtml] = useState('');

  const handleInputChange = (e) => {
    setInputHtml(e.target.value);
  };

  const minifyHtml = () => {
    const minified = inputHtml
      .replace(/\n/g, '')    // Remove newlines
      .replace(/\s+/g, ' ')  // Replace multiple spaces with a single space
      .trim();               // Remove leading and trailing whitespace
    setMinifiedHtml(minified);
  };

  const clearText = () => {
    setInputHtml('');   // Clear the input HTML
    setMinifiedHtml('');  // Clear the minified HTML
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(minifiedHtml).then(() => {
      alert('Minified HTML copied to clipboard!');
    });
  };

  return (
    <div>
      <h2>Minify HTML</h2>
      <textarea
        rows="6"
        cols="50"
        value={inputHtml}
        onChange={handleInputChange}
        placeholder="Enter or paste HTML here"
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
      <button onClick={minifyHtml} disabled={!inputHtml}>
        Minify HTML
      </button>
      <button
        onClick={clearText}
        style={{ marginLeft: '10px' }}
        disabled={!inputHtml && !minifiedHtml}
      >
        Clear Results
      </button>
      <button
        onClick={copyToClipboard}
        style={{ marginLeft: '10px' }}
        disabled={!minifiedHtml}
      >
        Copy Results
      </button>
      <h3>Minified HTML:</h3>
      <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#2d2d2d' }}>
        <SyntaxHighlighter
          language="html"
          style={vs2015}
          wrapLongLines={true} // Wrap long lines
        >
          {minifiedHtml || '// Minified HTML will appear here'}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default MinifyHtmlComponent;
