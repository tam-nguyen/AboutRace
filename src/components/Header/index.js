import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';
import getScrollBarWidth from '../../utils/scrollbar-width'
import './burger.css';
import { scaleDown as Menu } from 'react-burger-menu'
import kebabCase from 'lodash/kebabCase'

const TopBar = styled.div`
  // height: 120px;
  // position: fixed;
  // top: 0;
  // z-index: 9999999999999999999999999999;
  // width: 100%;
  // background-color: rgba(255, 255, 255, 0.9490196078431372);
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
  // color:' #ce2727',
  
}

const ThemeLinkComponent = ({ data, closeMenu }) => (
  <Link className={'navItem'} onClick={() => closeMenu()} style={{textDecoration:'none', color:'white', display:'block', marginBottom:15}} to={`/themes/${kebabCase(data.name)}`}>
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
    return (
        <div style={{
          display:'flex', 
          justifyContent:'center',
          height: '100vh',
          position: 'fixed',
          top: 0,
          zIndex:99999,
          flexDirection: 'column',
          // backgroundColor: 'rgba(41, 41, 41, 0.8196078431372549)',
          // backgroundColor: 'rgba(141, 179, 63, 0.82)',
          // backgroundColor: 'rgba(168, 179, 63, 0.82)',
          // backgroundColor:'rgba(63, 179, 136, 0.66)',
          // backgroundColor:'#6ab297',
          backgroundColor: '#adc6d2'
        }}>
      <Menu customBurgerIcon={ <img src={require('../../assets/images/burger.svg')} /> }
            customCrossIcon={ <img src={require('../../assets/images/close.svg')} /> }
       isOpen={this.state.menuOpen}
       onStateChange={(state) => this.handleStateChange(state)}
       pageWrapId={ "page-wrap" }
       strokeWidth={10}
       borderRadius={12}
       >
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/the-film`)} to="/the-film" exact>
          About the film
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/themes`)} to="/themes/" exact>
          Themes
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/articles`)} to="/articles/" exact>
          Articles
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/interviews`)} to="/interviews/" exact>
          Interviews
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={linkStyle} to="/qa/" exact>
          Q&A
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/clips`)} to="/clips/" exact>
          Clips
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/teaching`)} to="/teaching/" exact>
          Teaching
        </Link>
      </Menu>

      <NavMenu style={{display:'none'}}>
      {/* <h4 className="gold" style={{marginBottom:15}}>Themes from the film:</h4> */}
      
      {/* {data.allTaxonomyTermThemes.edges.map(({ node }) => (
        <ThemeLinkComponent data={node}/>
      ))} */}

      {/* <h4 className="gold" style={{marginTop:60, marginBottom: 15}}>Browse by:</h4> */}
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/the-film`)} to="/the-film" exact>
          About the film
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/themes`)} to="/themes/" exact>
          Themes
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/articles`)} to="/articles/" exact>
          Articles
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/interviews`)} to="/interviews/" exact>
          Interviews
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/FAQs`)} to="/FAQs/" exact>
          Q&A
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/clips`)} to="/clips/" exact>
          Clips
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} style={stylingForPath(`/teaching`)} to="/teaching/" exact>
          Teaching
        </Link>
      </NavMenu>

      <TopBar>
      <div className={'logo'}>
        <Link
          to="/"
          style={{
            // color:'rgb(249, 128, 128)',
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


