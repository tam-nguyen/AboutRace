import React from "react"
import styled from 'styled-components'
import {
  Layout,
  // Article
} from '../components'

import { graphql } from 'gatsby'

import {
  white
} from '../colors'

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

export default props => {
  const { data, location } = props
  console.log(props)

  return (<Layout location={location}>
    <Container>
      Episode
      {/*<Article data={data} />*/}
    </Container>
  </Layout>)
}

export const episodeQuery = graphql`
  query episodeQuery {
    episode: taxonomyTermEpisodeOnePage {
      id
      title: field_episode_one_title {
        processed
      }
      synopsis: field_episode_one_synopsis {
        processed
      }
      credits: field_episode_one_credits {
        processed
      }
      transcript: field_episode_one_transcript {
        processed
      }
      relationships {
        field_explore_subthemes_related {
          relationships {
            clips: backref_field_belongs_to_subtheme_node_clip {
              id
              title
            }
          }
        }
      }
    }
  }
`
