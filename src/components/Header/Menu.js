import React from 'react'
import { Link } from 'gatsby'
import styled, {keyframes, css} from 'styled-components';

import {
  white,
} from '../../colors.js'

const Container = styled.div`
  cursor: pointer;

  width: ${props => props.width ? props.width : 25 }px;
  height: ${props => props.width ? props.width : 20 }px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;

  position: absolute;

  top: 25px;
  left: 25px;

  display: none;

  @media (max-width: 812px) { /* mobile */
    display: block;
  }
`

const Line = styled.div`
  width: ${props => props.width ? props.width : 25 }px;
  height: 2px;
  background-color: ${props => props.color ? props.color : white};

  transition: all 0.3s ease-out;
`

const TopLine = styled(Line)`
  transform: rotate(${ props => props.open ? 45 : 0}deg);
  transform-origin: center center;

  position: absolute;
  top: ${ props => props.open ? 50 : 0}%;
`

const MiddleLine = styled(Line)`
  display: ${ props => props.open ? 'none' : 'block' };
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
    const {
      open,
      width, 
      color
    } = this.props

    return (
      <Container {...this.props} width={width}>
        <TopLine open={open} width={width} color={color}/>
        <MiddleLine open={open} width={width}/>
        <BottomLine open={open} width={width} color={color}/>
      </Container>
    )
  }
}

export default Menu
