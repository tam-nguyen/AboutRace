const React = require('react')
const ReactFlex = require('react-flex')
require('react-flex/index.css')
import Img from 'gatsby-image'


import Card from '../components/card.js'
import SubthemeSection from '../components/subtheme.js'



class ThemePage extends React.Component {
  render() {
    const theme = this.props.data.taxonomyTermThemes
    return (
      <div>
        <h1>{theme.name}</h1>
        {theme.relationships.field_theme_image ? (
          <Img
            sizes={
              theme.relationships.field_theme_image.localFile.childImageSharp
                .sizes
            }
          />
        ) : null}
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
            childImageSharp {
              sizes(maxWidth: 960, quality: 90) {
                ...GatsbyImageSharpSizes
              }
            }
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
            faqs: backref_field_belongs_to_subtheme_node_faq {
              title
              field_expert_1 {
                value
                format
                processed
              }
            }
            quickfacts: backref_field_belongs_to_subtheme_node_quickfact {
              title
            }
          }
        }
      }
    }
  }
`
