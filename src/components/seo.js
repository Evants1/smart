import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from 'react-helmet';

function Seo({ description, title, keywords, canonical, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaKeywords = keywords || "default,keywords" // Add default keywords if needed
  const defaultTitle = site.siteMetadata?.title
  const canonicalUrl = canonical || `${site.siteMetadata.siteUrl}`

  return (
    <>
      <Helmet>
        <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        {children}
      </Helmet>
    </>
  )
}

export default Seo
