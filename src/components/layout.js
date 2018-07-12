import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import Header from '../components/Header'

import './layout.css'
import '../components/Header/nav.css'

export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }

        allTaxonomyTermThemes {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title} />
        <Header data={data} pathname={location.pathname} />
        <div> {children} </div>
      </>
    )}
  />
)