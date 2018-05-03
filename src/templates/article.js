const React = require('react')
import styled from 'styled-components'
import { getCards } from '../components/subtheme'
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
  width: 100%
`

const Centered = styled.div`
  border: 1px solid #888888;
  opacity: 1;
  position: relative;
  top: 50%;
  width: 50%;
  padding: 20px;
  transform: translate(50%, -50%);
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
          <div onClick={this.props.closeHandler} style={{float: `right`, color: `red`}}>
            <b>Close</b>
          </div>
          <h3>{quickFact.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: quickFact.field_quickfact.processed,
            }}
          />
          <div style={{ width: `100%`, display: `flex`}}>
            {
              getCards(quickClipLinks).slice(0,2)
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

    return (
      <div className="row">
        {
          this.state.quickFact ?
            <QuickFactOverlay
              quickFact={this.state.quickFact}
              closeHandler={() => this.setState({ quickFact: null })}
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
              (data.nodeArticle.relationships.backref_field_related_content || []).map(quickFact => (
                  <div style={{ cursor: `pointer`, border: `1px solid #888888`, padding: 20}}>
                    <h3>{quickFact.title}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: quickFact.field_quickfact.processed,
                      }}
                      onClick={() => this.setState({ quickFact: quickFact })}
                    />
                  </div>
                )
              )
            }
          </div>

          <ArticleMain className="column _60">
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
