import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Container = styled(Link)`
  cursor: pointer;
  text-decoration: none !important;
  color:inherit;
`

export default props => <Container to={props.href} {...props} />
