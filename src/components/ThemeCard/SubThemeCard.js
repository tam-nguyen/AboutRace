import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import { Link } from '../';

import {
  red,
  backgroundColor,
  white,
  darkWhite
} from '../../colors'

const Container = styled(Link)`
  color: white;

  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;

  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${backgroundColor};

  padding: 15px;
`

const Title = styled.div`

  font-family: Lato;
  font-size: 12pt;
  line-height: 39px;
  font-weight: 600;

  letter-spacing: 0.022em;
  text-transform: uppercase;

  background-color: ${backgroundColor};
  color: ${props => props.color ? props.color : white };
  width: auto;

  padding-left: 15px;
  padding-right: 15px;
`

const Description = styled.div`
  font-family: 'Tisa Pro';
  font-size: 20px;
  line-height: 24px;
  
  color: ${darkWhite};
`

const ArrowContainer = styled.div`
  width: 25px;
  height: 20px;
`

const Arrow = ({color}) => <ArrowContainer>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.104 20.455">
    <path fill={color} d="M20.417,11.6h-19a1.393,1.393,0,0,1-.138-2.783c.086,0,.17,0,.256,0H20.417c-.154-.163-.275-.3-.4-.432Q17.145,5.346,14.271,2.31a1.445,1.445,0,0,1-.01-1.973A1.372,1.372,0,0,1,15.677.059a1.976,1.976,0,0,1,.9.634c1.134,1.2,2.274,2.4,3.411,3.606l4.458,4.708c.077.08.157.16.231.243a1.4,1.4,0,0,1-.022,1.941q-3.122,3.3-6.251,6.6c-.682.721-1.38,1.428-2.043,2.168a1.555,1.555,0,0,1-2.088.138,1.322,1.322,0,0,1-.333-1.428,1.559,1.559,0,0,1,.32-.544q3-3.195,6.024-6.376C20.321,11.71,20.356,11.671,20.417,11.6Z" transform="translate(0.046 0.018)"/>
  </svg>
</ArrowContainer>

class SubThemeCard extends React.Component {
  render() {
    const {
      data,
      color,
    } = this.props;
    const title = data.name;
    const description = data.description ? data.description.value : '';
    const link = `/subthemes/${kebabCase(title)}`

    return (
      <Container to={link}>
        <Row>
          <Title color={color}>{title}</Title>
          { title.length > 100 && <div style={{flex:1}}>&nbsp;</div> }
        </Row>
        <Row style={{minWidth: '100%'}}>
          <Column style={{minWidth: '100%'}}>
            <Description dangerouslySetInnerHTML={{ __html: description }} />
            <Row>
              <div style={{flex:1}}>&nbsp;</div>
              <Arrow color={red}/>
            </Row>
          </Column>
        </Row>
      </Container>
    )
  }
}

export default SubThemeCard
