/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import CookieConsentComponent from './CookieConsentComponent';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollUpButton from "./ScrollUpButton";

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {/* Primary Content Section */}
          <main className="col-md-8">
            {children}
            <CookieConsentComponent />
          </main>
          {/* Sidebar Section */}
          <aside className="col-md-4">
            <div className="p-3 bg-light rounded">
              <h4 className="display-6">Popular Tools</h4>
              <ul className="list-unstyled">
                <li><a href="#">Grammar Checker</a></li>
                <li><a href="#">Spell Checker</a></li>
                <li><a href="#">Punctuation Checker</a></li>
                <li><a href="#">Lower to Upper Case</a></li>
                <li><a href="#">Keywords Research</a></li>
                <li><a href="#">Image Compressor</a></li>
                <li><a href="#">Crop Image</a></li>
              </ul>
            </div>

            <div className="p-3 bg-light rounded">
              <h4 className="display-6">Related Tools</h4>
              <ul className="list-unstyled">
                <li><a href="#">Minify HTML</a></li>
                <li><a href="#">Minify CSS</a></li>
                <li><a href="#">Minify JS</a></li>
                <li><a href="#">Website Scan</a></li>
                <li><a href="#">Internet Speed Test</a></li>

              </ul>
            </div>
            
          </aside>

        </div>
      </div>
      <ScrollUpButton />
      <Footer />
    </>
  )
}

export default Layout
