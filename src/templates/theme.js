const React = require('react')
const range = require('range')
const ReactFlex = require('react-flex')
require('react-flex/index.css')
const Img = require('gatsby-image')

const Card = props => (
  <div
    style={{
      display: 'inline-block',
      minHeight: 50,
      minWidth: 200,
      textAlign: 'center',
      border: '1px solid #dddddd',
      padding: 10,
      marginLeft: 50,
    }}
  >
    {props.title}
  </div>
)

class SubthemeSection extends React.Component {
  render() {
    const subtheme = this.props.data
    const { Flex, Item } = ReactFlex

    const defaultToEmpty = arr => (arr ? arr : [])

    // TODO (Conrad): Create custom card component for each type of data (article, clip, faq, etc)

    const allRelationships = [
      ...defaultToEmpty(subtheme.relationships.articles).map(article => (
        <Card title={article.title} />
      )),
      ...defaultToEmpty(subtheme.relationships.clips).map(clip => (
        <Card title={clip.title} />
      )),
      ...defaultToEmpty(subtheme.relationships.faqs).map(faq => (
        <Card title={faq.title} />
      )),
    ]

    const description = subtheme.description
      ? [
          <div
            style={{ minWidth: 300, padding: 10 }}
            dangerouslySetInnerHTML={{ __html: subtheme.description.processed }}
          />,
        ]
      : []

    const allCards = [...description, ...allRelationships]

    return (
      <div
        style={{ border: '1px solid #aaaaaa', padding: 20, marginBottom: 50 }}
      >
        <h3>{subtheme.name}</h3>
        <div style={{ display: 'flex', overflowX: 'auto' }}>{allCards}</div>
      </div>
    )
  }
}

class ThemePage extends React.Component {
  render() {
    const theme = this.props.data.taxonomyTermThemes

    return (
      <div>
        <h1>{theme.name}</h1>
        {theme.relationships.field_theme_image
          ? null // TODO: Img here, see https://github.com/gatsbyjs/gatsby/blob/master/examples/using-drupal/src/templates/recipe.js
          : null}

        {theme.description ? (
          <div
            style={{ minWidth: 300 }}
            dangerouslySetInnerHTML={{ __html: theme.description.processed }}
          />
        ) : null}
        {theme.relationships.subthemes.map(subtheme => (
          <SubthemeSection data={subtheme} />
        ))}
        <br />
      </div>
    )
  }
}

export default ThemePage

export const pageQuery = graphql`
  query themeQuery($id: String) {
    taxonomyTermThemes(id: { eq: $id }) {
      id
      name
      description {
        processed
      }
      relationships {
        field_theme_image {
          localFile {
            absolutePath
            relativePath
          }
        }

        subthemes: backref_field_belongs_to_theme {
          name
          id
          description {
            processed
          }
          relationships {
            articles: backref_field_belongs_to_subtheme_node_article {
              title
              field_short_version {
                processed
              }
            }
            clips: backref_field_belongs_to_subtheme_node_clip {
              title
            }
            faqs: backref_field_belongs_to_subtheme_node_faq {
              title
              field_expert_1 {
                value
                format
                processed
              }
            }
          }
        }
      }
    }
  }
`
