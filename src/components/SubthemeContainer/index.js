import React from "react"
import styled from 'styled-components';
import Link from '../Link';

import { 
  Overlay, 
  OverlayBody 
} from '../overlay'
import kebabCase from 'lodash/kebabCase'
import FlipMove from 'react-flip-move';

import Filters from './Filters'

import Poster from './Poster'
import PlayablePoster from './PlayablePoster'
import ArticleCard from './ArticleCard'
import ClipCard from './ClipCard'
import FAQCard from './FAQCard'
import InterviewCard from './InterviewCard'
import QuickFactCard from './QuickFactCard'

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

const defaultToEmpty = arr => (arr ? arr : [])

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

export const getCards = (relationships, queryFilter, onOpen) => {
  if(!onOpen)
    onOpen = link => {}

  const articles = defaultToEmpty(relationships.articles)
    .filter(article => 
      !queryFilter 
      || queryFilter === `recent` 
      || queryFilter === `article`
    )
    .map(
      article => 
        <ArticleCard 
          key={'article-' + article.title} 
          onOpen={ link => onOpen(link, article) } 
          article={article} 
        />
    )

  const clips = defaultToEmpty(relationships.clips)
  .filter(clip => 
    !queryFilter 
    || queryFilter === `recent` 
    || queryFilter === `clip`
  )
  .map( clip => 
    <ClipCard
      key={'clip-' + clip.title}
      linkable={true}
      clip={clip}
    />
  )

  const faqs = defaultToEmpty(relationships.faqs)
  .filter( faq => 
    !queryFilter 
    || queryFilter === `recent` 
    || queryFilter === `faq`
  )
  .map( faq => 
    <FAQCard
      key={'faq-' + faq.title}
      faq={faq}
    />
  )

  const interviews = defaultToEmpty(relationships.interviews)
  .filter( interview => 
    !queryFilter
    || queryFilter === `recent`
    || queryFilter === `interview`
  )
  .map( interview => 
    <InterviewCard
      key={'interview-' + interview.title}
      onOpen={ link => onOpen(link, interview) }
      interview={interview} 
    />
  )

  const quickfacts = defaultToEmpty(relationships.quickfacts)
  .filter(quickfact => 
    !queryFilter 
    || queryFilter === `recent` 
    || queryFilter === `quickfact`
  )
  .map( quickfact => 
    <QuickFactCard
      key={'quickfact-' + quickfact.title} 
      quickfact={quickfact}
    />
  )

  return [
    ...articles,
    ...clips,
    ...faqs,
    ...interviews,
    ...quickfacts,
  ]
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

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 30px;
`

const TopImage = styled.div`
  height:50%;
  width:100%;
  background-color:red;
  background-size:cover;
  background-position: center;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
`

const Description = styled.div`
`

class SubthemeSection extends React.Component {

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

  close = () => {
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

    // TODO (Conrad): Create custom card component for each type of data (article, clip, faq, etc)

    const { filter, popup, card } = this.state;

    const rawCards = getCards(subtheme.relationships, filter, this.open)

    let allCards = filter ?
      rawCards.sort((a, b) => (b.props.changed - a.props.changed)) :
      reorder(rawCards, this.order)

    allCards = allCards.filter( allCards => !!allCards)

    const title = card &&card.title ? card.title : '';
    const link = card && card.link ? card.link : '';
    const description = card && card.field_short_version ? card.field_short_version.processed : null;
    const background = card && card.relationships.field_main_image && card.relationships.field_main_image.localFile.publicURL;

    return (
      <Grid>
        <Overlay id="subtheme-overlay" visible={popup}>
          <OverlayBody>
            <Row>
              { 
                card && <PopupCard>
                  <CloseButton onClick={this.close}>Close</CloseButton>
                  <TopImage background={background} />
                  <h1>{title}</h1>
                  <Description dangerouslySetInnerHTML={{ __html: description }} />
                  <Link to={link}>Read the article</Link>
                </PopupCard>
              }
            </Row>
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
          allCards.map( (c, k) => <Card key={k}>{c}</Card>)
        }
        </FlipContainer>
      </Grid>
    )
  }
}

///

const FlipContainer = styled(FlipMove)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  overflow: auto;
`

const Card = styled.div`
  min-width: 350px;
  min-height: 441px;
`

const color = 'rgba(255, 255, 255, 0.66)'
const backdropColor = 'rgba(245, 238, 182, 0.92)'

const Grid = styled.div`
  background: linear-gradient(to bottom, ${color} 0%, ${backdropColor} 100%);
  box-shadow: 0px -12px 15px rgba(121, 121, 121, 0.45);
  backdrop-filter: blur(5px);
`

const SubthemeContainer = styled(SubthemeSection)`
  background-color: #ffffff;
  padding: 45px 30px;
  border-bottom: solid thin grey;
  margin: 60px 30px;

`

export default SubthemeContainer;

