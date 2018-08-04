import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Menu from './Menu'

import {
  black,
  white,
} from '../../colors.js'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  justify-content: space-around;

  background-color: ${black};

  height: 64px;

  @media (min-width: 1025px) { /* desktop */
    justify-content: flex-end;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;

    height: ${props => props.open ? '100vh' : '70px'};

    padding-top: ${props => props.open ? 64 : 0}px;
    padding-bottom: ${props => props.open ? 120 : 0}px;
  }

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
    font-size: 12pt;
    letter-spacing: 5px;
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
          pages.map( ({name, link}, index) => <Item to={link} key={index}>{name}</Item>)
        }
        {
          open && pages.map( ({name, link}, index) => <MobileItem to={link} key={index}>{name}</MobileItem>)
        }
      </Container>
    );
  }
}

export default Header
