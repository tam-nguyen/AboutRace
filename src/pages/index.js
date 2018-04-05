import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1> About  </h1>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage

// export const query = graphql `
//   query AboutQuery 
//   {allNodeArticle {
//   edges {
//     node {
//       title
//       body {
//         value
//         format
//         processed
//         summary
//       }
//     }
//   }
// }}
// `
