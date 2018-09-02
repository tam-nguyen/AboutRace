import React from "react"
import styled from 'styled-components'
import {
  Layout,
  Credits
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
    <Credits data={data} />
  </Container>
</Layout>

export const creditQuery = graphql`
  query creditQuery {
    site {
      id
    }
  }
`
