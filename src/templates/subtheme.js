import React from "react"
import kebabCase from 'lodash/kebabCase'
import {
  Link,
  SubthemeContainer,
} from '../components'
import styled, { css } from 'styled-components'
import { graphql } from 'gatsby'
import {
  backgroundColor,
  titleColor,
  grandColor
} from '../colors'

const queryString = require('query-string');

const Container = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 200px;
  background: ${backgroundColor};
  min-height: 100vh;
`

const gradient = `linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0.15))`


const Main = styled.div`
  background-size: cover !important;
  text-align: center;
  border-radius: 3px;
  color: white;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : `none`};
  background: ${ props => props.background ? `${gradient}, url(${props.background}) center no-repeat` : `none`};
  position: relative;
  z-index: 3;
`

const Header = styled.div`
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  color: ${titleColor};
  font-family: Lato;
  font-size: 42pt;
  font-weight: bold;
  line-height: 60px;
  margin-bottom: 2vh;
`

const TopLink = styled(Link)`
  position: absolute;
  top: 10px;
  left: 10px;
`

const Description = styled.div`
  padding-left: 10vw;
  padding-right: 10vw;
  color: #DBDBDB;
`

const GrandTitle = styled.div`
  position: fixed;
  top: 2vh;
  width: 100vw;
  font-family: Tisa-Pro;
  font-size: 24pt;
  text-align: center;
  line-height: 30px;
  letter-spacing: 36px;
  color: ${grandColor};
  z-index: 2;
`

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 10vh;
  width: 100vw;
  z-index: 2;

  font-family: Lato;
  font-size: 14pt;
  line-height 30px;

  text-transform: uppercase;
`

const MenuLink = styled(Link)`
  width: 120px;
  text-align: center;
`

class SubThemePage extends React.Component {

  componentDidMount() {
    document.body.style.backgroundColor = backgroundColor;
  }

  render() {
    const {data, pageContext} = this.props;
    const {field_theme_image, theme} = pageContext;
    const {taxonomyTermSubthemes} = data;
    const subtheme = taxonomyTermSubthemes;

    const queryParams = queryString.parse(this.props.location.search);

    const getShortname = subtheme => {
      const parts = subtheme.name ? subtheme.name.split('-') : [];
      return encodeURIComponent(kebabCase(parts[parts.length - 1]))
    }

    const background = field_theme_image && field_theme_image.localFile.publicURL;
    const title = subtheme.name;
    const description = taxonomyTermSubthemes.description ? taxonomyTermSubthemes.description.processed : `<br/>`;

    const links = [
      { title: 'overview', link: '/the-film' },
      { title: 'themes', link: '/' },
      { title: 'articles', link: '/articles' },
      { title: 'interviews', link: '/interviews' },
      { title: 'q&a', link: '/qa' },
      { title: 'clips', link: '/clips' },
      { title: 'teaching', link: '/teaching' },
      { title: 'about', link: '/about' },
    ]

    return (
      <Container>

        <GrandTitle>
          RACE: THE POWER OF AN ILLUSION
        </GrandTitle>

        <Menu>
        {
          links.map( ({title, link}, key) => <MenuLink to={link} key={key}>{title}</MenuLink> )
        }
        </Menu>

        <Main background={background}>
          <Header>
            <TopLink to='/'>〈 &nbsp; All themes</TopLink>
            <Title>{title}</Title>
            <Description dangerouslySetInnerHTML={{ __html: description }} />
          </Header>

          <SubthemeContainer
            data={subtheme}
            key={getShortname(subtheme)}
            name={getShortname(subtheme)}
            filter={queryParams[getShortname(subtheme)]}
            queryParams={queryParams}
          />
        </Main>

      </Container>
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
