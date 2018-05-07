import React from 'react'
import styled from 'styled-components'
import './FAQs.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'


export default ({ data }) => (
    <div style={{margin:30}}>
        <h1>About the film</h1>
        <p>Made in 2004, has become the most widely taught documentary on any subject, etc.</p>
        <h2>The Power of an Illusion?</h2>
        <p>Larry blurb about the essential point of the film</p>
        <h2>Buy on DVD</h2>
        <h3>Get in touch</h3>
        <h1>Episode One: The Difference Between Us</h1>
            <h4>Transcript</h4>
            <h4>Clips</h4>
        <h1>Episode Two: The Story We Tell</h1>
            <h4>Transcript</h4>
            <h4>Clips</h4>
        <h1>Episode Three: The House We Live In</h1>
            <h4>Transcript</h4>
            <h4>Clips</h4>
    </div>
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
