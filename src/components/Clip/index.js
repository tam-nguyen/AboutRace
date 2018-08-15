import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  Link,
  SVGArrow,
  FiledUnderLink
} from '../'

import getCards from '../../utils/getCards'

import {
  black,
  white,
  darkWhite,
  whiteShadow,
  backgroundColor,
  red,
} from '../../colors'

const TICKER = 'CLIP'
const gradient = `linear-gradient(to bottom, #D9B0B0 0%, rgba(109,88,88,0.92) 100%)`
const gradient2 = `linear-gradient(to bottom, #2A495C 0%, rgba(29,69,59,0.92) 100%)`

const Container = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const TopContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;

  background: ${gradient};

  @media (min-width: 1025px) { /* desktop */
    background-color: ${ props => props.overlay ? 'rgba(0,0,0,0)' : white };
    background-image: none;
  }

  @media (max-width: 812px) { /* mobile */
    background-color: ${white};
    z-index: 1;
  }
`

const BottomContaniner = styled.div`
  position: relative;

  width: 100%;
  margin-top: -100px;

  padding-top: 60px;

  z-index: 2;

  background-color: ${black};
  background-image: ${gradient2};

  @media (min-width: 1025px) { /* desktop */
    background-color: ${ props => props.overlay ? 'rgba(0,0,0,0)' : white };
    background-image: none;
  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

class Clip extends React.Component {
  render() {
    const {data, overlay} = this.props
    const nodeName = 'nodeClip'

    console.log('Clip', data)

    const background = get(this, `props.data.${nodeName}.relationships.field_main_image.localFile.childImageSharp.original.src`)
    const calloutText = get(this, `props.data.${nodeName}.field_large_callout_text.processed`)
    const copyright = get(this, `props.data.${nodeName}.field_copyright.processed`)

    const title = get(this, `props.data.${nodeName}.title`)

    return (
      <Container>
        <TopContainer overlay={overlay}>
          
        </TopContainer>
        <BottomContaniner overlay={overlay}>
          
        </BottomContaniner>
      </Container>
    )
  }
}

export default Clip
