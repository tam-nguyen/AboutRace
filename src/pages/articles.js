import React from 'react'
import styled from 'styled-components'


// const ContentNodeComponent = ({ data }) => <li>{data.name}</li>

// const SubThemeComponent = ({ data }) => (
//   <li>
//     Subtheme: <strong>{data.name}</strong> <code>{data.id}</code>
//     {/* {data.relationships.field_belongs_to_theme ? (
//       <ul>
//         {data.relationships.field_belongs_to_theme.map(article => (
//           <ContentNodeComponent data={article} />
//         ))}
//       </ul>
//     ) : (
//       <span style={{ color: 'red' }}> (no articles)</span>
//     )} */}
//   </li>
// )

const Articles = styled.div`
  display: flex;
  flex-direction: column;
  margin: -1em;
  max-width: 1300px;
`
const ArticleCard = styled.div`
  margin: 1em;
  border: 1px solid red;
  padding: 0.5em;
  max-width: 700px;
  display: flex;
  &:nth-child(odd) {
    align-self: flex-end;
  }
`


const ArticleSummary = ({ data, right }) => {
  console.log(data)
  return (
      <ArticleCard>
        Article: <strong>{data.title}</strong>
        {data.field_medium_version && (
          <div
            dangerouslySetInnerHTML={{
              __html: data.field_medium_version.processed,
            }}
          />
        )}
        {/* {data.relationships.field_belongs_to_subtheme ? (
        <ul>
          {data.relationships.field_belongs_to_subtheme.map(subTheme => (
            <ArticleSummary data={subTheme} />
          ))}
        </ul>
      ) : (
        <div>No subthemes</div>
      )} */}
      </ArticleCard>
  )
}

export default ({ data }) => (
  <Articles>
    {data.allNodeArticle.edges.map((edge, i) => (
      <ArticleSummary data={edge.node} />
    ))}
  </Articles>
)

export const query = graphql`
  query ArticlesQuery {
    allNodeArticle {
      edges {
        node {
          id
          title
          field_medium_version {
            processed
          }
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
          }
        }
      }
    }
  }
`
