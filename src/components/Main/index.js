import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import {
  white, softblack, smokegrey, fogwhite
} from '../../colors'

const gradient = `linear-gradient(to bottom, rgba(255,255,255,0.66) 0%, rgba(245,238,182,0.92) 100%)`

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

const TopContainer = styled.div`
  position: relative;

  width: 100vw;
  height: 311px;

  &::before {
    position: absolute;
    content: '';

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-size: cover !important;
    background-attachment: fixed;
    background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  }
`
const Slugline = styled.div`
  width: 100%;
  height: 96px;
  background-color: ${smokegrey};
  position: absolute;
  bottom: 0;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: ${fogwhite};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Episodes = styled.div`
  width: 100%;
  height: 700px;
`
const EpisodeOne = styled.div`

`

const EpisodeSynopsis = styled.div`
`



export default ({ data, location }) => {
  const background = get(data, `taxonomyTermThemes.relationships.field_theme_image.localFile.childImageSharp.original.src`)

 const episodeOneSynopsis = get(data, `allNodeSynopsis.edges.node[1].field_episode_synopsis.processed`)

  return (
    <Container>
      <TopContainer background={background}>
      <Slugline>An online companion to the award-winning documentary series</Slugline>
      </TopContainer>
      <Episodes>
        <EpisodeOne>
          <EpisodeSynopsis dangerouslySetInnerHTML={{ __html: episodeOneSynopsis }}/>
        </EpisodeOne>
      </Episodes>
    </Container>
  )
}