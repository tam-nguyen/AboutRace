import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import episodes from '../utils/episodes-data'

import {
  Layout,
  CollectionPage
} from '../components'

import { graphql } from 'gatsby'

import {
  white,
  black
} from '../colors'

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

class Clips extends React.Component {

  render() {
    // const clips = get(this, `props.data.allNodeClip.edges`).map(edge => edge.node)

    console.log(this.props)

    return (
      <Layout location={this.props.location}>
        <Container>
          
        </Container>
      </Layout>
    )
  }
}

export default Clips

export const query = graphql`
  query AboutQuery {
      taxonomy: allTaxonomyTermAboutTheFilmPage {
        edges {
          node {
            id
            field_updated_ep_statement_title {
              processed
            }
            field_updated_ep_statement {
              processed
            }
            field_series_production_credits {
              processed
            }
          }
        }
      }
      
      quotes: allNodeCriticQuote {
        edges {
          node {
            title
            field_critic_quote {
              processed
            }
          }
        }
      }
      
      synopsis: allNodeSynopsis {
        edges {
          node {
            title
            field_episode_synopsis {
              processed
            }
          }
        }
      }
      
      credits: allNodeEpisodeCredits {
        edges {
          node {
            title
            field_episode_credits {
              processed
            }
            field_episode_copy {
              processed
            }
          }
        }
      }
      
      transcript: allNodeTranscript {
        edges {
          node {
            title
            body {
              processed
            }
            field_cop {
              processed
            }
          }
        }
      }
    }
`

