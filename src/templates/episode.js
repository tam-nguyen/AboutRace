import React from "react"
import styled from 'styled-components'
import get from 'lodash/get'
import {
  Layout,
  Episode
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
  const number = props.pageContext.title

  const one = get(props, 'data.episodeOne')
  const two = get(props, 'data.episodeTwo')
  const three = get(props, 'data.episodeThree')

  const allClips = get(props, 'data.clips').edges.map( ({node}) => node)

  let episode, clips

  switch(number){
    case 'one':
      episode = one
      clips = allClips.filter( ({field_episode}) => field_episode === 1)
      break
    case 'two':
      episode = two
      clips = allClips.filter( ({field_episode}) => field_episode === 2)
      break
    case 'three':
      episode = three
      clips = allClips.filter( ({field_episode}) => field_episode === 3)
      break
    default:
      episode = one
  }

  // console.log(episode)

  return (<Layout location={location}>
    <Container>
      <Episode data={episode} number={number} clips={clips}/>
    </Container>
  </Layout>)
}

export const episodeQuery = graphql`
  query episodeQuery($index: Int) {
    episodeOne: taxonomyTermEpisodeOnePage {
      ...EpisodeOneFragment
    }
    episodeTwo: taxonomyTermEpisodeTwoPage {
      ...EpisodeTwoFragment
    }
    episodeThree: taxonomyTermEpisodeThreePage {
      ...EpisodeThreeFragment
    }

    clips: allNodeClip(filter: {field_episode: {eq: $index}}) {
      edges{
        node {
          ...ClipFragment
        }
      }
    }
  }
`
