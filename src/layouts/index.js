import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Typekit from 'react-typekit';
import Header from '../components/Header'
import './index.css'
import {Navigation} from '../components/nav.js'
import styled, { css } from 'styled-components'

const Layout = ({ children }) => (
  <div>
    <Helmet
      title="Race: The Power of an Illusion"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth:'100%',
        marginTop:150,
      }}
    >
      {children()}
      {/* <Navigation /> */}
    </div>
    <Typekit kitId="pte4pny" />
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
