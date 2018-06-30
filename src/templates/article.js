const React = require('react')
import styled, { css } from 'styled-components'
import {
  getCards,
  QuickFactCard,
  FAQCard,
  ClipCard,
  ArticleCard
} from '../components/subtheme'
import { Overlay, OverlayHeader, OverlayTitle, OverlayFilter, OverlayBody }  from '../components/overlay'
const queryString = require('query-string');
import kebabCase from 'lodash/kebabCase'
import Link, { navigateTo } from 'gatsby-link';

const LargeCalloutText = styled.div`

`

const ArticleBackground = styled.div`
  // background-color: rgba(239, 255, 248, 0.92);
  // background-color:#d3e6de;
  // background-color: rgba(103, 165, 195, 0.14901960784313725);
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -9999;
`

const ArticleHeader = styled.div`
  width: 100%;
  height: 88vh;
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  // border: solid 4px black;
  background-color: lightgrey;
  position: fixed;
  left:0px;
  top:0px;
  z-index: -999;
`
const ArticleMain = styled.div`
  // background-color: rgba(255, 255, 255, 0.8);
  background-color: white;
  padding: 30px;
  position: relative;
  top:-300px;
  max-width: 735px;
  z-index:99999999;
`
const ArticleTitle = styled.div`
    font-size: 42px;
    width: 100%;
    margin-bottom: 22.5px;
    line-height: 1.125;
    // color: white;
    z-index: 99999999;
    position: relative;
    // font-family: 'Lato';
    // font-weight: 700;
    font-style: italic;
    font-family: "orpheuspro";
    font-size: 54px;
    font-weight: 500;
    font-style: normal;
`
const TopText = styled.div`
  width: calc(100% - 200px);
  // text-align: center;
  padding: 30px 45px;
  top:0;
  position: fixed;
  // background-color: rgba(255,255,255,0.92);
  // background-color: rgba(255, 244, 198, 0.92);
  min-height: 60px;
  // border-bottom: solid thin lightgrey;
  z-index: 99;
`


class QuickFactOverlay extends React.Component {
  render() {
    const { quickFact, transition } = this.props

    if (!quickFact) return (
      <Overlay key="quickfact" id="quickfact" visible={false}/>

    )
    const quickClips = quickFact.relationships.field_related_content || [];

    const quickClipLinks = {
      articles: [],
      clips: [],
      faqs: [],
      quickFacts: []
    }

    quickClips.forEach(item => {
      if (item.__typename == `node__faq`) {
        quickClipLinks.faqs.push(item)
      } else if (item.__typename == `node__article`) {
        quickClipLinks.articles.push(item)
      } else if (item.__typename == `node__clip`) {
        quickClipLinks.clips.push(item)
      }
    })

    return (
      <Overlay key="quickfact" id="quickfact" visible={!!quickFact} style={transition && transition.style}>
        <OverlayBody>
          <OverlayHeader>
            <div onClick={this.props.closeHandler} style={{float: `right`, color: `red`, cursor: `pointer`}}>
            <img style={{width: 50, marginTop:34}} src={require('../assets/images/close.svg')} />
            </div>
            <h3>{quickFact.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: quickFact.field_quickfact.processed,
              }}
            />
          </OverlayHeader>
          <div style={{ width: `100%`, display: `flex`, }}>
            {
              getCards(quickClipLinks, null, null, true).slice(0,2)
            }
          </div>
        </OverlayBody>
      </Overlay>
    )
  }
}

class TagOverlay extends React.Component {
  render() {
    const { tag, transition, queryParams = {} } = this.props

    if (!tag) return (
      <Overlay key="tag" id="tag" visible={!!tag}/>
    )

    const quickClipLinks = {
      articles: tag.relationships.backref_field_tags_node_article ,
      faqs: tag.relationships.backref_field_tag_node_faq,
      clips: tag.relationships.backref_field_t_node_clip,
      quickFacts: []
    }

    const itemExists = itemTag => (({
      faq: tag.relationships.backref_field_tag_node_faq,
      article: tag.relationships.backref_field_tags_node_article,
      clip: tag.relationships.backref_field_t_node_clip,
    })[itemTag])

    return (
      <Overlay key="tag" id="tag" visible={!!tag} style={transition && transition.style}>
        <OverlayBody wide>
            
          <OverlayHeader>
            <div onClick={this.props.closeHandler} style={{float: `right`, color: `red`, cursor: `pointer`}}>
            <img style={{width: 50, marginTop:34}} src={require('../assets/images/close.svg')} />
            </div>
            <div style={{
              textAlign:'center'
            }}>
              <OverlayTitle>{tag.name}</OverlayTitle>
            </div>
           
          </OverlayHeader>
          <div>
            
            <div style={{ width: `100%`, display: 'flex', 'flexWrap': 'wrap'}}>
              {
                getCards(quickClipLinks, queryParams[`type`], null, true)
              }
            </div>
          </div>
        </OverlayBody>
      </Overlay>
    )
  }
}

class SingleArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { data, transition } = this.props
    const queryParams = queryString.parse(this.props.location.search);
    const quickFact = queryParams.quickfact ?
      (data.nodeArticle.relationships.field_article_related_content || []).filter(node => (node.__typename === `node__quickfact` && kebabCase(node.title) == queryParams.quickfact)
      )[0] :
      null

    const {
      nodeArticle: {
        relationships: {
          field_belongs_to_subtheme
        }
      }
    } = data;

    let themesObject = {};

    field_belongs_to_subtheme.map( ({relationships: {field_belongs_to_theme}}) => {
      field_belongs_to_theme.map( ({name}) => {
        themesObject[name] = true;
      })
    })

    const themes = Object.keys(themesObject);

    const tag = queryParams.tag ?
      (data.nodeArticle.relationships.field_tags || []).filter(tag => (kebabCase(tag.name) == queryParams.tag)
      )[0] :
      null

    let background = data.nodeArticle.relationships.field_main_image &&
            data.nodeArticle.relationships.field_main_image.localFile.publicURL;

    const {allImageSharp} = data;

    allImageSharp.edges.map( ({node}) => {
      const {
        original,
        resolutions
      } = node;

      const isBackground = original.src.toLowerCase() === `${background}`.toLowerCase();

      if(isBackground) {
        background = resolutions.src;
      }

    })

    return (
      <div style={{position:'relative', height: '100vh'}}>
        <ArticleBackground />
        <QuickFactOverlay
          quickFact={quickFact}
          closeHandler={() => {
            navigateTo(`?`)
          }}
          transition={transition}
        />
        <TagOverlay
          queryParams={queryParams}
          tag={tag}
          transition={transition}
          closeHandler={() => {
            navigateTo(`?`)
          }}
        />
        
        <TopText>
          <Link style={{color:'inherit'}} to="/articles/">
            <img style={{height: 24, opacity:0.8, display:'inline-block', marginBottom:0, marginRight:15, verticalAlign:'middle'}} src={require('../assets/images/back.svg')} />
            {/* <h4 style={{marginBottom:0}}>By {data.nodeArticle.field_author && data.nodeArticle.field_author.processed}</h4> */}
            <h4 style={{marginBottom:0, display:'inline-block', verticalAlign:'middle'}}>all articles</h4>
          </Link>
          <div>
          FILED UNDER: {themes.join(' and ')}
          </div>
        </TopText>
        <ArticleHeader
          background={background}
        >
        </ArticleHeader>
        <div style={{backgroundColor:'rgba(255, 255, 255, 0.92)', marginTop:'calc(100vh - 174px)', width:'calc(100% - 60px)', position:'relative', zIndex:999, marginLeft: 30, boxShadow: '0px 0px 36px -4px rgba(117, 117, 117, 0.8)'}}>
          

          <div className="row">
          
            <div style={{marginLeft:0, marginRight:30}} className="column _75">
              <ArticleMain>
                
                <LargeCalloutText
                  style={{
                    fontSize: 24,
                    fontWeight: 'normal',
                    lineHeight: 1.5
                  }}
                  dangerouslySetInnerHTML={{
                    __html: data.nodeArticle.field_large_callout_text.processed,
                  }}
                />
                <div
                  style={{lineHeight:1.7}}
                  dangerouslySetInnerHTML={{
                    __html: data.nodeArticle.field_full_version.processed,
                  }}
                />
                
                  <div style={{textAlign:'center', marginTop:60, marginBottom:60}}>
                  
                  </div>

                  <p style={{
                  color: 'lightgrey',
                  letterSpacing: '0.04em',
                  fontFamily: 'Lato',
                  textAlign:'center'
                  }}>
                    NOTE: <span dangerouslySetInnerHTML={{
                      __html: data.nodeArticle.field_old_article_discl && data.nodeArticle.field_old_article_discl.processed,
                    }}
                  /></p>
              </ArticleMain>
            </div>
          
            <div style={{textAlign:'center'}} className="column">
              <div className="row">
                <div style={{textAlign:'center', paddingTop:45}} className="column">
                  <ArticleTitle>{data.nodeArticle.title}</ArticleTitle>
                  <h4 style={{marginBottom: 45}}>By {data.nodeArticle.field_author && data.nodeArticle.field_author.processed}</h4>
                </div>
              </div>
              <div style={{
                  width:180,
                  height:180,
                  marginBottom:15,
                  border:'solid thin lightgrey',
                  overflow:'hidden',
                  display:'inline-block',
                  borderRadius:'50%',
                }}
              >
                <img style={{
                  width:180,
                }} src={
                  data.nodeArticle.relationships.field_author_image &&
                  data.nodeArticle.relationships.field_author_image.localFile.publicURL
                } />
              </div>
              <div style={{
                  maxWidth: 300,
                  fontFamily: 'Lato',
                  fontWeight: 700,
                  fontSize: 14,
                  margin: '0 auto',
                  marginBottom: 60,
                  letterSpacing: '0.04em'
                }} 
                dangerouslySetInnerHTML={{
                  __html: data.nodeArticle.field_author_bio && data.nodeArticle.field_author_bio.processed,
                }}
              />
              <div style={{ marginBottom:15}}>
                <h4>tags:</h4>
                {
                (data.nodeArticle.relationships.field_tags || []).map(tag =>
                  <Link
                    to={`?${queryString.stringify({ ...queryParams, tag: kebabCase(tag.name) })}`}
                    key={`tag-${tag.name}`}
                    className={'tag'}
                  >
                    {tag.name}
                  </Link>
                  )
                }
              </div>
              <div style={{height: 200}}/>
              <button style={{marginRight:30}} onClick={() => { this.setState({ teaching: false}) }}>
                Related Content
              </button>
              <button onClick={() => { this.setState({ teaching: true}) }}>
                Teaching
              </button>
              {
                (data.nodeArticle.relationships.field_article_related_content || [])
                .filter(node => (!this.state.teaching || node.field_include_in_the_teaching_se) )
                .map((node, i) => {
                    if (node.__typename == `node__quickfact`) {
                      const newQueryParams = { ...queryParams, quickfact: kebabCase(node.title) }

                      return (
                        <QuickFactCard
                          key={`quick-fact-card-${i}`}
                          link={`?${queryString.stringify(newQueryParams)}`}
                          quickfact={node}
                          i={i}
                          style={{ cursor: `pointer`, textAlign:'left', border: `1px solid #888888`, padding: 20}}
                        />
                      )
                    } else if (node.__typename == `node__article`) {
                      return (
                        <ArticleCard
                          key={`article-${i}`}
                          i={i}
                          article={node}
                          relatedContent
                        />
                      )
                    } else if (node.__typename == `node__faq`) {
                      return (
                        <FAQCard
                          key={`faqcard-${i}`}
                          i={i}
                          faq={node}
                        />
                      )
                    } else if (node.__typename == `node__clip`) {
                      return (
                        <ClipCard
                          key={`clip-card-${i}`}
                          i={i}
                          clip={node}
                          playable
                        />
                      )
                    }
                  }
                )
              }
            </div>
        </div>
      </div>
      </div>
    )
  }
}


