import React from 'react'
import Link from 'gatsby-link'

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

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }
  componentDidMount() {
    window.addEventListener('modal', ({detail: { open }}) => {
      this.setState({ modalOpen: open })
    })
  }

  render() {
    const { modalOpen } = this.state
    const { pathname } = this.props
    const stylingForPath = (pathFragment => pathname.indexOf(pathFragment) !== -1 ? activeLinkStyle : linkStyle);

    return (
      <div>
        <div className={'logo'}>
          <Link
            to="/"
            style={{
              color: '#828282',
              opacity: 0.75,
              textDecoration: 'none',
            }}
          >
            RACE
          </Link>
        </div>


        <div className={'nav'} style={{marginRight: modalOpen ? getScrollBarWidth() : '' }}>
          <Link className={'navItem'} to="/the-film" style={stylingForPath(`/the-film`)} exact>
            The Film
          </Link>
          <Link className={'navItem'} to="/articles/" style={stylingForPath(`/articles`)} exact>
            Articles
          </Link>
          <Link className={'navItem'} to="/interviews/" style={stylingForPath(`/interviews`)} exact>
            Interviews
          </Link>
          <Link className={'navItem'} to="/FAQs/" style={stylingForPath(`/FAQs`)} exact>
            FAQs
          </Link>
          <Link className={'navItem'} to="/clips/" style={linkStyle} exact>
            Clips
          </Link>
          <Link className={'navItem'} to="/teaching/" style={linkStyle} exact>
            Teaching
          </Link>
        </div>
      </div>
    )
  }
}

export default Header
