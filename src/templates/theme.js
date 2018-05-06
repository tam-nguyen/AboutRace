const React = require('react')
const ReactFlex = require('react-flex')
const queryString = require('query-string');

require('react-flex/index.css')
import Img from 'gatsby-image'
import kebabCase from 'lodash/kebabCase'
import Card from '../components/card.js'
import SubthemeSection from '../components/subtheme.js'

const FlipMove = require('react-flip-move');
import styled from 'styled-components';

const ThemeDescription = styled.div`
  color: white;
  font-weight: normal;
  margin-top: 30px;
  font-size: 24px;
  line-height: 1.6;
  width: 630px;
`
const ThemeHeader = styled.div`
  width: 100%;
  height: 66vh;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: lightgrey;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -999;
`

const ThemeIntro = styled.div`
  margin-left: 30px;
  margin-top: 120px;
`

const ThemeMain = styled.div`
  position: absolute;
  top: 66vh;
  width: 100%;
`

class ThemePage extends React.Component {
  render() {
    const theme = this.props.data.taxonomyTermThemes

    const queryParams = queryString.parse(this.props.location.search);

    const getShortname = (subtheme) => {
      const parts = subtheme.name.split('-');
      return encodeURIComponent(kebabCase(parts[parts.length - 1]))
    }

    return (
      <div>
        <ThemeHeader background={theme.relationships.field_theme_image && theme.relationships.field_theme_image.localFile.publicURL}>
          <ThemeIntro>
            <h3>{theme.name}</h3>
            {theme.description ? (
              <ThemeDescription
                dangerouslySetInnerHTML={{ __html: theme.description.processed }}
              />
            ) : null}
          </ThemeIntro>

        </ThemeHeader>
        <ThemeMain>
          {
            theme.relationships.subthemes.sort((a, b) => {
                var nameA = getShortname(a);
                var nameB = getShortname(b);
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              }).map(subtheme => (
                <SubthemeSection
                  data={subtheme}
                  name={getShortname(subtheme)}
                  filter={queryParams[getShortname(subtheme)]}
                  queryParams={queryParams}
                />
              ))
          }
        </ThemeMain>

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
            publicURL
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
              changed
              field_short_version {
                processed
              }
            }
            clips: backref_field_belongs_to_subtheme_node_clip {
              title
              changed
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
              relationships {
                field_faq_image {
                  localFile {
                    publicURL
                  }
                }
              }
              field_expert_1 {
                value
                format
                processed
              }
              changed
            }
            quickfacts: backref_field_belongs_to_subtheme_node_quickfact {
              title
              changed
            }
          }
        }
      }
    }
  }
`
