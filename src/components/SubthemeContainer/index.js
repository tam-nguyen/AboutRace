import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import FlipMove from 'react-flip-move'

import Filters from './Filters'
import Link from '../Link'

import {default as XButton} from '../Header/Menu'

import { 
  Overlay, 
  OverlayBody 
} from '../overlay'

import { default as CustomOverlay } from './Overlay'
import Article from '../Article'

import getCards from '../../utils/getCards'

const range = require('range');

const SubthemeTitle = styled.div`
  font-weight: normal;
  text-rendering: optimizeLegibility;
  font-size: 42px;
  font-weight:300;
  padding: 15px;
  font-family: 'Lato';
  text-align: center;
  color: rgba(59, 59, 59, 0.8);
  margin-bottom: 15px;
  margin-top: 15px;
`
const NUM_CARDS_TO_SHOW = 3;

const shuffle = (arr) => {
  var currentIndex = arr.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}
 
const reorder = (arr, order) => {
  const newArr = new Array(arr.length);
  order && order.forEach((item, i) => {
    newArr[i] = arr[item];
  })
  return newArr;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const PopupCard = styled.div`
  position: relative;
  width: 33vw;
  height: 33vw;
  min-width: 300px;
  min-height: 300px;
  background-color: gray;
  border-radius: 100px;
  border: 1px solid grey;
  overflow: hidden;
`

const OverlayContainer = styled.div`
  overflow-y: scroll;

  padding-top: 90px;

  width: 100%;
  max-width: 1200px;

  -ms-overflow-style: none;  // IE 10+
  overflow: -moz-scrollbars-none;  // Firefox

  &::-webkit-scrollbar {
    display: none;
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
  }
`

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 400px;
  right: 50px;
`

const XButtonContainer = styled(XButton)`
  cursor: pointer;
  display: block;
  position: relative;
`

const CloseButton = props => (
  <CloseButtonContainer>
    <XButtonContainer 
      width={30}
      open={true} 
      {...props}
    />
  </CloseButtonContainer>
)

///

const TopImage = styled.div`
  height:50%;
  width:100%;
  background-color:red;
  background-size:cover;
  background-position: center;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
`

const FlipContainer = styled(FlipMove)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  overflow: auto;

  padding-bottom: 286px;
  width: 100vw;

  justify-content: center;
`

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 0px -12px 15px rgba(121, 121, 121, 0.45);
  backdrop-filter: blur(5px);

  border-bottom: solid thin grey;
`

class Subtheme extends React.Component {

  constructor(props){
    super(props)

    this.updateOrder(props, null)

    this.state = { 
      numCards: NUM_CARDS_TO_SHOW,
      filter: null,
      popup: false,
      card: null
    }

    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  toggleFilter(value) {
    if (this.state.filter === value) {
      this.setState({filter: null})
    } else {
      this.setState({filter: value})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      // nextProps.filter !== this.props.filter ||
      nextState.numCards !== this.state.numCards ||
      nextState.filter !== this.state.filter ||
      nextState.popup !== this.state.popup
    );
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.filter !== nextState.filter) {
      // this.updateOrder(nextProps, nextState.filter)
    }
  }

  getShuffle = length => {
    // weird Gatsby hack
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return;

    let storedOrder = window.localStorage.getItem('shuffle');
    if(storedOrder){
      storedOrder = JSON.parse(storedOrder)
    }else{
      storedOrder = shuffle(range.range(length))
      window.localStorage.setItem('shuffle', JSON.stringify(storedOrder));
    }

    return storedOrder
  }

  updateOrder(props, filter) {
    if (props.filter) return;
    const length = getCards(props.data.relationships, filter).length;
    this.order = this.getShuffle(length)
  }

  close = event => {
    const array = ['close-button', 'subtheme-overlay']
    if( array.indexOf(event.target.id) == -1 ) return

    this.setState({
      popup: !this.state.popup,
      card: null
    })
  }

  open = (link, data) => {
    this.setState({
      popup: true,
      card: {...data, link}
    })
  }

  render() {
    const {data} = this.props;
    const subtheme = data;

    const { filter, popup, card } = this.state;

    const rawCards = getCards(subtheme.relationships, filter, this.open)

    let allCards = filter ?
      rawCards.sort((a, b) => (b.props.changed - a.props.changed)) :
      reorder(rawCards, this.order)

    allCards = allCards.filter( allCards => !!allCards)

    const title = card && card.title ? card.title : '';
    const link = card && card.link ? card.link : '';
    const description = card && card.field_short_version ? card.field_short_version.processed : null;
    const background = card && card.relationships.field_main_image && card.relationships.field_main_image.localFile.publicURL;

    const gradient = `linear-gradient(to bottom, #D9B0B0 0%, rgba(109,88,88,0.92) 100%)`

    return (
      <Container>
        <Overlay visible={popup}>
          <OverlayBody>
            <CustomOverlay
              id="subtheme-overlay"
              gradient={gradient}
              onClick={ e => this.close(e)}
            >
              <OverlayContainer>
                { card && <Article data={{nodeArticle: card}} overlay={true}/>}
              </OverlayContainer>
              <CloseButton id="close-button" onClick={this.close} />
            </CustomOverlay>
          </OverlayBody>
        </Overlay>

        <Filters
          toggleFilter={this.toggleFilter}
          name={this.props.name}
          filter={filter}
          subtheme={subtheme}
        />
      
        <FlipContainer>
        {
          allCards.map( (c, k) => <div key={k}>{c}</div>)
        }
        </FlipContainer>
      </Container>
    )
  }
}

export default Subtheme;

