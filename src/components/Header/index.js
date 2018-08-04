import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components';
import getScrollBarWidth from '../../utils/scrollbar-width'
import './burger.css';
import { scaleDown as Menu } from 'react-burger-menu'
import kebabCase from 'lodash/kebabCase'

const TopBar = styled.div`
`

const NavMenu = styled.div`
  width: 200px;
  padding: 30px;
`

const linkStyle = {
  textDecoration: 'none',
}

const activeLinkStyle = {
  ...linkStyle,
}

const ThemeLinkComponent = ({ data, closeMenu }) => (
  <Link className='navItem' onClick={() => closeMenu()} style={{textDecoration:'none', color:'white', display:'block', marginBottom:15}} to={`/themes/${kebabCase(data.name)}`}>
  {data.name}
  </Link>
)

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.closeMenu = this.closeMenu.bind(this)
    this.state = {
      modalOpen: false,
      menuOpen: false
    }
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  closeMenu () {
    this.setState({menuOpen: false})
  }

  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen})
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
    const burgerIcon = require('../../assets/images/burger.svg');
    const crossIcon = require('../../assets/images/close.svg');

    return (
      <div style={{
        display:'flex', 
        justifyContent:'center',
        height: '100vh',
        position: 'fixed',
        top: 0,
        zIndex:99999,
        flexDirection: 'column',
        backgroundColor: '#adc6d2'
      }}>
        <Menu
          customBurgerIcon={ <img src={burgerIcon} /> }
          customCrossIcon={ <img src={crossIcon} /> }
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
          strokeWidth={10}
          borderRadius={12}
        >
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/the-film`)} to="/the-film" exact>
            About the film
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/themes`)} to="/" exact>
            Themes
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/articles`)} to="/articles/" exact>
            Articles
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/interviews`)} to="/interviews/" exact>
            Interviews
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={linkStyle} to="/qa/" exact>
            Q&A
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/clips`)} to="/clips/" exact>
            Clips
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/teaching`)} to="/teaching/" exact>
            Teaching
          </Link>
        </Menu>

        <NavMenu style={{display:'none'}}>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/the-film`)} to="/the-film" exact>
            About the film
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/themes`)} to="/themes/" exact>
            Themes
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/articles`)} to="/articles/" exact>
            Articles
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/interviews`)} to="/interviews/" exact>
            Interviews
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/qa`)} to="/qa/" exact>
            Q&A
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/clips`)} to="/clips/" exact>
            Clips
          </Link>
          <Link className='navItem' onClick={() => this.closeMenu()} style={stylingForPath(`/teaching`)} to="/teaching/" exact>
            Teaching
          </Link>
        </NavMenu>

        <TopBar>
        <div className='logo'>
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
          >
            RACE
            <span className='filmSubtitle'>the power of an illusion</span>
          </Link>
        </div>
        
        </TopBar>
    </div>
    );
  }
}
export default Header


