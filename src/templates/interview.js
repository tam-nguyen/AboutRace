import React from "react"
import styled, { css } from 'styled-components'
import {
  Layout,
  Interview
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
    <Interview data={data} />
  </Container>
</Layout>

export const interviewsQuery = graphql`
  query interviewQuery($id: String) {
    nodeInterview(id: { eq: $id }) {
      ...FullInterviewFragment
    }
  }
`
