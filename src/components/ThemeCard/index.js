import React from 'react'
import styled from 'styled-components'

import SVGChevron from '../SVGChevron'
import SubThemeCard from './SubThemeCard'

import {
  white,
  getGradient,
  smokeblue
} from '../../colors'

const Container = styled.div`
  position: relative;

  padding-top: 51px;

  background-color: ${smokeblue};

  @media (max-width: 812px) { /* mobile */
    padding-top: 0;
  }
`;

const MainImage = styled.div`
  position: relative;

  height: 298px;

  background-size: cover !important;
  background-attachment: fixed;
  transition: all .5s ease;

  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : `none`};

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
    height: 50vh;
  }
`

const Info = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 60px;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const Explore = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 14px;
`

const Title = styled.div`
  font-family: 'Quicksand';
  line-height: 36px;
  font-size: 36px;
  font-weight: 500;
  padding-bottom: 18px;
`;

const Description = styled.div`
  font-family: 'Neuton';
  font-size: 20px;
  line-height: 24px;
  padding-bottom: 15px;
  & > p {
    margin: 0;
  }

`;

const ChevronContainer = styled.div`
  cursor: pointer;
  position: absolute;
  
  right: 30px;

  width: 18px;
  height: 30px;

  transform: rotate(${props => props.open ? 90 : 0}deg);

  transition: all 0.3s ease-out;

  @media (max-width: 812px) { /* mobile */
    right: -25px;
  }
`

const Chevron = ({open}) => <ChevronContainer open={open}>
  <SVGChevron color={white} />
</ChevronContainer>

///

const SubThemes = styled.div`
  @media (min-width: 1025px) { /* desktop */
  }

  @media (max-width: 812px) { /* mobile */

  }
`

const DetailContainer = styled.div`
  display: flex;
`

const LeftCol = styled.div`
  flex: 1;
  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */

  }
`
const RightCol = styled.div`
  flex: 1;
  padding-left: 60px;
  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */

  }
`

class ThemeCard extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;

    const { 
      data,
      color
    } = this.props

    const {
      src
    } = data.relationships.field_theme_image.localFile.childImageSharp.original

    const background = src
    const title = data.name
    const description = data.description && data.description.processed
    const { subthemes } = data.relationships

    const gradient = getGradient(color)

    return (
      <Container>
        <Explore style={{paddingLeft: 60, paddingBottom: 30}}>Themes from the films</Explore>
        <Info>
          <Title>{title}</Title>
          <DetailContainer>
            <LeftCol>
              <Description dangerouslySetInnerHTML={{ __html: description }} />
              <MainImage background={background} />
            </LeftCol>
            <RightCol>
              <Explore style={{paddingTop:6, paddingBottom:15}}>Explore:</Explore>
              {
              <SubThemes gradient={gradient}>
                  {
                    subthemes.map( (data, key) => <SubThemeCard key={key} data={data}/>)
                  }
                </SubThemes>
              }
            </RightCol>
          </DetailContainer>
        </Info>
      </Container>
    )
  }
}

// 〉

export default ThemeCard
