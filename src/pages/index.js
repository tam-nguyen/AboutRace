import React from "react"

export default ({ data }) => 
<div>
  <h1>
    {data.allTaxonomyTermThemes.edges[0].node.name}
   </h1>
   <img src={data.allTaxonomyTermThemes.edges[0].node.relationships.field_theme_image.localFile.relativePath} />
</div>

export const query = graphql `
  query MyFilesQuery {
    allTaxonomyTermThemes
      (filter: {tid: {eq: 3}})
      {
      edges {
        node {
          id
          relationships {
            field_theme_image {
              localFile {
                id
                relativePath
                absolutePath
              }
            }
          }
        }
      }
    }}
  
`