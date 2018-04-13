import React from 'react'

// const ContentNodeComponent = ({ data }) => <li>{data.name}</li>

const SubThemeComponent = ({ data }) => (
  <li>
    Subtheme: <strong>{data.name}</strong> <code>{data.id}</code>
    {/* {data.relationships.field_belongs_to_theme ? (
      <ul>
        {data.relationships.field_belongs_to_theme.map(article => (
          <ContentNodeComponent data={article} />
        ))}
      </ul>
    ) : (
      <span style={{ color: 'red' }}> (no articles)</span>
    )} */}
  </li>
)

const ThemeComponent = ({ data }) => (
  <li>
    Article: <strong>{data.title}</strong> <code>{data.id}</code>
    {data.relationships.field_belongs_to_subtheme ? (
      <ul>
        {data.relationships.field_belongs_to_subtheme.map(subTheme => (
          <SubThemeComponent data={subTheme} />
        ))}
      </ul>
    ) : (
      <div>No subthemes</div>
    )}
  </li>
)

export default ({ data }) => (
  <ul>
    {data.allNodeArticle.edges.map(({ node }) => (
      <ThemeComponent data={node} />
    ))}
  </ul>
)

export const query = graphql`
  query ArticlesQuery {
    allNodeArticle {
      edges {
        node {
          id
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
          }
        }
      }
    }
  }
`
