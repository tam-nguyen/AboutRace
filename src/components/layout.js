import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import Header from '../components/Header'
import { backgroundColor } from '../colors';

import './layout.css'
import '../components/Header/nav.css'

const Container = styled.div`
  background-color: ${backgroundColor};
  margin: 0 auto;
`;

export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }

        allTaxonomyTermThemes {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title} />
        <Header data={data} pathname={location.pathname} />
        <Container> {children} </Container>
      </>
    )}
  />
)