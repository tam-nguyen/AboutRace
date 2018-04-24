const React = require('react')
import styled from 'styled-components'

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
  left: 0;
  top: 0;
  height: 100%;
  width: 100%
`

const Centered = styled.div`
  border: 1px solid #888888;
  position: relative;
  top: 50%;
  width: 50%;
  transform: translate(50%,-50%);
`
const QuickFactOverlay = ({ quickFact }) => (
  <Overlay>
    <Centered
      dangerouslySetInnerHTML={{
        __html: quickFact.field_quickfact.processed,
      }}
    />
  </Overlay>
)

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
            <strong>{data.nodeArticle.title}</strong>
            <div style={{height: 200}}/>
            {
              (data.nodeArticle.relationships.backref_field_related_content || []).map(quickFact => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: quickFact.field_quickfact.processed,
                    }}
                    onClick={() => this.setState({ quickFact: quickFact })}
                  />
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
