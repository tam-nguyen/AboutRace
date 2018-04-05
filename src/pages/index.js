import React from 'react'
import Link from 'gatsby-link'

const IndexPage = (data) => (
  <div>
    <h1> About {data.allNodeArticle.edges.node.title} </h1>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage

export const query = graphql `
  query AboutQuery 
  {allNodeArticle {
  edges {
    node {
      title
      body {
        value
        format
        processed
        summary
      }
    }
  }
}}
`
