import React from 'react'
import styled from 'styled-components'



const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  overflow: hidden;

  will-change: transform;

  &::before {
    content: '';
    position: absolute;

    z-index: -1;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    width: 100vw;
    height: 100vh;

    background-image: ${props => props.gradient ? props.gradient : null};
    will-change: transform;
    filter: blur(7px);
    filter: opacity(89%);
  }
`



export default Overlay;