export default SingleArticle;

export const pageQuery = graphql`
  query singleQuery($id: String) {
    allImageSharp {
      edges {
        node {
          id
          original {
            width
            height
            src
          }
          resolutions(width: 400) {
            src
          }
        }
      }
    }
    nodeArticle(id: { eq: $id }) {
      id
      field_old_article_discl {
        processed
      }
      field_author {
        processed
      }
      field_author_bio {
        processed
      }
      field_copyright {
        processed
      }
      title
      relationships {
        field_belongs_to_subtheme {
          id
          name
          relationships {
            field_belongs_to_theme {
              id
              name
            }
          }
        }
        field_article_related_content {
          __typename
          ... on node__faq {
            ...FAQFragment
          }
          ... on node__clip {
            ...PosterImageClipFragment
          }
          ... on node__article {
            ...ArticleFragment
          }
          ... on node__quickfact {
            ...QuickfactWithRelatedContentFragment
          }
        }
        field_tags {
          name
          relationships {
            backref_field_tags_node_article {
              ...ArticleFragment
            }
            backref_field_tag_node_faq {
              ...FAQFragment
            }
            backref_field_t_node_clip {
              ...PosterImageClipFragment
            }
          }
        }
        field_author_image {
          localFile {
            publicURL
          }
        }
        field_main_image {
          localFile {
            publicURL

          }
        }
      }
      field_large_callout_text {
        processed
      }
      field_full_version {
        processed
      }
    }
  }
`
