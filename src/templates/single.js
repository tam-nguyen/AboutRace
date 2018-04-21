const React = require('react')

export default ({ data }) => (
    <div>
      <strong>{data.nodeArticle.title}</strong>
      
      <div
        dangerouslySetInnerHTML={{
            __html: data.nodeArticle.field_full_version.processed,
        }}
    />     
    </div>
  )

export const pageQuery = graphql`
  query singleQuery($id: String) {
    nodeArticle(id: { eq: $id }) {
      id
      title
      field_full_version {
          processed
      }
    }
}
`