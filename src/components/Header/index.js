import React from 'react'
import Link from 'gatsby-link'
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

const Header = () => (
  <div>
    <div className={'logo'}>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: '#999999',
            textDecoration: 'none',
          }}
        >
          RACE
        </Link>
      </h1>
    </div>

    <div className={'nav'}>
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
    </div>
  </div>
)

export default Header
