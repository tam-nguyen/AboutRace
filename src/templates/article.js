import React from "react"
import styled, { css } from 'styled-components'
import {
  Layout,
  Article
} from '../components'

import { graphql } from 'gatsby'

import {
  white
} from '../colors'

const Container = styled.div`
  background-color: ${white};
  min-height: 100vh;

  overflow: auto;

  height: auto;

  @media (max-width: 812px) { /* mobile */

  }
`

export default ({ data, location }) => <Layout location={location}>
  <Container>
    <Article data={data} />
  </Container>
</Layout>

export const pageQuery = graphql`
  query singleQuery($id: String) {
    nodeArticle(id: { eq: $id }) {
      id
      field_old_article_discl {
        processed
      }
      field_author {
        processed
      }
      field_author_bio {
        processed
      }
      field_copyright {
        processed
      }
      title
      relationships {
        field_belongs_to_subtheme {
          id
          name
          relationships {
            field_belongs_to_theme {
              id
              name
            }
          }
        }
        field_article_related_content {
          __typename
          ... on node__faq {
            ...FAQFragment
          }
          ... on node__clip {
            ...PosterImageClipFragment
          }
          ... on node__article {
            ...ArticleFragment
          }
          ... on node__quickfact {
            ...QuickfactWithRelatedContentFragment
          }
        }
        field_tags {
          name
          relationships {
            backref_field_tags_node_article {
              ...ArticleFragment
            }
            backref_field_tag_node_faq {
              ...FAQFragment
            }
            backref_field_t_node_clip {
              ...PosterImageClipFragment
            }
          }
        }
        field_author_image {
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
        field_main_image {
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
      }
      field_large_callout_text {
        processed
      }
      field_full_version {
        processed
      }
    }
  }
`
