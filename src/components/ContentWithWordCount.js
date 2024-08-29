// src/components/ContentWithWordCount.js

import React from 'react';
import { countWords } from '../utils/wordCount';

const ContentWithWordCount = ({ content }) => {
  const wordCount = countWords(content);

  return (
    <div>
      <p className="display-4">Word count: {wordCount}</p>
    </div>
  );
};

export default ContentWithWordCount;
