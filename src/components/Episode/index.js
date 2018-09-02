import React from 'react'
import styled, { css } from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  FiledUnderLink,
  Overlay,
  OverlayBody,
  CloseButton,
  TagTitle
} from '../'

import getCards from '../../utils/getCards'

import {
  black,
  white,
  darkWhite,
  whiteShadowTrans,
  red,
  softblack,
  episodeColors
} from '../../colors'

import reorder from '../../utils/reorder'
import shuffle from '../../utils/shuffle'

const range = require('range')

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: ${props => props.color ? props.color : white };

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const MobileRow = styled.div`
  display: flex;
  flex-direction: row;

  padding-top: 150px;
  padding-bottom: 150px;
  padding-left: 25px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 70px;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const SubTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 14px;
  letter-spacing: 0.12em;

  color: ${black};

  text-transform: capitalize;
`

const Title = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;

  color: ${black};
`

const Text = styled.div`
`

const CardsContainer = styled.div`
  display: flex;  
  flex-direction: column; 
  flex-wrap: wrap;

  justify-content: flex-start;
  

  @media (min-width: 1025px) { /* desktop */
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 200px;
  }

  @media (max-width: 812px) { /* mobile */
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;

    min-width: 100vw;
  }
`

class Episode extends React.Component {
  render() {
    const number = get(this, 'props.number')
    const index = ['one', 'two', 'three'].indexOf(number)

    const title = get(this, 'props.data.title.processed')
    const synopsis = get(this, 'props.data.synopsis.processed')

    let allClips = {}

    get(this, 'props.data.relationships.subthemes')
    .map( ({relationships: {clips}}) => {
      if(clips){
        clips
        .filter( ({field_episode}) => field_episode === index + 1)
        .map( clip => allClips[clip.id] = clip)
      }
    })

    const flatClips = Object.keys(allClips).map( key => allClips[key])
    
    const relatedClips = getCards({
      articles: [],
      clips: flatClips,
      faqs: [],
      interviews: [],
    })

    const creditsLink = `/credits/${number}`
    const transcriptLink = `/transcripts/${number}`

    const color = episodeColors[ index ]

    return (
      <Container color={color}>
        <MobileRow>
          <Column style={{flex:1}}>
            <SubTitle>episode {number}:</SubTitle>
            <Title>{title}</Title>
            <Text dangerouslySetInnerHTML={{ __html: synopsis }}/>
          </Column>

          <Column style={{flex:1, paddingLeft: 100}}>
            <SubTitle>EXPLORE:</SubTitle>
            <SubTitle>CLIPS:</SubTitle>

            <CardsContainer>
              { relatedClips }
            </CardsContainer>

            <FiledUnderLink
              style={{paddingLeft: 0}}
              color={black}
              to={creditsLink}
            >
              episode credits
            </FiledUnderLink>
            <FiledUnderLink
              style={{paddingLeft: 0}}
              color={black}
              to={transcriptLink}
            >
              episode transcript
            </FiledUnderLink>
          </Column>
        </MobileRow>
      </Container>
    )
  }
}

export default Episode
