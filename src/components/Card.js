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

const BASE_CARD_WIDTH = 350;
const FLEX = 100;
const MAX_WIDTH_CONSTANT = 1.25;
const ARTICLE_MULTIPLIER = 1;
const INTERVIEW_MULTIPLIER = 1;
const CLIP_MULTIPLIER = 1;
const QUICK_FACT_MULTIPLIER = 1.5;
const FAQ_MULTIPLIER = .5;

const CardGridItem = styled.div`
  position: relative;
  float: left;
  display: inline-block;
  
  min-width: 324px;
  min-height: 441px !important;
  flex: ${FLEX} ${FLEX} ${BASE_CARD_WIDTH}px;
  margin-bottom: 30px;
  
  max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT}px;
  color: black;

  ${props => props.type === `Article` && css`
    flex: ${FLEX * ARTICLE_MULTIPLIER} ${FLEX * ARTICLE_MULTIPLIER} ${BASE_CARD_WIDTH * ARTICLE_MULTIPLIER}px;
    max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * ARTICLE_MULTIPLIER}px;
  `}

  ${props => props.type === `Interview` && css`
  flex: ${FLEX} ${FLEX * INTERVIEW_MULTIPLIER} ${BASE_CARD_WIDTH * INTERVIEW_MULTIPLIER}px;
  max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * INTERVIEW_MULTIPLIER}px;
  `}

  ${props => props.type === `Clip` && css`
  flex: ${FLEX * CLIP_MULTIPLIER} ${FLEX * CLIP_MULTIPLIER} ${BASE_CARD_WIDTH * CLIP_MULTIPLIER}px;
  max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * CLIP_MULTIPLIER}px;
  `}

  ${props => props.type === `QuickFact` && css`
    flex: ${FLEX * QUICK_FACT_MULTIPLIER} ${FLEX * QUICK_FACT_MULTIPLIER} ${BASE_CARD_WIDTH * QUICK_FACT_MULTIPLIER}px;
    max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * QUICK_FACT_MULTIPLIER}px;
  `}
 
  ${props => props.type === `FAQ` && css`
    flex: ${FLEX * QUICK_FACT_MULTIPLIER} ${FLEX * FAQ_MULTIPLIER} ${BASE_CARD_WIDTH * FAQ_MULTIPLIER}px;
    max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * FAQ_MULTIPLIER}px;
  `}
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  height: 492px;
  width: 341px;
  
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
  
  height: 492px;
  width: 341px;

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

