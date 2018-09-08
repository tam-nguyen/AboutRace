import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import {
  white,
  softblack,
  smokegrey,
  fogwhite
} from '../../colors'

const gradient = `linear-gradient(to bottom, rgba(255,255,255,0.66) 0%, rgba(245,238,182,0.92) 100%)`

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

const TopContainer = styled.div`
  position: relative;

  height: 396px;
 

  &::before {
    position: absolute;
    content: '';

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-size: cover !important;
    background-attachment: fixed;
    background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  }
`
const Slugline = styled.div`
  width: 100%;
  height: 96px;
  background-color: rgba(31,41,54,0.66);
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#202a37+0,202a37+100&0+0,1+100 */
  background: -moz-linear-gradient(top, rgba(32,42,55,0) 0%, rgba(32,42,55,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(32,42,55,0) 0%,rgba(32,42,55,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(32,42,55,0) 0%,rgba(32,42,55,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00202a37', endColorstr='#202a37',GradientType=0 ); /* IE6-9 */
  position: absolute;
  bottom: 0;
  font-family: 'Quicksand';
  font-weight: 400;
  font-size: 30px;
  color: ${fogwhite};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default ({ data, location }) => {
  const background = get(data, `taxonomyTermThemes.relationships.field_theme_image.localFile.childImageSharp.original.src`)

  const episodeOneSynopsis = get(data, `allNodeSynopsis.edges.node[1].field_episode_synopsis.processed`)

  return (
    <Container>
      <TopContainer background={background}>
        <Slugline>An online companion to the award-winning documentary series</Slugline>
      </TopContainer>
    </Container>
  )
}
