import React from 'react'
import Link from '../Link'
import styled from 'styled-components'

import Menu from './Menu'

import {
  blackWithOpacity,
  white,
} from '../../colors.js'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 10;

  display: flex;
  flex-direction: row;
  align-items: center;
  
  justify-content: space-around;

  background-color: ${blackWithOpacity(0.83)};

  height: 60px;

  @media (min-width: 1025px) { /* desktop */
    justify-content: flex-end;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;

    height: ${props => props.open ? '75vh' : '70px'};

    padding-top: ${props => props.open ? 64 : 0}px;
    padding-bottom: ${props => props.open ? 120 : 0}px;
  }

  position: fixed;
  top: 0;
  z-index: 99;
  right: 0;
  left: 0;
  transition: all 0.3s ease-out;
`

const Item = styled(Link)`
  text-aligment: center;
  text-decoration: none;

  color: ${white};

  text-transform: uppercase;

  font-family: Lato;
  font-weight: bold;
  font-size: 10pt;
  line-height: 30px;
  letter-spacing: 0;

  margin-right: 0;

  @media (min-width: 1025px) { /* desktop */
    margin-right: 41px;
    font-size: 12px;
    letter-spacing: 0.22em;
    font-weight: 500;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const MobileItem = styled(Item)`
  display: none;

  @media (max-width: 812px) { /* mobile */
    display: block;
    font-size: 15pt;
    letter-spacing: 5px;
  }
`

const pages = [
  { name: 'themes', link: '/' },
  { name: 'articles', link: '/articles' },
  { name: 'interviews', link: '/interviews' },
  { name: 'q&a', link: '/qa' },
  { name: 'clips', link: '/clips' },
  { name: 'teaching', link: '/teaching' },
  { name: 'about', link: '/about' }
]

class Header extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      open: false // mobile only
    };
  }

  render() {
    const {open} = this.state;

    return (
      <Container open={open}>
        <Menu open={open} onClick={ e => this.setState({open: !open})}/>
        {
          pages.map( ({name, link}, index) => <Item href={link} key={index}>{name}</Item>)
        }
        {
          open && pages.map( ({name, link}, index) => <MobileItem to={link} key={index}>{name}</MobileItem>)
        }
      </Container>
    );
  }
}

export default Header
