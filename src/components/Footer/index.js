import React from 'react'
import Link from '../Link'
import styled from 'styled-components'

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const MobileRow = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: row;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
  }
`

const Container = styled(Column)`
  justify-content: center;
  align-items: center;

  padding-top: 64px;
  padding-bottom: 64px;
`

const ImageHolder = styled(Column)`
  flex: 1;
  align-items: center;
`

class Footer extends React.Component {
  render() {
    return (
      <Container>
        <Row>a production of:</Row>
        <MobileRow>
          <ImageHolder>1</ImageHolder>
          <ImageHolder>2</ImageHolder>
          <ImageHolder>3</ImageHolder>
        </MobileRow>
        <Row>website legaleze all content in this site reflects the views of its respective authors and in no way should be construed to represent the views of UC Berkeley or California Newsreel except where explicitly cited etc.
Copyright 2018 UC Berkeley.</Row>
      </Container>
    )
  }
}

export default Footer
