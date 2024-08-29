import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlagiarismChecker = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const checkPlagiarism = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.edenai.run/v2/text/keyword_extraction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjE2YWEzODgtODI5Yi00YTdjLWI1NjgtOGVjZDkyYTdjZjc1IiwidHlwZSI6ImFwaV90b2tlbiJ9.WV4ToE5FtcaTx_1f_7T_Cm7iB77nHRXownZOuLwQ7t4`,
        },
        body: JSON.stringify({
          text,
          providers: ["copyleaks"], // Specify your provider here
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Plagiarism Checker</h2>
      <div className="form-group">
        <label htmlFor="textInput" className="form-label">
          Enter Text
        </label>
        <textarea
          className="form-control"
          id="textInput"
          rows="6"
          value={text}
          onChange={handleTextChange}
          placeholder="Paste your text here..."
          style={{
            border: '2px solid #ced4da',
            borderRadius: '.25rem',
            padding: '.5rem',
          }}
        ></textarea>
      </div>
      <div className="mt-4 text-center">
        <button className="btn btn-primary" onClick={checkPlagiarism} disabled={isLoading}>
          {isLoading ? 'Checking...' : 'Check Plagiarism'}
        </button>
      </div>
      {error && (
        <div className="mt-4 alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {result && (
        <div className="mt-4">
          <h4>Plagiarism Report</h4>
          <p><strong>Percentage:</strong> {result.result.copyleaks[0].similarity}%</p>
          <ul className="list-group">
            {result.result.copyleaks[0].sources.map((source, index) => (
              <li key={index} className="list-group-item">
                <strong>Source:</strong> {source.url} <br />
                <strong>Similarity:</strong> {source.similarity}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
