import React from "react"
import { Link } from 'gatsby'
import styled, { css } from 'styled-components';

import {
  white
} from '../colors'

const Container = styled.div`
  cursor: pointer;
`;

class CardWrapper extends React.Component {
  render() {
    const { link, children, ...rest } = this.props
    if (link) {
      return <Link to={link} {...rest}>{children}</Link>
    } else {
      return <Container {...rest}>{children}</Container>
    }
  }
}

const WIDTH = 492;
const HEIGHT = 341;

const CardGridItem = styled.div`
  position: relative;
  float: left;
  display: inline-block;
  
  margin: 10px;

  color: black;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  height: ${WIDTH}px;
  width: ${HEIGHT}px;
  
  border-radius: 6px;

  background: rgba(34,34,34, 0.95);
  backdrop-filter: blur(5px);
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

class Card extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isHovering: false
    };
  }

  handleMouseHover = () => {
    this.setState({ isHovering: !this.state.isHovering });
  }

  render() {
    const {isHovering} = this.state;
    const { link, className, style, children, overlay, ...rest } = this.props

    return (
      <CardGridItem
        {...rest}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <CardWrapper link={link} className={className} style={style}>
          {children}
          {
            isHovering && overlay
            ?
            <Overlay>{overlay}</Overlay>
            :
            null
          }
        </CardWrapper>
      </CardGridItem>
    )
  }
}

///

const StyledCard = styled(Card)`
  position: relative;
  display: block;
  
  height: ${WIDTH}px;
  width: ${HEIGHT}px;

  background-color: ${white};
  border-radius: 3px;
  overflow: hidden;

  box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  transition: all .3s;

  &:hover {
    -webkit-box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.908);
    -moz-box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.908);
    box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.908);
    transition: all .3s;
  }
  
  font-family: "ff-tisa-web-pro";
  vertical-align: top;

  ${props => props.background && css`
    background-image: url('${props.background}');
    background-size: cover;
  `}

  ${props => props.link && css`
    color: inherit;
    text-decoration: inherit;
  `}
`;

export default StyledCard;

