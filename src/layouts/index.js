import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Typekit from 'react-typekit';
import Header from '../components/Header'
import './index.css'
import {Navigation} from '../components/nav.js'

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
    <div
      style={{
        margin: '0 auto',
        maxWidth:'100%',
        marginTop:130
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