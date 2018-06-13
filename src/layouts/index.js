import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Typekit from 'react-typekit';
import Header from '../components/Header'
import './index.css'
import '../components/Header/nav.css'
import {Navigation} from '../components/nav.js'
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase'


const NavMenu = styled.div`
  width: 360px;
  position: fixed;
  left: 0;
  top: 0;
  color: white;
  background-color: #151515;
  padding: 30px;
  padding-top: 170px;
  height: 100vh;
  border-right: solid thin #fdeacd;
`
const ThemeLinkComponent = ({ data }) => (
  <Link className={'navItem'} style={{textDecoration:'none', color:'white', display:'block'}} to={`/themes/${kebabCase(data.name)}`}>
  {data.name}
  </Link>
)

const TemplateWrapper = ({ children, data, location }) => (
  <div>
    <Helmet
      title="Race: The Power of an Illusion"
      
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header data={data} pathname={location.pathname} />
    <NavMenu>
      {/* <h4 className="gold" style={{marginBottom:15}}>Themes from the film:</h4> */}
      
      {/* {data.allTaxonomyTermThemes.edges.map(({ node }) => (
        <ThemeLinkComponent data={node}/>
      ))} */}

      {/* <h4 className="gold" style={{marginTop:60, marginBottom: 15}}>Browse by:</h4> */}
        <Link className={'navItem'} to="/the-film">
          About the film
        </Link>
        <Link className={'navItem'} to="/articles/">
          Themes
        </Link>
        <Link className={'navItem'} to="/articles/">
          Articles
        </Link>
        <Link className={'navItem'} to="/interviews/">
          Interviews
        </Link>
        <Link className={'navItem'} to="/FAQs/">
          Q&A
        </Link>
        <Link className={'navItem'} to="/clips/">
          Clips
        </Link>

        {/* <h4 className="gold" style={{marginTop:60}}>For teachers</h4> */}
        <Link className={'navItem'} to="/teaching/">
          Teaching
        </Link>
    </NavMenu>
    <div
      style={{
        position: 'absolute',
        left:360,
        width:'calc(100% - 360px)',

      }}
    >
      {children()}
      {/* <Navigation /> */}
    </div>
    <Typekit kitId="pte4pny" />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const ThemesMenuquery = graphql`
  query ThemesMenuQuery {
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
        }
      }
    }
  }`