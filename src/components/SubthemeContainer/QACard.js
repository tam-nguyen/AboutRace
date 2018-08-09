import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import Card from '../card'
import SVGArrow from '../SVGArrow'

import {
  qaColor,
  backgroundColor,
  red
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${qaColor};
  color: ${backgroundColor};

  padding-left: 15px;
  padding-right: 15px;

  &::before {
    content: '?';
    position: absolute;
    top: 65px;
    right: 38px;

    font-family: 'Tisa Pro';
    font-size: 400px;

    opacity: 0.06;
  }
`

const Title = styled.div`
  font-family: Lato;
  font-size: 12pt;
  line-height: 30px;
  letter-spacing: 0.022em;
`

const Question = styled.div`
  font-family: 'Tisa Pro';
  font-size: 36pt;
  line-height: 42px;
`

const ArrowContainer = styled.div`
  position: absolute;

  bottom: 15px;
  right: 17px;

  width: 25px;
  height: 20px;
`

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

export class QACard extends React.Component {
  render() {
    const {  qa = {} } = this.props;
    const link = `/qa/${kebabCase(qa.title)}`;

    return (
      <Container
        slug="qa"
        changed={qa.changed}
        type="qa" 
        link={link}
      >
        <Title>Q&A</Title>
        <Question>{qa.title}</Question>
        <Arrow />
      </Container>
    )
  }
}

export default QACard;
