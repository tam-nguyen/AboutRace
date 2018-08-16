import React from 'react'
import styled from 'styled-components'

import SVGChevron from '../SVGChevron'
import SubThemeCard from './SubThemeCard'

import {
  black,
  white,
  getGradient
} from '../../colors'

const Container = styled.div`
  position: relative;

  width: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding-top: 51px;
  padding-bottom: 98px;

  background-color: ${white};
  
  &::before {
    content: '';
    position: absolute;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background: ${props => props.gradient ? props.gradient : null };
    filter: blur(12px);
    filter: opacity(53%);
  }

  @media (max-width: 812px) { /* mobile */
    padding-top: 0;
  }
`;

const MainImage = styled.div`
  position: relative;

  width: 832px;
  height: 583px;

  background-size: cover !important;
  background-attachment: fixed;
  transition: all .5s ease;

  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : `none`};
  filter: opacity(92%);

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
    height: 50vh;
  }
`

const Info = styled.div`
  position: relative;
  
  margin-top: -200px;
  margin-bottom: -100px;

  z-index: 1;

  backdrop-filter: blur(12px);

  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background: ${props => props.gradient ? props.gradient : null };
    filter: blur(12px);
    filter: opacity(53%);
  }

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const Explore = styled.div`
  font-family: Lato;
  text-align: left;
  letter-spacing: 0.22em;
  margin-top:45px;
  margin-bottom: 9px;
  text-transform: uppercase;
  color: ${white};
  font-size: 12px;
  font-weight: normal;
`

const Title = styled.div`
  font-family: Lato;
  text-align: left;
  letter-spacing: 0.02em;
  line-height: 66px;
  margin-bottom: 18px;
  color: ${white};
  font-size: 66px;
  font-weight: 600;
`;

const Description = styled.div`
  font-family: Tisa Pro;
  font-size: 22px;
  margin-right: 90px;
  line-height: 30px;
  margin-bottom: 60px;

  & > p {
    margin: 0;
  }

  color: ${white};
`;

const ChevronContainer = styled.div`
  cursor: pointer;
  position: absolute;
  
  right: 0;

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
  display: grid;
  grid-template-columns: 45vw 45vw;

  padding-left: 90px;

  padding-bottom: 30px;

  @media (min-width: 1025px) { /* desktop */
    grid-template-columns: 30% 30% 30%;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 38px;
    grid-template-columns: 90vw;
  }
`

const Row = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: center;
`

const FirstRow = styled(Row)`
  margin-top: 16px;
  margin-left: 138px;
  margin-right: 138px;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    margin-left: 38px;
    margin-right: 38px;
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
      <Container
        open={open}
        gradient={gradient}
        onClick={() => this.setState({open: !open})}
      >
        <MainImage background={background} />
        <Info gradient={gradient}>
          <FirstRow>
            <Explore>Explore:</Explore>
            <Title >{title}</Title>
            <Description dangerouslySetInnerHTML={{ __html: description }} />
            <Chevron open={open} />
          </FirstRow>
          <Row>
            {
              open && <SubThemes gradient={gradient}>
                {
                  subthemes.map( (data, key) => <SubThemeCard key={key} data={data}/>)
                }
              </SubThemes>
            }
          </Row>
        </Info>
      </Container>
    )
  }
}

// 〉

export default ThemeCard
