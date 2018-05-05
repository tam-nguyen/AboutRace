const React = require('react')
import styled, { css } from 'styled-components'
import {
  getCards,
  QuickFactCard,
  FAQCard,
  ClipCard,
  ArticleCard
} from '../components/subtheme'
const queryString = require('query-string');
import kebabCase from 'lodash/kebabCase'
import { navigateTo } from 'gatsby-link';

// const MainContent = styled.div`
//   max-width: 700px;
//   margin-left: 48%;
//   margin-right: 12%;
// `
const LargeCalloutText = styled.div`
  font-size: 28px;
  font-weight: normal;
`
const ArticleHeader = styled.div`
  width: 100%;
  height: 66vh;
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: lightgrey;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -999;
`

const ArticleMain = styled.div`
  background-color: white;
  padding: 30px;
`

const Overlay = styled.div`
  background-color: #FFFFE0;
  position: fixed;
  opacity: 0.8;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  ${props => props.blue && css`
    background-color: #E0FFFF;
  `}
`

const Centered = styled.div`
  border: 1px solid #888888;
  opacity: 1;
  position: relative;
  top: 50%;
  width: 50%;
  padding: 20px;
  transform: translate(50%, -50%);
  ${props => props.wide && css`
    transform: translate(10%, -50%);
    width: 80%;
  `}
`
class QuickFactOverlay extends React.Component {
  render() {
    const { quickFact } = this.props

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
      <Overlay>
        <Centered>
          <div onClick={this.props.closeHandler} style={{float: `right`, color: `red`, cursor: `pointer`}}>
            <b>Close</b>
          </div>
          <h3>{quickFact.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: quickFact.field_quickfact.processed,
            }}
          />
          <div style={{ width: `100%`, display: `flex`, }}>
            {
              getCards(quickClipLinks).slice(0,2)
            }
          </div>
        </Centered>
      </Overlay>
    )
  }
}

