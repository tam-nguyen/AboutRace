import React from 'react'

const ContentNodeComponent = ({ data }) => (
  <li>
    Article: <strong>{data.title}</strong> <code>{data.id}</code>
  </li>
)

const SubThemeComponent = ({ data }) => (
  <li>
    Subtheme: <strong>{data.name}</strong> <code>{data.id}</code>
    {data.relationships.backref_field_belongs_to_subtheme ? (
      <ul>
        {data.relationships.backref_field_belongs_to_subtheme.map(article => (
          <ContentNodeComponent data={article} />
        ))}
      </ul>
    ) : (
      <span style={{ color: 'red' }}> (no articles)</span>
    )}
  </li>
)

const ThemeComponent = ({ data }) => (
  <li>
    Theme: <strong>{data.name}</strong> <code>{data.id}</code>
    {data.relationships.backref_field_belongs_to_theme ? (
      <ul>
        {data.relationships.backref_field_belongs_to_theme.map(subTheme => (
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
    {data.allTaxonomyTermThemes.edges.map(({ node }) => (
      <ThemeComponent data={node} />
    ))}
  </ul>
)

export const query = graphql`
  query IndexQuery {
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
          relationships {
            backref_field_belongs_to_theme {
              name
              id
              relationships {
                backref_field_belongs_to_subtheme {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`
