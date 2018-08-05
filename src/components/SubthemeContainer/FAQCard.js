import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import Card from '../Card';

import Description from './Description';

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h4`
  margin-bottom: 15px;
`

export class FAQCard extends React.Component {
  render() {
    const {  faq = {} } = this.props;
    const link = `/qa/${kebabCase(faq.title)}`;

    return (
      <Container
        slug="faq"
        changed={faq.changed}
        type="FAQ" 
        link={link}
      >
        <Title>Q&A</Title>
        <Description>{faq.title}</Description>
      </Container>
    )
  }
}

export default FAQCard;
