import React, { useState } from 'react';
import { Link } from "gatsby";
import { Helmet } from 'react-helmet';

const UpperToLowerCaseComponent = () => {

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does 'uppercase' and 'lowercase' mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uppercase letters are the larger, capital letters like 'A,' 'B,' and 'C.' Lowercase letters are the smaller versions like 'a,' 'b,' and 'c.'"
        }
      },
      {
        "@type": "Question",
        "name": "How do I use the Upper to Lower Case Converter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply copy and paste your text into the text area or type directly into it, then click the 'Convert to Lowercase' button. Your text will automatically change to lowercase."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use the Upper to Lower Case Converter on my phone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can easily use the tool on your mobile device. Just visit our site, and the converter will work just as it does on a desktop."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to download anything to use the converter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you don’t need to download anything. The Upper to Lower Case Converter works directly in your web browser."
        }
      },
      {
        "@type": "Question",
        "name": "Why should I use a case converter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A case converter helps you quickly fix accidental caps lock errors and optimizes your text for readability. It’s especially useful for editing titles and ensuring consistent text formatting."
        }
      }
    ]
  };


  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const convertToLowerCase = () => {
    setInputText(inputText.toLowerCase());
  };

  const clearText = () => {
    setInputText('');   // Clear the input text
  };

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      <h1>Upper to Lower Case Converter in 2024</h1>
      <p>Convert text to lowercase online, simply copy and paste the text into the text area below, or you may type directly into the text area, and then click the convert to lowercase button.</p>
      <textarea
        rows="4"
        cols="50"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter or paste uppercase text here"
      />
      <br />
      <div className="btn-inline">
        <button className="btn btn-primary" onClick={convertToLowerCase}>Convert to Lowercase</button>
        <button
          className="btn btn-secondary"
          onClick={clearText}
          style={{ marginLeft: '10px' }}
          disabled={!inputText} // Disable if input is empty
        >
          Clear Results
        </button>
      </div>
      <h2>Upper to lowercase converter</h2>
      <p>SEO Helper Tools helps you quickly change text to lowercase words. Just paste your text, click a button, and it will handle the rest. It's easy to use if you’re not sure how to change text case in other programs.</p>
      <h2>How to use the online SEO Helper Tools?</h2>
      <p>Accidentally wrote your text in caps lock? No need to rewrite it. Use our tool to quickly convert uppercase to lowercase.</p>
      <ul>
        <li>Copy and paste your text into the box or type directly into the text area.</li>
        <li>Click the 'Convert to Lowercase' button.</li>
        <li>Your text will change to lowercase in the box.</li>
      </ul>
      <h3>Why use a sentence SEO Helper Tools?</h3>
      <p>Use the SEO Helper Tools tool to quickly fix accidental caps lock issues. It can also automatically capitalize words you missed, saving you from retyping. Plus, it's great for optimizing titles by capitalizing each word to boost your click-through rate.</p>

      {/* FAQs Section */}
      <h2>Uppercase to lowercase - FAQs</h2>
      <div className="accordion w-100" id="basicAccordion">
        <div className="accordion-item">
          <h3 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#basicAccordionCollapseOne"
              aria-expanded="false"
              aria-controls="basicAccordionCollapseOne"
            >
              What does "uppercase" and "lowercase" mean?
            </button>
          </h3>
          <div
            id="basicAccordionCollapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#basicAccordion"
          >
            <div className="accordion-body">
              Uppercase letters are the big ones, like "A," "B," and "C." Lowercase letters are the smaller ones, like "a," "b," and "c.".
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
              Can I do this on my phone?
            </button>
          </h2>
          <div
            id="basicAccordionCollapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#basicAccordion"
          >
            <div className="accordion-body">
              Absolutely! Just visit our <Link to="/">site</Link> on your mobile to do the conversion.
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
              Will changing uppercase to lowercase affect numbers or punctuation?
            </button>
          </h2>
          <div
            id="basicAccordionCollapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#basicAccordion"
          >
            <div className="accordion-body">
              No, it only changes the letters. Numbers like "1, 2, 3" and punctuation marks like ".,!?" stay the same.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperToLowerCaseComponent;
