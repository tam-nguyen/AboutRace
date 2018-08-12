import React from 'react'
import styled from 'styled-components'

import {
  Link,
  SVGArrow
} from './'

import {
  red,
} from '../colors'

const FiledUnderLinkContainer = styled(Link)`
  display: flex;
  flex-direction: row;

  padding-left: 0;
  padding-right: 10px;

  font-family: Lato;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 0.02em;
  font-weight: 600;
  text-transform: capitalize;

  color: ${props => props.color};

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
    padding-right: 0;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
    padding-right: 0;
  }
`

const FiledUnderLink = ({children, color, to}) => {
  if(!color) color = red;

  return (
    <FiledUnderLinkContainer href={to} color={color}>
      <SVGArrow style={{width: 25, marginRight: 10}} color={color}/>
      {children}
    </FiledUnderLinkContainer>
  )
}

export default FiledUnderLink
