import React from 'react'
import styled from 'styled-components'

import {orange} from '../../colors'

const OrangeButton = styled.div`
  cursor: pointer;
  background-color: ${orange};
  width: 146px;
  height: 42px;
  padding: 10px;
  
  color: white;
  font-family: Lato;
  line-height: 30px;
  border-radius: 3px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 10px;
`

export default OrangeButton;