class TagOverlay extends React.Component {
  render() {
    const { tag, queryParams = {} } = this.props

    const quickClipLinks = {
      articles: tag.relationships.backref_field_tags_node_article ,
      faqs: tag.relationships.backref_field_tag_node_faq,
      clips: tag.relationships.backref_field_t_node_clip,
      quickFacts: []
    }

    return (
      <Overlay blue>
        <Centered wide>
          <div onClick={this.props.closeHandler} style={{float: `right`, color: `red`, cursor: `pointer`}}>
            <b>Close</b>
          </div>
          {
            [`faq`, `article`, `clip`].map(articleType => (
              <span
                style={{ marginRight: 20, cursor: `pointer` }}
                onClick={ () => {
                  const newQueryParams = { ... queryParams }
                  if (newQueryParams[`type`] == articleType){
                    delete newQueryParams[`type`]
                  } else {
                    newQueryParams[`type`] = articleType;
                  }
                  navigateTo(`?${queryString.stringify(newQueryParams)}`)
                }}
              >
                { articleType }
              </span>
            ))
          }
          <br/>
          <br/>
          <div style={{ width: `100%`, display: 'flex', 'flex-wrap': 'wrap', height: `80vh`, overflowY: `auto`}}>
            {
              getCards(quickClipLinks, queryParams[`type`])
            }
          </div>
        </Centered>
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
    const { data } = this.props
    const queryParams = queryString.parse(this.props.location.search);
    const quickFact = queryParams.quickfact ?
      (data.nodeArticle.relationships.field_article_related_content || []).filter(node => (node.__typename === `node__quickfact` && kebabCase(node.title) == queryParams.quickfact)
      )[0] :
      null

    console.log(`quickfact`)
    console.log(quickFact)

    const tag = queryParams.tag ?
      (data.nodeArticle.relationships.field_tags || []).filter(tag => (kebabCase(tag.name) == queryParams.tag)
      )[0] :
      null

    return (
      <div className="row" style={{ overflowY: queryParams.tag ? "hidden" : "auto" }}>
        {
          queryParams.quickfact ?
            <QuickFactOverlay
              quickFact={quickFact}
              closeHandler={() => {
                navigateTo(`?`)
              }}
            /> :
            null
        }
        {
          queryParams.tag ?
            <TagOverlay
              queryParams={queryParams}
              tag={tag}
              closeHandler={() => {
                navigateTo(`?`)
              }}
            /> :
            null
        }
        <ArticleHeader
          background={
            data.nodeArticle.relationships.field_main_image &&
            data.nodeArticle.relationships.field_main_image.localFile.publicURL
          }
        />
          <div className="column _25">
          </div>
          <div className="column">
          <img src={
             data.nodeArticle.relationships.field_author_image &&
             data.nodeArticle.relationships.field_author_image.localFile.publicURL
          } />
            <strong>{data.nodeArticle.title}</strong>
            <div style={{height: 200}}/>
            {
              (data.nodeArticle.relationships.field_article_related_content || []).map((node, i) => {
                  if (node.__typename == `node__quickfact`) {
                    return (
                      <QuickFactCard
                        onClick={() => {
                          console.log(node.title)
                          const newQueryParams = { ...queryParams, quickfact: kebabCase(node.title) }
                          navigateTo(`?${queryString.stringify(newQueryParams)}`)
                        }}
                        quickfact={node}
                        i={i}
                        style={{ cursor: `pointer`, border: `1px solid #888888`, padding: 20}}
                      />
                    )
                  } else if (node.__typename == `node__article`) {
                    return (
                      <ArticleCard
                        i={i}
                        article={node}
                      />
                    )
                  } else if (node.__typename == `node__faq`) {
                    return (
                      <FAQCard
                        i={i}
                        article={node}
                      />
                    )
                  } else if (node.__typename == `node__clip`) {
                    return (
                      <ClipCard
                        i={i}
                        article={node}
                      />
                    )
                  }
                }
              )
            }
          </div>

          <ArticleMain className="column _60">
            {
              (data.nodeArticle.relationships.field_tags || []).map(tag =>
                <span
                  onClick={()=>{
                    const newQueryParams = { ...queryParams, tag: kebabCase(tag.name) }
                    navigateTo(`?${queryString.stringify(newQueryParams)}`)
                  }}
                  style={{ marginRight: 20, color: `blue`, cursor: `pointer` }}
                >
                  <b>{tag.name}</b>
                </span>
              )
            }
            <LargeCalloutText
              dangerouslySetInnerHTML={{
                __html: data.nodeArticle.field_large_callout_text.processed,
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: data.nodeArticle.field_full_version.processed,
              }}
            />
          </ArticleMain>
          <div className="column _25" />

      </div>
    )
  }
}

export default SingleArticle

export const pageQuery = graphql`
  query singleQuery($id: String) {
    nodeArticle(id: { eq: $id }) {
      id
      title
      relationships {
        field_article_related_content {
          __typename
          ... on node__faq {
            title
            field_expert_1 {
              processed
            }
          }
          ... on node__clip {
            title
            relationships {
              field_clip {
                localFile {
                  publicURL
                  internal {
                    mediaType
                  }
                }
              }
            }
          }
          ... on node__article {
            title
            field_short_version {
              processed
            }
          }
          ... on node__quickfact {
            title
            field_quickfact {
              value
              format
              processed
              summary
            }
            relationships {
              field_related_content {
                __typename
                ... on node__faq {
                  title
                  field_expert_1 {
                    processed
                  }
                }
                ... on node__clip {
                  title
                  relationships {
                    field_clip {
                      localFile {
                        publicURL
                        internal {
                          mediaType
                        }
                      }
                    }
                  }
                }
                ... on node__article {
                  title
                  field_short_version {
                    processed
                  }
                }
              }
            }
          }
        }
        field_tags {
          name
          relationships {
            backref_field_tags_node_article {
              title
              field_short_version {
                processed
              }
            }
            backref_field_tag_node_faq {
              title
              field_expert_1 {
                processed
              }
            }
            backref_field_t_node_clip {
              title
              relationships {
                field_clip {
                  localFile {
                    publicURL
                    internal {
                      mediaType
                    }
                  }
                }
              }
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
        backref_field_related_content {
          title
          id
          field_quickfact {
            value
            format
            processed
            summary
          }
          relationships {
            field_related_content {
              __typename
              ... on node__faq {
                title
                field_expert_1 {
                  processed
                }
              }
              ... on node__clip {
                title
                relationships {
                  field_clip {
                    localFile {
                      publicURL
                      internal {
                        mediaType
                      }
                    }
                  }
                }
              }
              ... on node__article {
                title
                field_short_version {
                  processed
                }
              }
            }
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
