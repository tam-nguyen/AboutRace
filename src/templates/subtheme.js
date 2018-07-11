import React from "react"
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import SubthemeSection from '../components/subtheme.js'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const queryString = require('query-string');

const FlipMove = require('react-flip-move');

const Container = styled.div`
  margin-left: 75px;
`
const ThemeImage = styled.div`
  height: 100vh;
  width: 100%;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
  z-index: -999999999999999;
`

const ThemesMenu = styled.div`
  position: fixed;
  top: 0px;
  left: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MenuItem = styled(Link)`
  cursor: pointer;
  textDecoration: none;
  color:inherit;
  height: 25px;
  width: 25px;
  background-color: ${props => props.selected ? `#000` : `#bbb`};
  border-radius: 50%;
  display: inline-block;
  margin-top: 10px;
  margin-left: 2.5px;
  box-shadow: 0px 0px 5px #fff;
`

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none !important;
  color:inherit;
`

class SubThemePage extends React.Component {
  render() {
    const {data, pageContext, location} = this.props;
    const {field_theme_image, theme} = pageContext;
    const {allTaxonomyTermSubthemes, taxonomyTermSubthemes} = data;
    const subtheme = taxonomyTermSubthemes;

    const themeLinks = allTaxonomyTermSubthemes.edges.map( edge => `/subthemes/${kebabCase(edge.node.name)}`);

    const queryParams = queryString.parse(this.props.location.search);

    const getShortname = subtheme => {
      const parts = subtheme.name ? subtheme.name.split('-') : [];
      return encodeURIComponent(kebabCase(parts[parts.length - 1]))
    }

    const background = field_theme_image && field_theme_image.localFile.publicURL;
      
    return (
      <div>
        <ThemeImage background={background} />
        <Container>

          <StyledLink to={theme.path}>
              <img style={{height: 24, opacity:0.8, display:'inline-block', marginBottom:0, marginRight:15, verticalAlign:'middle'}} src={require('../assets/images/back.svg')} />
              <h4 style={{marginBottom:0, display:'inline-block', verticalAlign:'middle'}}>{theme.name}</h4>
          </StyledLink>

          <h1>{taxonomyTermSubthemes.name}</h1>
          <p
            dangerouslySetInnerHTML={{ __html: taxonomyTermSubthemes.description ? taxonomyTermSubthemes.description.processed : `<br/>`}}
          />

          <ThemesMenu>
            {
              themeLinks.map((link, i) => 
                <MenuItem key={`menuitem-${i}`} to={link} selected={link === location.pathname}/>
              )
            }
          </ThemesMenu>

          {
            <SubthemeSection
              data={subtheme}
              key={getShortname(subtheme)}
              name={getShortname(subtheme)}
              filter={queryParams[getShortname(subtheme)]}
              queryParams={queryParams}
            />
          }
        </Container>
      </div>
    )
  }
}

export default SubThemePage

export const pageQuery = graphql`
  query subThemeQuery($id: String) {
    allTaxonomyTermSubthemes {
      edges {
        node {
          id
          name
        }
      }
    }

    taxonomyTermSubthemes(id: {eq: $id}) {
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

`
