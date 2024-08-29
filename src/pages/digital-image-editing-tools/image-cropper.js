import React from 'react';
import ImageCropperComponent from '../../components/ImageCropperComponent';
import Layout from '../../components/Layout';
import Seo from "../../components/seo"


const ImageCropper = () => (
  <Layout>
    <main>
      <ImageCropperComponent />
    </main>
  </Layout>
);

export const Head = () => <Seo title="Free Grammar Checker - No Sign-Up Needed | SHT" description="Free Grammar Check! Paste your text and let our advanced AI technology correct grammar, spelling, and punctuation errors quickly and accurately. Improve your writing effortlessly with our easy-to-use tool." canonical="https://seohelpertools.com/text-analysis/grammar-checker/" keywords ="Grammar Checker"/>


export default ImageCropper;
