import React from "react"
import styled, { css } from 'styled-components'
import {
  Layout,
  Clip
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
    <Clip data={data} />
  </Container>
</Layout>

export const clipQuery = graphql`
  query clipQuery($id: String) {
    nodeClip(id: { eq: $id }) {
      ...FullClipFragment
    }
  }
`