import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components';

import {
  black,
  white,
} from '../../colors.js'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: ${black};

  height: 64px;

  text-transform: uppercase;

  font-family: Lato;
  font-weight: bold;
  font-size: 12pt;
  line-height: 30px;
  letter-spacing: 5px;
`

const Item = styled(Link)`
  text-aligment: center;
  text-decoration: none;

  color: ${white};

  margin-right: 41px;
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
  
    this.state = {};
  }

  render() {
    return (
      <Container>
        {
          pages.map( ({name, link}, index) => <Item to={link} key={index}>{name}</Item>)
        }
      </Container>
    );
  }
}

export default Header
