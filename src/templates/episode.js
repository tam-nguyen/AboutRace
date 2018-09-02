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

  let episode

  switch(number){
    case 'one':
      episode = one
      break
    case 'two':
      episode = two
      break
    case 'three':
      episode = three
      break
    default:
      episode = one
  }

  // console.log(episode)

  return (<Layout location={location}>
    <Container>
      <Episode data={episode} number={number} />
    </Container>
  </Layout>)
}

export const episodeQuery = graphql`
  query episodeQuery {
    episodeOne: taxonomyTermEpisodeOnePage {
      ...EpisodeOneFragment
    }
    episodeTwo: taxonomyTermEpisodeTwoPage {
      ...EpisodeTwoFragment
    }
    episodeThree: taxonomyTermEpisodeThreePage {
      ...EpisodeThreeFragment
    }
  }
`
