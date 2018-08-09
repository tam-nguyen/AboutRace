import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import Description from './Description'
import Card from '../card'
import SVGArrow from '../SVGArrow'

import {
  white,
  clipColors,
  clipRadialColors,
  clipTickerColor
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: linear-gradient(to bottom, ${clipColors[0]} 0%, ${clipColors[1]} 100%);

  color: ${white};

  padding-left: 15px;
  padding-right: 15px;

  z-index: 1;
`

const TopImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: -1;

  width: 100%;
  height: 221px;
  
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
`

const TopBlock = styled.div`
  position: relative;

  width: auto;
  height: 221px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-right: 15px;
  padding-left: 15px;
`

const InnerContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
`

const Author = styled.div`
  font-family: Lato;
  font-size: 12pt;
  line-height: 18px;
  letter-spacing: 0.022em;

  text-transform: uppercase;
`

const Ticker = styled.div`
  position: absolute;

  left: 0;
  bottom: 0;

  font-family: Lato;
  font-weight: 600;
  font-size: 12pt;
  line-height: 30px;
  letter-spacing: 0.022em;

  border-top-right-radius: 3px;
  background-color: ${clipTickerColor};

  padding: 13px;
  text-transform: uppercase;
`

const BottomBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  align-items: flex-end;
  justify-content: flex-end;
`

const PlayButton = styled.div`
  position: relative;

  width: 46px;
  height: 46px;
  border-radius: 23px;
  background-color: rgba(239, 239, 239, 0.76);

  &::after {
    content: '▶';
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-family: Lato;
    font-size: 14px;
    line-height: 14px;
  }
`

const ArrowContainer = styled.div`
  bottom: 15px;
  right: 17px;

  min-width: 25px;
  height: 20px;
`

const TopTicker = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;

  height: 32px;
  padding-left: 15px;
  padding-right: 15px;

  border-radius: 3px;

  text-transform: uppercase;

  font-family: Lato;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.018em;

  background: radial-gradient(${clipRadialColors[0]}, ${clipRadialColors[1]});

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Arrow = () => <ArrowContainer><SVGArrow color={white}/></ArrowContainer>

///

export class ClipCard extends React.Component {
  render() {
    const { clip = { relationships: {} }, onOpen } = this.props
    const link = `/clips/${kebabCase(clip.title)}`
    const description = clip.title
    const background = clip.relationships.field_poster_image.localFile.publicURL
    const fromEpisode = 'from episode 1'

    const {title, uri} = clip.field_external_video_url

    return (
      <Container onClick={ () => onOpen(link)} >
        <TopImage background={background}/>
        <InnerContainer>
          <TopBlock>
            <TopTicker>{fromEpisode}</TopTicker>
            <PlayButton />
            <Ticker>film clip</Ticker>
          </TopBlock>
          <BottomBlock>
            <Description>{description}</Description>
            <Row>
              <Arrow />
            </Row>
          </BottomBlock>
        </InnerContainer>
      </Container>
    )
  }
}

export default ClipCard;
