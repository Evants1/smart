// src/utils/wordCount.js

export const countWords = (text) => {
    if (!text) return 0;
    const wordsArray = text.trim().split(/\s+/);
    return wordsArray.length;
  };
  