import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import gradientColors from '../gradients'

import Vimeo from 'react-vimeo'
//TODO: refactor assets
import playButton from '../assets/images/PlayButton.png';

import {
  FiledUnderLink,
  Link,
  Layout,
  Main,
  ThemeCard,
  PlayButton
} from '../components'

import {
  black,
  white,
  episodeColors
} from '../colors'

const Container = styled.div`

`

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2231;

  @media (min-width: 1025px) { /* desktop */
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
    justify-content: center;
  }
`

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;

  width: 80vh;
  margin-top: 10px;
  padding: 30px;

  flex: 1 1 auto;

  background-color: ${props => props.color ? props.color : white };

  transition: all 0.5s;

  @media (min-width: 1025px) { /* desktop */
    margin: 1vw;
    width: 400px;
  }

  @media (max-width: 812px) { /* mobile */
    width: 100%;
    margin: 0;
    padding: 20px;
  }

  &:hover {
    transform: translatey(-21px);
    transition: all 0.5s;
  }

`

const EpisodeNumber = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 14px;
  letter-spacing: 0.12em;

  color: ${black};

  text-transform: capitalize;
`

const EpisodeTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 36px;

  color: ${black};
`

const EpisodeDescription = styled.div`
  font-family: Neuton;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 20px;

  color: ${black};
`

const InnerContainer = styled.div`
  @media (max-width: 812px) { /* mobile */
    margin: 20px;
  }
`

const Card = props => {
  const title = get(props, 'card.title.processed')
  const number = get(props, 'number')
  const description = get(props, 'card.synopsis.processed').split('</p>')[0].replace('<p>','')

  const link = `/episodes/${number}`

  return (
    <CardContainer {...props}>
      <InnerContainer>
        <EpisodeNumber>episode {number}</EpisodeNumber>
        <EpisodeTitle>{title}</EpisodeTitle>
        <EpisodeDescription dangerouslySetInnerHTML={{ __html: description }} />
        <FiledUnderLink
          style={{paddingLeft: 0, marginTop: 50}}
          color={black}
          to={link}
          noLink
        >
          Explore
        </FiledUnderLink>
      </InnerContainer>
    </CardContainer>
  )
}

///

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`

const IMAGE_WIDTH = 682
const IMAGE_HEIGHT = 384

const VimeoContainer = styled.div`
  position: relative;

  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_HEIGHT}px;

  margin-top: 100px;

  @media (max-width: 812px) { /* mobile */
    width: 356px;
    height: 200px;
  }

  background-size:cover;
  background-position: center;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
`

const Under = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  line-height: 28px;
  font-size: 24px;
  text-align: center;
  letter-spacing: 0.03em;

  color: #5A5E61;

  & p {
    margin: 15px;
  }
`

const Summary = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  line-height: 21px;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.03em;

  max-width: 510px;
  padding-bottom: 60px;

  color: #5A5E61;

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const Image = styled.img`
  cursor: pointer;

  width: 53px;
  height: 53px;
  position: absolute;
  bottom: 15px;
  left: 12px;
  
  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
    
  } 
`

const Video = ({videoId, image, under, summary}) => <VideoContainer>
  <VimeoContainer background={image}>
    <Vimeo
      style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
      videoId={videoId}
      playButton={
        <div style={{position: 'relative', width: IMAGE_WIDTH, height: '100%'}}>
          <Image src={playButton} />
        </div>
      }
    />
  </VimeoContainer>
  <Under dangerouslySetInnerHTML={{ __html: under }} />
  <Summary dangerouslySetInnerHTML={{ __html: summary }} />
</VideoContainer>

///

class Index extends Component {
  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }
  
  render() {
    const edges = get(this, 'props.data.allTaxonomyTermThemes.edges').map( ({node}) => node )
    const episodeOne = get(this, 'props.data.episodeOne')
    const episodeTwo = get(this, 'props.data.episodeTwo')
    const episodeThree = get(this, 'props.data.episodeThree')

    const cards = [episodeOne, episodeTwo, episodeThree]
    const numbers = ['one', 'two', 'three']

    const trailerClip = get(this, 'props.data.trailerClip')
    const url = get(trailerClip, 'field_external_video_url.uri')
    const videoId = url ? url.split('/').pop() : ''
    const image = get(trailerClip, 'relationships.field_poster_image.localFile.publicURL')

    const trailerData = get(this, 'props.data.allTaxonomyTermHomePage.edges').map( ({node}) => node )[0]
    // const summary = get(trailerData, 'field_site_summary_tagline.processed')
    const summary = get(trailerClip, 'title')
    const under = get(trailerData, 'field_text_under_john_a_powell_v.processed')

    return (
      <Layout location={this.props.location}>
        <Main data={this.props.data}/>

        <CardsContainer>
          {
            cards.map( (card, key) => <Card
              to={'/episodes/'+numbers[key]}
              key={key}
              card={card}
              number={numbers[key]}
              color={episodeColors[key]}
            />)
          }
        </CardsContainer>

        <Video
          videoId={videoId}
          image={image}
          summary={summary}
          under={under}
        />

        <Container>
          {
            edges.map( (edge, key) =>
              <ThemeCard key={key} data={edge} color={gradientColors[key]}/>
            )
          }
        </Container>
      </Layout>
    )
  }
}

export default Index

export const query = graphql`
  query HomeQuery {

    episodeOne: taxonomyTermEpisodeOnePage {
      ...EpisodeOneFragment
    }
    episodeTwo: taxonomyTermEpisodeTwoPage {
      ...EpisodeTwoFragment
    }
    episodeThree: taxonomyTermEpisodeThreePage {
      ...EpisodeThreeFragment
    }

    allNodeSynopsis {
      edges {
        node {
          title
          field_episode_synopsis {
            processed
          }
          field_synopsis_copyright {
            processed
          }
        }
      }
    }
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

    trailerClip: nodeClip(id: { eq:"72e4ec93-6d32-460e-a7e3-1b958360d330" } ) {
      ...ClipFragment
    }
  
    taxonomyTermThemes(id: { eq: "8661596c-176b-4527-97c4-af0e614da9d8" }) {
      relationships {
        field_theme_image {
          localFile {
            publicURL
            childImageSharp {
              original {
                width
                height
                src
              }
            }
          }
        }
      }
    }

    allTaxonomyTermHomePage {
      edges {
        node {
          field_site_summary_tagline {
            processed
          }
          field_text_under_john_a_powell_v {
            processed
          }
        }
      }
    }

  }
  
`

