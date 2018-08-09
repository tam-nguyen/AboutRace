import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import { 
  Link,
  SVGArrow
} from '../';

import {
  red,
  backgroundColor,
  white
} from '../../colors'

const Container = styled(Link)`
  color: white;

  padding-top: 30px;
  /*padding-left: 30px;*/
  padding-right: 30px;

  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
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

  color: ${props => props.color ? props.color : white };
  width: auto;

  padding-left: 15px;
  padding-right: 15px;
`

const Description = styled.div`
  font-family: 'Tisa Pro';
  font-size: 20px;
  line-height: 24px;
  
  color: ${white};
`

const ArrowContainer = styled.div`
  width: 25px;
  height: 20px;
`

const Arrow = ({color}) => <ArrowContainer>
  <SVGArrow color={color} />
</ArrowContainer>

class SubThemeCard extends React.Component {
  render() {
    const {
      data,
    } = this.props;

    const title = data.name.indexOf(':') >= 0 ? data.name.split(':')[1] : data.name
    const description = data.description ? data.description.value : '!empty content, check drupal!'
    const link = `/subthemes/${kebabCase(data.name)}`

    return (
      <Container href={link}>
        <Row>
          <Arrow color={red}/>
          <Title color={red}>{title}</Title>
        </Row>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
      </Container>
    )
  }
}

export default SubThemeCard
