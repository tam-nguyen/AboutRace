import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import { 
  Link,
  SVGArrow
} from '../';

import {
  red,
  white
} from '../../colors'

const Container = styled(Link)`
  color: white;
  background-color: rgba(51, 51, 51, .48);
  padding: 30px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 3px;

  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`

const Title = styled.div`

  font-family: Lato;
  font-size: 36px;
  line-height: 39px;
  font-weight: 600;

  letter-spacing: 0.02em;

  color: ${white};
  width: auto;

  
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
          <Title color={red}>{title}</Title>
        </Row>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
        <Arrow color={red}/>
      </Container>
    )
  }
}

export default SubThemeCard
