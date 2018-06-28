const React = require('react')
const ReactFlex = require('react-flex')
const queryString = require('query-string');

require('react-flex/index.css')
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import SubthemeSection from '../components/subtheme.js'

const FlipMove = require('react-flip-move');
import styled from 'styled-components';


const ThemeTitle = styled.div`
  margin-top: 15px;
  margin-bottom:15px;
  color: inherit;
  font-family: "lato";
  font-weight: 800;
  text-rendering: optimizeLegibility;
  font-size: 42px;
  line-height: 1
  letter-spacing: 0.04em;
  // color:white;
`
const ThemeDescription = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 0.02em;
  position:relative;
  z-index:99999;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Lato';
`
const ThemeHeader = styled.div`
  height: 100vh;
  // opacity: 0.8;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: lightgrey;
  position: fixed;
  top: 0;
  left: 200px;
  right: 0;
  z-index: -999;
`
const HeaderDimmer = styled.div`
  width: 100%;
  position: absolute;
  left:0;
  right:0;
  top:0;
  z-index: 99999999;
  height:210px;
  mix-blend-mode: multiply;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+16,fcfcfc+100&0.93+16,0+100 */
  background: -moz-linear-gradient(top, rgba(0,0,0,0.93) 16%, rgba(252,252,252,0) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(0,0,0,0.93) 16%,rgba(252,252,252,0) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(0,0,0,0.93) 16%,rgba(252,252,252,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ed000000', endColorstr='#00fcfcfc',GradientType=0 ); /* IE6-9 */
`
const Dimmer = styled.div`
  width: 100%;
  position: absolute;
  left:0;
  right:0;
  bottom:0;
  height:41vh;
  mix-blend-mode: multiply;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+61&0+0,0.93+69 */
  background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 61%, rgba(0,0,0,0.93) 69%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.82) 61%,rgba(0,0,0,0.93) 69%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.82) 61%,rgba(0,0,0,0.93) 69%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#ed000000',GradientType=0 ); /* IE6-9 */
`

const ThemeIntro = styled.div`
  background-color: rgba(247,247,247,0.97);
  padding: 45px 75px;
  border-bottom: solid thin grey;
  margin-left: 60px;
  min-height: 100vh;
  width: 800px;
`
const ThemeMain = styled.div`
  position: absolute;
  width:100%;
`

const ThemesMenu = styled.div`
  position: fixed;
  top: 0px;
  left: 275px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MenuItem = styled(Link)`
  cursor: pointer;
  textDecoration: none;
  color:inherit;
  height: 18px;
  width: 18px;
  background-color: ${props => props.selected ? `#4b5256` : `#adc6d2`};
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 15px;
  margin-left: 2.5px;
`

const AllThemesLink = styled(Link)`
  cursor: pointer;
  text-decoration: none !important;
  color:inherit;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`
const CardLink = styled(Link)`
  cursor: pointer;
  text-decoration: none !important;
  color:inherit;
  width: 100%;
`

const Card = styled.div`
  border-radius: 5px;
  border: 1px solid #bbb;
  padding: 10px;
  margin-bottom: 10px;
`

const CardTitle = styled.h4`
`

const ChevronButton = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 50px;
`

class ThemePage extends React.Component {
  render() {
    const {data, location} = this.props;
    const {taxonomyTermThemes, allTaxonomyTermThemes} = data;
    const theme = taxonomyTermThemes;

    const themeLinks = allTaxonomyTermThemes.edges.map( edge => `/themes/${kebabCase(edge.node.name)}`);

    const queryParams = queryString.parse(this.props.location.search);

    const getShortname = subtheme => {
      const parts = subtheme.name.split('-');
      return encodeURIComponent(kebabCase(parts[parts.length - 1]))
    }

    const getDescription = subtheme => {
      let result = '<br/>';
      if(subtheme.description)
        if(subtheme.description.processed)
          result = subtheme.description.processed;

      return result;
    }

    const getLink = subtheme => {
      let result = `/subthemes/${kebabCase(subtheme.name)}`

      return result;
    }

    const sorted = theme.relationships.subthemes.sort((a, b) => {
      var nameA = getShortname(a);
      var nameB = getShortname(b);
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    return (
      <div>
       
        <ThemeHeader background={theme.relationships.field_theme_image && theme.relationships.field_theme_image.localFile.publicURL}>
           &nbsp;
        </ThemeHeader>
        <ThemeMain>

          <ThemesMenu>
            {
              themeLinks.map((link, i) => 
                <MenuItem key={`menuitem-${i}`} to={link} selected={link === location.pathname}/>
              )
            }
          </ThemesMenu>

          <ThemeIntro>
            <AllThemesLink to='/themes'>
              {/* <Huge>‹</Huge> */}
              <img style={{height: 24, opacity:0.8, display:'inline-block', marginBottom:0, marginRight:15, verticalAlign:'middle'}} src={require('../assets/images/back.svg')} />
              <h4 style={{marginBottom:0, display:'inline-block', verticalAlign:'middle'}}>All Themes</h4>
            </AllThemesLink>
            <ThemeTitle>{theme.name}</ThemeTitle>
            {
              theme.description
              ?
              <ThemeDescription
                dangerouslySetInnerHTML={{ __html: theme.description.processed }}
              />
              :
              null
            }

            {
              sorted.map((subtheme, i) => 
                <CardLink key={`subtheme-${i}`} to={getLink(subtheme)}>
                  <Card>
                    <Row>
                      <Col style={{flex:1}}>
                        <CardTitle>{getShortname(subtheme)}</CardTitle>
                        <div
                          dangerouslySetInnerHTML={{ __html: getDescription(subtheme) }}
                        />
                      </Col>
                      <Col>
                        <ChevronButton>›</ChevronButton>
                      </Col>
                    </Row>
                  </Card>
                </CardLink>
              )
            }
          </ThemeIntro>

          {/*
            sorted.map(subtheme => (
                <SubthemeSection
                  data={subtheme}
                  key={getShortname(subtheme)}
                  name={getShortname(subtheme)}
                  filter={queryParams[getShortname(subtheme)]}
                  queryParams={queryParams}
                />
              ))
          */}
        </ThemeMain>

        <br />
      </div>
    )
  }
}

export default ThemePage

export const pageQuery = graphql`
  query themeQuery($id: String) {
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
        }
      }
    }
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
              ...ArticleFragment
            }
            clips: backref_field_belongs_to_subtheme_node_clip {
              ...PosterImageClipFragment
            }
            interviews: backref_field_which_subtheme_does_this_b_node_interview {
              ...InterviewFragment
            }
            faqs: backref_field_belongs_to_subtheme_node_faq {
              ...FAQFragment
            }
          }
        }
      }
    }
  }
`
