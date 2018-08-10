import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import Description from './Description'
import Card from '../Card'
import SVGArrow from '../SVGArrow'

import {
  red,
  white,
  interviewColors,
  interviewTickerColor
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: linear-gradient(to bottom, ${interviewColors[0]} 0%, ${interviewColors[1]} 100%);

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
  background-color: ${interviewTickerColor};

  padding: 13px;
  text-transform: uppercase;
`

const BottomBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;


`

const Bio = styled.div`
  font-family: Lato;
  font-size: 14px;
  line-height: 18px;
`

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  align-items: flex-end;
  justify-content: flex-end;
`

const ArrowContainer = styled.div`
  bottom: 15px;
  right: 17px;

  min-width: 25px;
  height: 20px;
`

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

export class InterviewCard extends React.Component {
  render() {
    const { interview = {}, i, relatedContent, onOpen } = this.props
    
    const link = `/interviews/${kebabCase(interview.title)}` 
    const background = interview.relationships.field_interviewee.localFile.publicURL;
    const description = interview.field_key_quote.processed;

    const bio = interview.field_interviewee_bio ? interview.field_interviewee_bio.processed : null;

    return (
      <Container onClick={ () => onOpen(link)} >
        <TopImage  background={background}/>
        <InnerContainer>
          <TopBlock>
            <Ticker>interview</Ticker>
          </TopBlock>
          <BottomBlock>
            <Description>{description}</Description>
            <Row>
              <Bio dangerouslySetInnerHTML={{ __html: bio }}/>
              <Arrow />
            </Row>
          </BottomBlock>
        </InnerContainer>
      </Container>
    )
  }
}

export default InterviewCard;
