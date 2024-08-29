// src/pages/spell-check.js
import React from 'react';
import Seo from "../../components/seo";
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';

import TextToSpeechComponent from '../../components/TextToSpeechComponent'; // Adjust the path based on where you place the component

const TextToSpeech = () => {
  return (
    <Layout>
      <Helmet>

      </Helmet>
        <TextToSpeechComponent />
      </Layout>
      );
  
};

export const Head = () => (
  <Seo
      title="Free Spelling Checker - SEO Helper Tools"
      description="Easily spot and fix spelling mistakes with our free Spelling Checker. Improve your writing accuracy in seconds!"
      keywords="Spelling Checker"
  />
);

export default TextToSpeech;
