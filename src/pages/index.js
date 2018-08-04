import React from 'react'
import { graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import styled from 'styled-components'
import {
  Layout,
  Link,
  Title,
  ThemeCard
} from "../components"

const HomeBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999999;
  height: 100%;
  width:100%;
`

export default ({ data, location }) => (
  <Layout location={location}>
    <div>
      <HomeBackground />
      {
        data.allTaxonomyTermThemes.edges.map( ({ node }, key) =>
          <ThemeCard key={key} data={node} />
        )
      }
    </div>
  </Layout>
)


export const query = graphql`
  query IndexQuery {
    
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
          description {
            processed
          }
          relationships {
            field_theme_image {
              localFile {
                publicURL
                childImageSharp {
                  id
                  grayscale: resize(width: 1000, grayscale: true) {
                    src
                  }
                }
              }
            }
            subthemes: backref_field_belongs_to_theme {
              name
              id
              description {
                value
              }
              relationships {
                contentNodes: backref_field_belongs_to_subtheme {
                  __typename
                  ... on node__article {
                    title
                  }
                  ... on node__faq {
                    title
                  }
                  ... on node__clip {
                    title
                  }
                  ... on node__quickfact {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
    trailerClip:nodeClip(id: { eq:"dda11171-b3eb-44b4-8fa2-06bd24f545b1" } ) {
      ...ClipFragment
    }
  }
`
