import React from 'react'
import Link from 'gatsby-link'

const linkStyle = {
  textDecoration: 'none',
  color: 'orange',
}

const activeLinkStyle = {
  ...linkStyle,
  textDecoration: 'underline',
}

const Header = () => (
  <div
    style={{
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: '100%',
        padding: '1.45rem 1.0875rem',
      }}
    >
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
      <Link to="/the-film" activeStyle={activeLinkStyle} style={linkStyle} exact>
        The Film
      </Link>{' '}
      /{' '}
      <Link
        to="/articles/"
        activeStyle={activeLinkStyle}
        style={linkStyle}
        exact
      >
        Articles
      </Link>{' '}
      /{' '}
      <Link
        to="/interviews/"
        activeStyle={activeLinkStyle}
        style={linkStyle}
        exact
      >
        Interviews
      </Link>{' '}
      /{' '}
      <Link
        to="/FAQs/"
        activeStyle={activeLinkStyle}
        style={linkStyle}
        exact
      >
        FAQs
      </Link>{' '}
      /{' '}
      <Link
        to="/teaching/"
        activeStyle={activeLinkStyle}
        style={linkStyle}
        exact
      >
        Teaching
      </Link>
    </div>
  </div>
)

export default Header
