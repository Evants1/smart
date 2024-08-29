import React from 'react';
import UpperToLowerCaseComponent from '../../components/UpperToLowerCaseComponent';
import Layout from '../../components/Layout';
import Seo from "../../components/seo"

const UpperToLowerCase = () => (
  <Layout>
    <main>
      <UpperToLowerCaseComponent />
    </main>
  </Layout>
);
export const Head = () => <Seo title="Change text from upper to lower case | SEO Helper Tools" description="Convert text to lowercase online, simply copy and paste the text into the text area below, or you may type directly into the text area, and then click the convert to lowercase button." canonical="https://seohelpertools.com/text-analysis/upper-to-lower-case/" keywords ="upper and lower case"/>

export default UpperToLowerCase;


