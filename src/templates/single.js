const React = require('react')
import styled from 'styled-components';

const MainContent = styled.div`
  max-width: 700px;
  margin-left: 48%;
  margin-right: 12%;
`
const LargeCalloutText = styled.div`
  font-size: 24px;
  font-weight: 600;
`


export default ({ data }) => (
    <div>
      <strong>{data.nodeArticle.title}</strong>
      
      <MainContent>
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
       
      </MainContent>  
    </div>
  )

export const pageQuery = graphql`
  query singleQuery($id: String) {
    nodeArticle(id: { eq: $id }) {
      id
      title
      field_large_callout_text {
        processed
      }
      field_full_version {
          processed
      }
    }
}
`