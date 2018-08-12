import React from 'react'
import styled from 'styled-components'

const gradient = `linear-gradient(to bottom, #D9B0B0 0%, rgba(109,88,88,0.92) 100%)`

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

  &::before {
    content: '';
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    width: 100vw;
    height: 100vh;

    background-image: ${gradient};
    filter: blur(7px);
    filter: opacity(89%);
  }
`

export default Overlay;
