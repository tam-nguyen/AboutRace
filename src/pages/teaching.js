import React from 'react'
import styled from 'styled-components'
import './FAQs.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'


export default ({ data }) => (
   <p style={{margin:30}}>Do we need this page if using 'teaching' sections throughout the site? If so, as a 'summary' page, how should it be structured?</p>
)

// export const query = graphql`
//   query FAQssQuery {
//     allNodeFaq {
//         edges {
//           node {
//             title
//           }
//         }
//       }
//   }
// `
