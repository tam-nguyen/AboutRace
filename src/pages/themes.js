import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import {
  Layout,
  ThemeCard
} from "../components"

import gradientColors from '../gradients'

const HomeBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999999;
  height: 100%;
  width:100%;
`

class Index extends React.Component {
  render() {
    const edges = get(this, 'props.data.allTaxonomyTermThemes.edges')

    return (
      <Layout location={this.props.location}>
        <div>
          <HomeBackground />
          {
            edges.map( ({ node }, key) =>
              <ThemeCard key={key} data={node} color={gradientColors[key]}/>
            )
          }
        </div>
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    
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
                  original {
                    width
                    height
                    src
                  }
                  sizes {
                    src
                  }
                  resolutions {
                    height
                    width
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
