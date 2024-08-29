import React, { useState, useEffect } from 'react';
import Typo from 'typo-js';
import { Link } from "gatsby";
import { Helmet } from 'react-helmet';

const GrammarCheckerComponent = () => {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const [typo, setTypo] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Grammar Checker 2024",
    "description": "Use the free grammar checker from SEO Helper Tools to review your text for grammar, spelling, and punctuation errors. SEO Helper Tools makes editing easy by helping you fix mistakes and polish your writing, so your ideas stand out.",
    "url": "https://seohelpertools.com/text-analysis/grammar-checker/",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Free Grammar Checker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Free Grammar Checker is a tool from SEO Helper Tools that allows you to review and correct your text for grammar, spelling, and punctuation errors."
          }
        },
        {
          "@type": "Question",
          "name": "How do I use it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply paste your text into the checker, and it will highlight any grammar, spelling, or punctuation errors, offering suggestions for corrections."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to download anything?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No downloads are required. The Free Grammar Checker is available directly on the SEO Helper Tools website."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use it on my phone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the Free Grammar Checker is mobile-friendly and can be used on your phone."
          }
        }
      ]
    }
  };

  useEffect(() => {
    // Load the Hunspell dictionary
    fetch('/dictionaries/en_US.aff')
      .then((response) => response.text())
      .then((affData) => {
        fetch('/dictionaries/en_US.dic')
          .then((response) => response.text())
          .then((dicData) => {
            const typoInstance = new Typo('en_US', affData, dicData, { platform: 'any' });
            setTypo(typoInstance);
          });
      });
  }, []);

  const handleTextChange = (event) => {
    setContent(event.target.value);
    setErrors([]);
    setValidationMessage('');
  };

  const handleCheckGrammar = () => {
    if (typo) {
      const words = content.split(/\s+/);
      const newErrors = words
        .map((word, index) => ({
          word,
          isCorrect: typo.check(word),
          suggestions: typo.suggest(word),
          position: index,
        }))
        .filter((result) => !result.isCorrect);

      setErrors(newErrors);

      if (newErrors.length === 0) {
        setValidationMessage('No grammar errors found.');
      } else {
        setValidationMessage('');
      }
    }
  };

  const renderContentWithErrors = () => {
    const words = content.split(/\s+/);
    return words.map((word, index) => {
      const error = errors.find((error) => error.position === index);
      if (error) {
        return (
          <span
            key={index}
            style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}
            title={error.suggestions.join(', ') || 'No suggestions available'}
          >
            {word}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      <h1>Free Grammar Checker 2024</h1>
      <p>Use the free grammar checker from <Link to="/">SEO Helper Tools</Link> to review your text for grammar, spelling, and punctuation errors. SEO Helper Tools makes editing easy by helping you fix mistakes and polish your writing, so your ideas stand out.</p>
      <textarea
        value={content}
        onChange={handleTextChange}
        rows="10"
        cols="50"
        style={{ width: '100%', marginBottom: '20px' }}
      />
      <button onClick={handleCheckGrammar} className="btn btn-secondary">Check Grammar</button>
      {validationMessage && <p>{validationMessage}</p>}
      {errors.length > 0 && (
        <div>
          <h2>Grammar Errors:</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{renderContentWithErrors()}</p>
        </div>
      )}

      {/* Related Tools Section */}
      <h2>Related Tools</h2>
      <p>Check out our other tools to boost your productivity! They can help with your writing and editing.</p>
      <div className="row">
        <div className="col-md-3">
          <a href="/text-analysis/words-count/" className="btn btn-primary btn-block">Words Count</a>
        </div>
        <div className="col-md-3">
          <a href="#" className="btn btn-primary btn-block">Plagiarism Checker</a>
        </div>
        <div className="col-md-3">
          <a href="#" className="btn btn-primary btn-block">Readability Analyzer</a>
        </div>
        <div className="col-md-3">
          <Link to="/text-analysis/spell-check/" className="btn btn-primary btn-block">Spell Checker</Link>
        </div>
      </div>

      {/* FAQs Section */}
      <h2>Free Grammar Checker - FAQs</h2>
      <div className="accordion w-100" id="basicAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#basicAccordionCollapseOne"
              aria-expanded="false"
              aria-controls="basicAccordionCollapseOne"
            >
              What is the Free Grammar Checker?
            </button>
          </h2>
          <div
            id="basicAccordionCollapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#basicAccordion"
          >
            <div className="accordion-body">
              It's an online tool that helps you find and fix grammar, spelling, and punctuation mistakes in your writing.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#basicAccordionCollapseTwo"
              aria-expanded="false"
              aria-controls="basicAccordionCollapseTwo"
            >
              How do I use it?
            </button>
          </h2>
          <div
            id="basicAccordionCollapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#basicAccordion"
          >
            <div className="accordion-body">
              Just paste or type your text into the editor and click the "Free Check" button to spot any errors.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#basicAccordionCollapseThree"
              aria-expanded="false"
              aria-controls="basicAccordionCollapseThree"
            >
              Do I need to download anything?
            </button>
          </h2>
          <div
            id="basicAccordionCollapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#basicAccordion"
          >
            <div className="accordion-body">
              No downloads are needed for the basic check. Advanced features may require installing an app or browser extension.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="heading4">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#basicAccordionCollapse4"
              aria-expanded="false"
              aria-controls="basicAccordionCollapse4"
            >
              Can I use it on my phone?
            </button>
          </h2>
          <div
            id="basicAccordionCollapse4"
            className="accordion-collapse collapse"
            aria-labelledby="heading4"
            data-bs-parent="#basicAccordion"
          >
            <div className="accordion-body">
              Yes, it works on most phones through your web browser.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarCheckerComponent;
