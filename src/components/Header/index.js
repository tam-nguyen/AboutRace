import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';
import getScrollBarWidth from '../../utils/scrollbar-width'
import './burger.css';
import { scaleDown as Menu } from 'react-burger-menu'

const TopBar = styled.div`
  // height: 120px;
  // position: fixed;
  // top: 0;
  // z-index: 9999999999999999999999999999;
  // width: 100%;
  // background-color: rgba(255, 255, 255, 0.9490196078431372);
`

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
  showSettings (event) {
    event.preventDefault();

  }

  render () {
    const { modalOpen } = this.state
    const { pathname } = this.props
    const stylingForPath = (pathFragment => pathname.indexOf(pathFragment) !== -1 ? activeLinkStyle : linkStyle);
    return (
        <div>
      <Menu right pageWrapId={ "page-wrap" } >
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
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/interviews">Interviews</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
      <TopBar>
      <div className={'logo'}>
        <Link
          to="/"
          style={{
            color: 'rgb(158, 156, 156)',
            opacity: 0.75,
            textDecoration: 'none',
          }}
        >
          RACE
          <span className='filmSubtitle'>the power of an illusion</span>
        </Link>
      </div>


      <div className={'nav'} style={{marginRight: modalOpen ? getScrollBarWidth() : '' }}>
        
      </div>
    </TopBar>
    </div>
    );
  }
}
export default Header