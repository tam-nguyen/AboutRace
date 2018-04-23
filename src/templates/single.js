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

export default ({ data }) => (
  <div className="row">
    <ArticleHeader
      background={
        data.nodeArticle.relationships.field_main_image &&
        data.nodeArticle.relationships.field_main_image.localFile.publicURL
      }
    />
      <div className="column _25" />
      <div className="column">
        <strong>{data.nodeArticle.title}</strong>
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
