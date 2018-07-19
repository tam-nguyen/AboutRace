import React from 'react'
import styled from 'styled-components'

import SubThemeCard from './SubThemeCard'

const gradient = `linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(1,1,2,0.64) 25%,rgba(1,1,2,1) 100%)`

const Container = styled.div`
  border-radius: 45;
  width: 90%;
  margin-left: 5%;
  margin-bottom: 60px;
  margin-right: 0;
  display: inline-block;
  vertical-align: top;
  position: relative;
  overflow: hidden;
  box-shadow: rgba(39, 39, 39, 0.58) 0px 3px 57px 0px;
  user-select: none;
  border-radius: 60px;
  color: white;
  
  background-size: cover !important;
  background-attachment: fixed;
  transition: all .5s ease;

  &:hover {
    background-size: 125% auto !important;
    transition: all .5s ease;
    background: ${ props => props.background ? `url(${props.background}) center no-repeat` : `none`};
    background: ${ props => props.background ? `${gradient}, url(${props.background}) center no-repeat` : `none`};
  }

  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : `none`};
  background: ${ props => props.backgrounGrayscale ? `url(${props.backgrounGrayscale}) center no-repeat` : `none`};
  background: ${ props => props.backgrounGrayscale ? `${gradient}, url(${props.backgrounGrayscale}) center no-repeat` : `none`}; 

  height: ${props => props.open ? '100vh' : '60vh'};
`;

const Title = styled.div`
  font-family: Lato;
  font-size: 48px;
  line-height: 1;
  text-align: left;
  letter-spacing: 0.011em;
  padding-top: 30vh;
  padding-bottom: 5vh;
  text-align: center;
`;

const Description = styled.div`
  font-family: Lato;
  text-align: center;
  padding-left: 10vw;
  padding-right: 10vw;
`;

const Chevron = styled.div`
  cursor: pointer;
  position: absolute;
  right: 1vw;
  top: 30vh;
  font-family: 'Lato';
  font-size: 100px;
  color: white;

  transform: ${ props => props.open ? 'rotate(90deg)' : 'none'};
`

const SubThemes = styled.div`
  display: grid;
  grid-template-columns: 30vw 30vw 30vw;
  /*grid-template-rows: 40vh 40vh;*/
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
    let img = new Image();
    img.src = background;

    const { subthemes } = data.relationships;

    return (
      <Container
        open={open}
        background={background}
        backgrounGrayscale={backgrounGrayscale}
        onClick={() => this.setState({open: !open})}
      >
        <Title>{data.name}</Title>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
        <Chevron open={open}>〉</Chevron>
        {
          <SubThemes>
            {
              open && subthemes.map( (data, key) => <SubThemeCard key={key} data={data} />)
            }
          </SubThemes>
        }
      </Container>
    )
  }
}

export default ThemeCard
