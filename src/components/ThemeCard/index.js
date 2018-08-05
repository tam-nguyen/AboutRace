import React from 'react'
import styled from 'styled-components'

import SubThemeCard from './SubThemeCard'

import {
  red,
  black,
  white,
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

const Title = styled.div`
  font-family: Lato;
  text-align: left;
  letter-spacing: 0.02em;
  line-height: 54px;

  color: ${black};

  font-size: 20pt;
  font-weight: 600;
`;

const Description = styled.div`
  font-family: Tisa Pro;
  font-size: 22pt;
  line-height: 30px;

  margin-bottom: 45px;

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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.177 30.139">
    <path 
      fill={white} 
      d="M15.2,15.034a2.2,2.2,0,0,1,.159-.226Q21.785,7.639,28.224.48a1.027,1.027,0,0,1,1.585.04,1.367,1.367,0,0,1,.02,1.76Q22.912,9.974,16,17.667a1.106,1.106,0,0,1-1.859,0Q7.975,10.763,1.806,3.858c-.494-.554-1-1.1-1.481-1.671A1.372,1.372,0,0,1,.555.2,1.07,1.07,0,0,1,2.013.413Q3.177,1.7,4.338,3q3.147,3.5,6.295,7,2.174,2.421,4.352,4.841a1.261,1.261,0,0,1,.127.2C15.14,15.039,15.168,15.034,15.2,15.034Z"
      transform="translate(0 30.139) rotate(-90)"
    />
  </svg>
</ChevronContainer>

const SubThemes = styled.div`
  display: grid;
  grid-template-columns: 45vw 45vw;

  padding-left: 138px;

  padding-bottom: 30px;
  /*grid-gap: 30px;*/
  /*align-items: center;*/

  @media (min-width: 1025px) { /* desktop */
    grid-template-columns: 30vw 30vw 30vw;
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
      height,
      width,
      src
    } = data.relationships.field_theme_image.localFile.childImageSharp.resolutions

    const background = src
    const title = data.name
    const description = data.description && data.description.processed
    const { subthemes } = data.relationships

    const color1 = color;
    const color2 = '#0B0C0D'
    const gradient = `linear-gradient(to bottom, ${color1} 0%, ${color2} 100%)`

    return (
      <Container
        open={open}
        gradient={gradient}
        onClick={() => this.setState({open: !open})}
      >
        <MainImage background={background} />
        <Info gradient={gradient}>
          <FirstRow>
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
