import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('html', html);

const UnminifyHtmlComponent = () => {
  const [inputHtml, setInputHtml] = useState('');
  const [unminifiedHtml, setUnminifiedHtml] = useState('');

  const handleInputChange = (e) => {
    setInputHtml(e.target.value);
  };

  const unminifyHtml = () => {
    const unminified = inputHtml
      .replace(/>\s*</g, '>\n<')  // Add newlines between tags
      .replace(/\s{2,}/g, '  ');  // Preserve spacing within tags
    setUnminifiedHtml(unminified);
  };

  const clearText = () => {
    setInputHtml('');   // Clear the input HTML
    setUnminifiedHtml('');  // Clear the unminified HTML
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(unminifiedHtml).then(() => {
      alert('Unminified HTML copied to clipboard!');
    });
  };

  return (
    <div>
      <h2>Unminify HTML</h2>
      <textarea
        rows="6"
        cols="50"
        value={inputHtml}
        onChange={handleInputChange}
        placeholder="Enter or paste minified HTML here"
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
      <button onClick={unminifyHtml} disabled={!inputHtml}>
        Unminify HTML
      </button>
      <button
        onClick={clearText}
        style={{ marginLeft: '10px' }}
        disabled={!inputHtml && !unminifiedHtml}
      >
        Clear Results
      </button>
      <button
        onClick={copyToClipboard}
        style={{ marginLeft: '10px' }}
        disabled={!unminifiedHtml}
      >
        Copy Results
      </button>
      <h3>Unminified HTML:</h3>
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
          language="html"
          style={vs2015}
          wrapLongLines={true} // Wrap long lines
        >
          {unminifiedHtml || '// Unminified HTML will appear here'}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default UnminifyHtmlComponent;
