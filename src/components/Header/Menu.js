import React from 'react'
import { Link } from 'gatsby'
import styled, {keyframes} from 'styled-components';

import {
  white,
} from '../../colors.js'

const Container = styled.div`
  cursor: pointer;

  width: 25px;
  height: 20px;

  position: relative;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;

  position: absolute;

  top: 25px;
  left: 25px;

  display: none;

  @media (max-width: 700px) { /* mobile */
    display: block;
  }
`

const Line = styled.div`
  width: 25px;
  height: 2px;
  background-color: ${white};

  transition: all 0.3s ease-out;
`

const TopLine = styled(Line)`
  transform: rotate(${ props => props.open ? 45 : 0}deg);
  transform-origin: center center;

  position: absolute;
  top: ${ props => props.open ? 50 : 0}%;
`

const MiddleLine = styled(Line)`
  opacity: ${ props => props.open ? 0 : 1 };

  position: absolute;
  top: 50%;
`

const BottomLine = styled(Line)`
  transform: rotate(${ props => props.open ? -45 : 0}deg);
  transform-origin: center center;

  position: absolute;
  top: ${ props => props.open ? 50 : 100}%;
`

class Menu extends React.Component {
  render() {
    const {open} = this.props

    return (
      <Container {...this.props}>
        <TopLine open={open}/>
        <MiddleLine open={open}/>
        <BottomLine open={open}/>
      </Container>
    )
  }
}

export default Menu
