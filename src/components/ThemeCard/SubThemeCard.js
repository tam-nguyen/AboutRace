import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import { Link } from '../';

const Container = styled(Link)`
  color: white;
  padding: 1vw;
  font-family: 'Lato';
  text-align: center;
`

const Title = styled.div`
  position: relative;
  font-size: 20pt;
  line-height: 26px;
  font-weight: bold;
  padding-bottom: 1vh;

  &:after {
    content: "\00a0\00a0";
    position: absolute;
    bottom: -.25vh;
    left: calc(50% - 50px);
    width: 100px;
    height: 1px;
    border-bottom: 2px solid #D83C46;
  }
`

const Description = styled.div`
  font-family: 'Tisa Pro';
  font-size: 16pt;
  padding-top: 1vh;
  padding-bottom: 1vh;
`

class SubThemeCard extends React.Component {
  render() {
    const {data} = this.props;
    const title = data.name;
    const description = data.description ? data.description.value : '';
    const link = `/subthemes/${kebabCase(title)}`

    return (
      <Container to={link}>
        <Title>{title}</Title>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
      </Container>
    )
  }
}

export default SubThemeCard
