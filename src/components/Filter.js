import React, { Component } from 'react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  color: ${props => props.color ? props.color : `white`};
`

const Element = styled.div`
  cursor: pointer;
  margin-left: 10px;
  font-weight: ${props => props.selected ?  `bold` : `normal`};
`

const Title = styled.div`
  text-decoration: underline;
`

class Filter extends Component {
  render() {
    const {selected, onSelected, color} = this.props;
    return (
      <Row color={color}>
        Sort by:&nbsp;
        <Element
          selected={selected === 'all'}
          onClick={() => onSelected('all')}
        >
          All
        </Element>
        <Element
          selected={selected === '1'}
          onClick={() => onSelected('1')}
        >
          <Title>Episode One:</Title> The Difference Between Us
        </Element>
        <Element
          selected={selected === '2'}
          onClick={() => onSelected('2')}
        >
          <Title>Episode Two:</Title> The Story We Tell
        </Element>
        <Element
          selected={selected === '3'}
          onClick={() => onSelected('3')}
        >
          <Title>Episode Three:</Title> The House We Live In
        </Element>
      </Row>
    )
  }
}///

export default Filter;
