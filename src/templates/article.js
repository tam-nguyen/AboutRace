import React from "react"
import styled from 'styled-components'
import {
  Layout,
  Article
} from '../components'

import { graphql } from 'gatsby'

import {
  white
} from '../colors'

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

export default ({ data, location }) => <Layout location={location}>
  <Container>
    <Article data={data} />
  </Container>
</Layout>

export const pageQuery = graphql`
  query singleQuery($id: String) {
    nodeArticle(id: { eq: $id }) {
      ...FullArticleFragment
    }
  }
`
