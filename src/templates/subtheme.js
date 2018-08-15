import React from "react"
import kebabCase from 'lodash/kebabCase'
import styled, { css } from 'styled-components'
import get from 'lodash/get'
import { graphql } from 'gatsby'

import {
  Layout,
  Link,
  SubthemeContainer,
  SVGChevron,
} from '../components'

import {
  backgroundColor,
  titleColor,
  grandColor,

  red,
  white,
  getGradient
} from '../colors'

const queryString = require('query-string');

const Container = styled.div`
  background: ${backgroundColor};
  min-height: 100vh;

  position: relative;

  z-index: 0;
`

const Main = styled.div`
  background-size: cover !important;
  text-align: center;
  border-radius: 3px;
  color: white;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : `none`};
  position: relative;
  z-index: 3;
`
// min-height: 340px;
const Header = styled.div`
  position: relative;

  z-index: 1;

  padding-top: 95px;
  padding-left: 138px;

  min-height: 737px;
  display: flex;
  flex-direction: column;
  
  transition: all .5s ease;

  @media (max-width: 812px) { /* mobile */
    padding-left: 36px;
    padding-right: 36px;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -2;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background-size: cover !important;
    background-attachment: fixed;

    background: ${ props => props.background ? `url(${props.background}) center no-repeat` : `none`};
    filter: blur(12px);
  }

  
  &::after {
    content: '';
    position: absolute;
    z-index: -1;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background: ${ props => props.gradient ? props.gradient : null };
    filter: opacity(54%);
    backdrop-filter: blur(12px);
  }
`

const ChevronContainer = styled.div`
  cursor: pointer;

  position: absolute;

  left: -25px;
  
  width: 16px;
  height: 30px;

  transform: rotate(180deg);

  transition: all 0.3s ease-out;

  @media (max-width: 812px) { /* mobile */
    left: 0;
    top: -30px;
  }
`

const Chevron = () => <ChevronContainer>
  <SVGChevron color={red} />
</ChevronContainer>
///

const Row = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;

  align-items: center;
`

const Title = styled.div`
  color: ${white};
  font-family: Lato;
  font-size: 42pt;
  font-weight: bold;
  line-height: 60px;

  padding-top: 7px;
  padding-bottom: 7px;
`

const TopLink = styled(Link)`
  font-family: Lato;
  font-size: 18pt;
  font-weight: 600;
  line-height: 60px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${white};
`

const Description = styled.div`
  font-family: 'Tisa Pro';
  font-size: 20pt;
  line-height: 24px;
  color: ${white};

  max-width: 600px;
`

const Subthemes = styled.div`
  position: absolute;
  top: 500px;

  z-index: 1;
`

class SubThemePage extends React.Component {

  componentDidMount() {
    document.body.style.backgroundColor = backgroundColor;
  }

  render() {
    const {
      data, 
      pageContext,
      location
    } = this.props;

    const {
      field_theme_image, 
      theme,
      color
    } = pageContext;
    const {taxonomyTermSubthemes} = data;
    const subtheme = taxonomyTermSubthemes;

    const queryParams = queryString.parse(this.props.location.search);

    const getShortname = subtheme => {
      const parts = subtheme.name ? subtheme.name.split('-') : [];
      return encodeURIComponent(kebabCase(parts[parts.length - 1]))
    }

    const background = get(this, 'props.pageContext.field_theme_image.localFile.publicURL');
    const title = subtheme.name.indexOf(':') >=0 ? subtheme.name.split(':')[1] : subtheme.name;
    const description = taxonomyTermSubthemes.description ? taxonomyTermSubthemes.description.processed : `<br/>`;

    const gradient = getGradient(color)

    return (
      <Layout location={location}>
        <Container>

          <Header 
            gradient={gradient}
            background={background}
          >
            <Row>
              <Chevron />
              <TopLink href='/'>{theme.name}</TopLink>
            </Row>
            <Title>{title}</Title>
            <Description dangerouslySetInnerHTML={{ __html: description }} />
          </Header>

          <Subthemes>
            <SubthemeContainer
              data={subtheme}
              key={getShortname(subtheme)}
              name={getShortname(subtheme)}
              filter={queryParams[getShortname(subtheme)]}
              queryParams={queryParams}
            />
          </Subthemes>

        </Container>
      </Layout>
    )
  }
}

export default SubThemePage

export const pageQuery = graphql`
  query subThemeQuery($id: String) {

    taxonomyTermSubthemes(id: {eq: $id}) {
      name
      id
      description {
        processed
      }
      relationships {
        articles: backref_field_belongs_to_subtheme_node_article {
          ...FullArticleFragment
        }
        clips: backref_field_belongs_to_subtheme_node_clip {
          ...FullClipFragment
        }
        interviews: backref_field_which_subtheme_does_this_b_node_interview {
          ...FullInterviewFragment
        }
        faqs: backref_field_belongs_to_subtheme_node_faq {
          ...FullQAFragment
        }
      }
    }
  }

`
