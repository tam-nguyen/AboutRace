import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import Link from '../Link'
import Card from '../Card'

import Description from './Description'
import Overlay from './Overlay'
import OrangeButton from './OrangeButton'

const Container = styled(Card)`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const InterviewCardPhoto = styled.div`
  height: 192px;
  width: 192px;
  border-radius: 50%;
  background-color: grey;
  margin: 15px auto;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: ${ props => props.background ? `url(${props.background})` : null };
`

const Title = styled.h4`
  margin-top: 15px;
  margin-bottom: 15px; 
  line-height: 1.5;
  textAlign: center;
`

export class InterviewCard extends React.Component {
  
  render() {
    const { interview = {}, i, relatedContent, onOpen } = this.props
    const link = `/interviews/${kebabCase(interview.title)}` 
    const background = interview.relationships.field_interviewee.localFile.publicURL;
    const description = interview.field_key_quote.processed;

    const overlay = <Overlay>
      <Title>{interview.title}</Title>
      <Description>{description}</Description>
      <OrangeButton>Read more</OrangeButton>
    </Overlay>

    return (
      <Container
        type="Interview"
        title={interview.title}
        slug="interview"
        changed={interview.changed}
        onClick={ () => onOpen(link)}
        overlay={ overlay }
      >
        <InterviewCardPhoto background={background} />
        <Title>{interview.title}</Title>
        <Description>{description}</Description>
      </Container>
    )
  }
}

export default InterviewCard;
