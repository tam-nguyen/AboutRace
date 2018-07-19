import React from "react"
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
  
import Link from '../Link'
import Card from '../Card'

import PlayablePoster from './PlayablePoster'
import Overlay from './Overlay'
import OrangeButton from './OrangeButton'

const Caption = styled.div`
  font-family: 'Lato';
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding:30px;
`

export class ClipCard extends React.Component {
  render() {
    const { clip = { relationships: {} } } = this.props
    const link = `/clips/${kebabCase(clip.title)}`;

    const overlay = <Overlay>
      <PlayablePoster clip={clip} />
      <Caption>{clip.title}</Caption>
    </Overlay>

    return (
      <Card
        title={clip.title}
        type="Clip" 
        slug="clip" 
        changed={clip.changed} 
        link={link}
        overlay={ overlay }
      >
        <PlayablePoster clip={clip} />
        <Caption>{clip.title}</Caption>
      </Card>
    )
  }
}

export default ClipCard;
