import React from 'react'
import Link from '../Link'
import styled from 'styled-components'

import berkley from './berkley.png'
import cn from './cn.png'
import haas from './haas.png'

import {
  black
} from '../../colors'

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

  margin-top: 40px;
  margin-bottom: 80px;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
  }
`

const Container = styled(Column)`
  justify-content: center;
  align-items: center;
  padding: 64px;


  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  line-height: 28px;
  font-size: 20px;
  text-align: center;

  color: ${black};

`

const ImageHolder = styled(Column)`
  flex: 1;
  align-items: center;
  justify-content: center;
`

class Footer extends React.Component {
  render() {
    return (
      <Container>
        <Row>a production of:</Row>
        <MobileRow>
          <ImageHolder>
            <img src={haas}/>
          </ImageHolder>

          <ImageHolder>
            <img src={cn}/>
          </ImageHolder>

          <ImageHolder>
            <img src={berkley}/>
          </ImageHolder>
        </MobileRow>
        <Row>website legaleze all content in this site reflects the views of its respective authors and in no way should be construed to represent the views of UC Berkeley or California Newsreel except where explicitly cited etc.
Copyright 2018 UC Berkeley.</Row>
      </Container>
    )
  }
}

export default Footer
