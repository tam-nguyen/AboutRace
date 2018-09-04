import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'

import {
  white, softblack, smokegrey, fogwhite, black
} from '../../colors'
import episodes from '../../utils/episodes-data'
import {
  FiledUnderLink
} from '../index'

const numbers = ['one', 'two', 'three']

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

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const CardContainer = styled(Column)`
  width: 730px;
  

  background-color: ${props => props.color ? props.color : '#FFDDAA'};

  padding-top: 36px;
  padding-bottom: 60px;
  padding-left: 60px;
  padding-right: 60px;
`

const EpisodeNumber = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 14px;
  letter-spacing: 0.12em;

  text-transform: uppercase;

  color: ${black};
`

const EpisodeTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 36px;

  color: ${black};

  margin-top: 15px;
  margin-bottom: 15px;
`

const EpisodeDescription = styled.div`
  font-family: Neuton;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 20px;

  color: ${black};

  margin-bottom: 20px;
`

const Card = props => {
  const {
    // title,
    episodeNumber,
    // field_episode,
    description,
    color,
  } = props.data

  const {
    title,
    field_episode_synopsis,
    field_synopsis_copyright
  } = props.synopsis

  const to = `/episodes/${kebabCase(props.number)}`
  const brief = description.split('</p>')[0].replace('<p>','')
  // const brief = field_episode_synopsis.processed

  return (
    <CardContainer color={color}>
      <EpisodeNumber>Episode {episodeNumber}</EpisodeNumber>
      <EpisodeTitle>{title.trim()}</EpisodeTitle>
      <EpisodeDescription dangerouslySetInnerHTML={{ __html: brief}}/>
      <FiledUnderLink
        style={{paddingLeft: 0}}
        color={black} 
        to={to}
      >
        Explore
      </FiledUnderLink>
    </CardContainer>
  )
}


export default ({ data, location }) => {
  const background = get(data, `taxonomyTermThemes.relationships.field_theme_image.localFile.childImageSharp.original.src`)

 const episodeOneSynopsis = get(data, `allNodeSynopsis.edges.node[1].field_episode_synopsis.processed`)

 const synopsis = data.synopsis.edges.map(edge => edge.node)

  return (
    <Container>
      <TopContainer background={background}>
      <Slugline>An online companion to the award-winning documentary series</Slugline>
      </TopContainer>
      <Row>
            {
              episodes.map( (episode, key) => <Card key={key} data={episode} number={numbers[key]} synopsis={synopsis[key]}/>)
            }
          </Row>
      <Episodes>
        <EpisodeOne>
          <EpisodeSynopsis dangerouslySetInnerHTML={{ __html: episodeOneSynopsis }}/>
        </EpisodeOne>
      </Episodes>
    </Container>
  )
}