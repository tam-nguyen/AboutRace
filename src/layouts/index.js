import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Typekit from 'react-typekit';
import Header from '../components/Header'
import './index.css'
import {Navigation} from '../components/nav.js'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100vh;
`

const Layout = ({ children }) => (
  <Wrapper>
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
  </Wrapper>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
