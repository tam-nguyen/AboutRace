import React from 'react'
import styled from 'styled-components'

import { DISPLAY_NAMES_TO_SLUG } from '../../constants'

const Container = styled.div`
  mix-blend-mode: normal;
  text-align: center;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`

const Label = styled.div`
  margin-right: 15px;
  font-family: Lato;
  font-weight: 700;
  font-size: 14pt;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: hotpink;
`

const Button = styled.div`
  cursor: pointer;
  color: hotpink;
  margin-right: 15px;
  margin-bottom: 15px;
  font-size: 14pt;
  letter-spacing: 0.125em;
  font-family: 'Lato';
  font-weight: ${ props => props.selected ? 700 : null};
  border-bottom: ${ props => props.selected ? `3px solid hotpink` : null };
  text-transform: uppercase;
`

const itemExists = (itemTag, parent) => parent.relationships[itemTag]

const Filters = ({ queryParams, name, filter, subtheme, toggleFilter }) => {
  const array = Array
    .from(DISPLAY_NAMES_TO_SLUG.keys())
    .filter(itemType => (itemType === `recently added` || itemExists(itemType, subtheme)))

  return (
    <Container>
      <Label>Sort by:</Label>
        <Button 
          onClick={ () => toggleFilter(null) }
          selected={!filter}
        >
          All
        </Button>
      {
        array.map(filterType => {
          const filterSlug = DISPLAY_NAMES_TO_SLUG.get(filterType)

          return (
            <Button
              key={filterType}
              onClick={ () => toggleFilter(filterSlug) }
              selected={filter === filterSlug}
            >
              {filterType}
            </Button>
        )})
      }
    </Container>
  )
}

export default Filters;
