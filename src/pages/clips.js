import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import {
  Layout,
  CollectionPage
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


export default ({ data, location }) => {
  const title = "Clips"
  // const description = get(data, 'taxonomyTermInterviewsPage.description.processed')
  const clips = get(data, `allNodeClip.edges`).map(edge => edge.node)
  const description = get(data, 'taxonomyTermClipsPage.description.processed')

  const cards = { clips }

  const props = {
    title,
    description,
    cards
  }

  return (
    <Layout location={location}>
      <Container>
        <CollectionPage {...props}/>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ClipsQuery {
    taxonomyTermClipsPage {
      description {
        processed
      }
    }
    allNodeClip {
		  edges {
		    node {
		      ...FullClipFragment
		    }
		  }
		}
  }
`

