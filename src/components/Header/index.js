import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

import getScrollBarWidth from '../../utils/scrollbar-width'

import './nav.css'

const linkStyle = {
  textDecoration: 'none',
  color: '#ff8400',
  paddingBottom: 8
}

const activeLinkStyle = {
  ...linkStyle,
  borderBottom: 'solid 3px #ff8400',
}

const Nav = styled.div`
  position: fixed;
  top: 45px;
  right: 30px;
  z-index: 9999999999;
  opacity: 0.75;
  mix-blend-mode: normal;

  body.modal-open & {
    right: ${30 + getScrollBarWidth()}px;
  }
`

const Header = () => (
  <div>
    <div className={'logo'}>
      <Link
        to="/"
        style={{
          color: 'black',
          textDecoration: 'none',
        }}
      >
        RACE
      </Link>
    </div>

    <Nav>
      <Link className={'navItem'} to="/the-film" activeStyle={activeLinkStyle} style={linkStyle} exact>
        The Film
      </Link>
      <Link className={'navItem'} to="/articles/" activeStyle={activeLinkStyle} style={linkStyle} exact>
        Articles
      </Link>
      <Link className={'navItem'} to="/interviews/" activeStyle={activeLinkStyle} style={linkStyle} exact>
        Interviews
      </Link>
      <Link className={'navItem'} to="/FAQs/" activeStyle={activeLinkStyle} style={linkStyle} exact>
        FAQs
      </Link>
      <Link className={'navItem'} to="/media/" activeStyle={activeLinkStyle} style={linkStyle} exact>
        Media
      </Link>
      <Link className={'navItem'} to="/teaching/" activeStyle={activeLinkStyle} style={linkStyle} exact>
        Teaching
      </Link>
    </Nav>
  </div>
)

export default Header
