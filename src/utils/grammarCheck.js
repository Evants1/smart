// src/utils/grammarCheck.js
import axios from 'axios';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'; // Make sure this proxy is working

export const checkGrammar = async (text) => {
  try {
    const response = await axios.post(`${CORS_PROXY}https://api.languagetool.org/v2/check`, {
      text: text,
      language: 'en-US',
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    return response.data.matches; // Returns an array of grammar issues
  } catch (error) {
    console.error('Error checking grammar:', error);
    return [];
  }
};
