import React from 'react'
import styled from 'styled-components'

import SubThemeCard from './SubThemeCard'

import {
  red,
  white,
} from '../../colors'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  vertical-align: top;
  overflow: hidden;
  box-shadow: rgba(39, 39, 39, 0.58) 0px 3px 57px 0px;
  user-select: none;
  color: white;
`;

const MainImage = styled.div`
  position: relative;

  height: 60vh;

  background-size: cover !important;
  background-attachment: fixed;
  transition: all .5s ease;

  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : `none`};

  @media (min-width: 1025px) { /* desktop */
    height: 60vh;
  }

  @media (max-width: 700px) { /* mobile */
    height: 100vh;
  }
`

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 50vw;
  height: 50vh;

  min-width: 698px;
  min-height: 231px;

  padding-top: 23px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 2em;

  background: ${props => props.gradient ? props.gradient : null };

  @media (min-width: 1025px) { /* desktop */
    height: 30vh;
  }

  @media (max-width: 700px) { /* mobile */
    min-width: 90vw;
    height: auto;
    padding-bottom: 2em;
    width: auto;
  }
`

const Title = styled.div`
  font-family: Lato;
  text-align: left;
  letter-spacing: 0.02em;
  line-height: 54px;

  color: ${props => props.color ? props.color : white };

  font-size: 30pt;
  font-weight: 600;
`;

const Description = styled.div`
  font-family: Lato;
  font-size: 20pt;
  line-height: 28px;
`;

const ChevronContainer = styled.div`
  cursor: pointer;
  position: absolute;
  
  right: 35px;
  bottom: 23px;

  width: 18px;
  height: 30px;

  transform: rotate(${props => props.open ? 90 : 0}deg);

  transition: all 0.3s ease-out;
`

const Chevron = ({open}) => <ChevronContainer open={open}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.177 30.139">
    <path 
      fill={red} 
      d="M15.2,15.034a2.2,2.2,0,0,1,.159-.226Q21.785,7.639,28.224.48a1.027,1.027,0,0,1,1.585.04,1.367,1.367,0,0,1,.02,1.76Q22.912,9.974,16,17.667a1.106,1.106,0,0,1-1.859,0Q7.975,10.763,1.806,3.858c-.494-.554-1-1.1-1.481-1.671A1.372,1.372,0,0,1,.555.2,1.07,1.07,0,0,1,2.013.413Q3.177,1.7,4.338,3q3.147,3.5,6.295,7,2.174,2.421,4.352,4.841a1.261,1.261,0,0,1,.127.2C15.14,15.039,15.168,15.034,15.2,15.034Z"
      transform="translate(0 30.139) rotate(-90)"
    />
  </svg>
</ChevronContainer>

const SubThemes = styled.div`
  display: grid;
  grid-template-columns: 45vw 45vw;

  padding-bottom: 30px;
  grid-gap: 30px;
  align-items: center;

  background: ${props => props.gradient ? props.gradient : null };

  @media (min-width: 1025px) { /* desktop */
    grid-template-columns: 30vw 30vw 30vw;
  }

  @media (max-width: 700px) { /* mobile */
    grid-template-columns: 90vw;
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
    const { data } = this.props
    const background = data.relationships.field_theme_image && data.relationships.field_theme_image.localFile.publicURL
    let backgrounGrayscale = '';

    try{
      backgrounGrayscale = data.relationships.field_theme_image.localFile.childImageSharp.grayscale.src;
    }catch(e){
      backgrounGrayscale = background
    }

    const description = data.description && data.description.processed

    //preloading images for smoother effect
    if(typeof window !== 'undefined'){
      let img = new window.Image();
      img.src = background;
    }
    
    const { subthemes } = data.relationships

    const titleColor = '#54C3F4'
    const color1 = '#284977'
    const color2 = '#0B0C0D'
    const gradient = `linear-gradient(to bottom, ${color1} 0%, ${color2} 100%)`

    return (
      <Container
        open={open}
        onClick={() => this.setState({open: !open})}
      >
        <MainImage
          background={background}
          backgrounGrayscale={backgrounGrayscale}
        >
          <Info gradient={gradient}>
            <Title color={titleColor}>{data.name}</Title>
            <Description dangerouslySetInnerHTML={{ __html: description }} />
            <Chevron open={open} />
          </Info>
        </MainImage>
        {
          open && <SubThemes gradient={gradient}>
            {
              subthemes.map( (data, key) => <SubThemeCard key={key} data={data} color={titleColor}/>)
            }
          </SubThemes>
        }
      </Container>
    )
  }
}

// 〉

export default ThemeCard
