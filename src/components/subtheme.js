const React = require('react')
const range = require('range')
const ReactFlex = require('react-flex')
require('react-flex/index.css')
import Img from 'gatsby-image'
const FlipMove = require('react-flip-move');
import styled from 'styled-components';
import { navigateTo } from 'gatsby-link';
import Card from './card.js';
import RCCard from './rccard.js';
const queryString = require('query-string');
import './subtheme.css';

const Video = styled.video`
  width: 100%;
  display: block;
`
const SubthemeTitle = styled.div`
  font-family: 'Lato';
  font-weight: normal;
  text-rendering: optimizeLegibility;
  font-size: 48px;
  line-height: 1.1;
  color: #0c063e;
  margin-top: 15px;
  padding-bottom: 30px;
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
  order.forEach((item, i) => {
    newArr[i] = arr[item];
  })
  return newArr;
}

export const ArticleCard = ({ article, i, relatedContent }) => (
  relatedContent ?
    <Card style={{padding:15}} key={`article-${i}`} title={article.title} type="Article" slug="article" changed={article.changed}>
        {article.field_short_version && (
          <p className={'card-large-text'} dangerouslySetInnerHTML={{ __html: article.field_short_version.processed }} />
        )}
    </Card> :
    <RCCard style={{padding:15}} key={`article-${i}`} title={article.title} type="Article" slug="article" changed={article.changed}>
    {article.field_short_version && (
      <p className={'RCcard-large-text'} dangerouslySetInnerHTML={{ __html: article.field_short_version.processed }} />
    )}
    </RCCard>
)

export const ClipCard = ({ clip = { relationships: {} }, i, relatedContent }) => (
  <Card key={`clip-${i}`} title={clip.title} slug="clip" changed={clip.changed}>

    <div className={'poster'} />
    <p style={{paddingLeft:30, paddingRight:30, paddingBottom: 20}} className={'caption'}>{clip.title}</p>
    {clip.relationships.field_clip ? (
      <div>
        <Video controls>
          <source
            src={clip.relationships.field_clip.localFile.publicURL}
            type={
              clip.relationships.field_clip.localFile.internal.mediaType
            }
          />
        </Video>
      </div>
    ) : (
      <small>No video file attached</small>
    )}
  </Card>
)

export const FAQCard = ({ faq = {}, i, relatedContent }) => (
  <Card style={{padding:90}} key={`faq-${i}`} type="FAQ" title={faq.title} slug="faq" changed={faq.changed} background={faq.relationships.field_faq_image && faq.relationships.field_faq_image.localFile.publicURL}>
    {/* <p style={{fontSize:18}} className={'card-large-text'}>{faq.title}</p> */}
  </Card>
)

export const InterviewCard = ({ interview = {}, i, relatedContent }) => (
  <Card style={{padding:15}} key={`interview-${i}`} type="Interview" title={interview.title} slug="interview" changed={interview.changed}>
    <p className={'card-large-text'}>{interview.title}</p>
  </Card>
)

export const QuickFactCard = ({ quickfact, i, relatedContent, onClick, style = {} }) => (
  <Card key={`quickfact-${i}`} type="QuickFact" title={quickfact.title} slug="quickfact" changed={quickfact.changed} style={style}>
    <h4>{quickfact.title}</h4>
    {
      onClick ?
        <div
          dangerouslySetInnerHTML={{
            __html: quickfact.field_quickfact.processed,
          }}
          onClick={onClick}
        /> :
        null
    }
  </Card>
)

export const getCards = (relationships, queryFilter, relatedContent) => [
  ...defaultToEmpty(relationships.articles).filter(article => !queryFilter || queryFilter == `article`).map((article, i) => (<ArticleCard article={article} i={i} relatedContent={relatedContent} />)),
  ...defaultToEmpty(relationships.clips).filter(clip => !queryFilter || queryFilter == `clip`).map((clip, i) => (<ClipCard clip={clip} i={i} relatedContent={relatedContent} />)),
  ...defaultToEmpty(relationships.faqs).filter(faq => !queryFilter || queryFilter == `faq`).map((faq, i) => (<FAQCard faq={faq} i={i} relatedContent={relatedContent} />)),
  ...defaultToEmpty(relationships.interviews).filter(interview => !queryFilter || queryFilter == `interview`).map((interview, i) => (<InterviewCard interview={interview} i={i} relatedContent={relatedContent} />)),
  ...defaultToEmpty(relationships.quickfacts).filter(quickfact => !queryFilter || queryFilter == `quickfact`).map((quickfact, i) => (<QuickFactCard quickfact={quickfact} i={i} relatedContent={relatedContent} />)),
]


const Filters = ({ queryParams, name, filter }) => (
  <div>
    <span style={{
            marginRight: 40,
            fontFamily: 'Lato',
            letterSpacing: '0.04em',
          }}
          >Sort by: </span>
    {
      [`article`, 'interview', `faq`, `clip`].map(filterType => (
          <button
            onClick={() => {
              const newQueryParams = { ... queryParams }
              if (newQueryParams[name] == filterType){
                delete newQueryParams[name]
              } else {
                newQueryParams[name] = filterType;
              }
              navigateTo(`?${queryString.stringify(newQueryParams)}`)
            }}
            style={{
              background: filter == filterType ? `#666` : `white`,
              color: filter == filterType ? `white` : `#666`,
              marginRight: 20,
              marginBottom: 20
            }}
          >
            {filterType}
          </button>
      ))
    }
  </div>
)


class SubthemeSection extends React.Component {
  constructor(props){
    super(props)

    this.updateOrder(props)
    this.state = {}
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.filter !== this.props.filter ||
      nextState.showMore !== this.state.showMore
    );
  }
  componentWillUpdate(nextProps) {
    this.updateOrder(nextProps)
  }
  updateOrder(props) {
    if (props.filter) return;
    const length = getCards(props.data.relationships, props.filter).length;
    this.order = shuffle(range.range(length))
  }
  render() {
    const subtheme = this.props.data
    console.log(this.state)
    const { Flex, Item } = ReactFlex

    // TODO (Conrad): Create custom card component for each type of data (article, clip, faq, etc)

    const { filter } = this.props;

    const allCards = filter ?
      getCards(subtheme.relationships, filter).sort((a, b) => (b.props.changed - a.props.changed)) :
      reorder(getCards(subtheme.relationships, filter), this.order)

    const description = subtheme.description
      ? <div
            className={'subtheme-description'}
            key="description"
            dangerouslySetInnerHTML={{ __html: subtheme.description.processed }}
          />
      : null

    return (
      <div className={this.props.className}>
        <SubthemeTitle>{subtheme.name}</SubthemeTitle>
        { description }
        <Filters
          queryParams={this.props.queryParams}
          name={this.props.name}
          filter={filter}
        />
        <div style={{ display: 'flex', 'flex-wrap': 'wrap', overflowX: 'auto', justifyContent: 'space-around' }}>
          {
            this.state.showMore ?
              allCards :
              allCards.slice(0, NUM_CARDS_TO_SHOW)
          }
        </div>
        {
          allCards.length >= (NUM_CARDS_TO_SHOW) && !this.state.showMore ?
            <button style={{ margin: 20 }} onClick={() => { console.log('here'); this.setState({ showMore: true }); } }>
              Show More
            </button> :
            null
        }

      </div>
    )
  }
}


const SubthemeContainer = styled(SubthemeSection)`
  background-color: #fafafaf5;
  border: solid thin lightgrey;
  padding: 20px;
  margin: 50px;
`

export default SubthemeContainer;

