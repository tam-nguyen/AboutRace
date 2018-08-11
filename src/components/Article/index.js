import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  Link,
  SVGArrow
} from '../'

import {
  white,
  whiteShadow,
  backgroundColor,
  red,
} from '../../colors'

const TICKER = 'ARTICLE'

const Container = styled.div`
  position: relative;
  width: 100vw;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const MainImage = styled.div`
  position: absolute;
  top: 222px;
  left: 60px;
  right: 60px;

  width: auto;
  height: 40vh;

  z-index: 0;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background-size: cover !important;
  background-attachment: fixed;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  transition: all .5s ease;

  @media (min-width: 1025px) { /* desktop */
    top: 0;
    left: 0;
    right: 0;
    
    height: 80vh;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const TextContainer = styled.div`
  position: absolute;
  
  z-index: 1;

  width: 80vw;
  left: 0;
  right: 0;
  top: 50vh;

  margin: auto;

  @media (min-width: 1025px) { /* desktop */
    width: 1000px;
    top: 70vh;
  }

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
  }
`

const TextInnerContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;

  width: auto;

  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;

  background-color: ${white};
  color: ${backgroundColor};

  margin-bottom: 50px;

  &::before {
    content: '${TICKER}';
    position: absolute;

    height: 50px;

    font-family: Lato;
    font-size: 12;
    line-height: 50px;
    letter-spacing: 0.22em;

    top: -50px;
    left: 0;

    background-color: ${white};

    padding-left: 14px;
    padding-right: 14px;

    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-family: 'Tisa Pro';
  font-size: 36px;
  line-height: 48px;
`

const Author = styled.div`
  font-family: Lato;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  padding-top: 18px;
  padding-bottom: 28px;
`

const Text = styled.div`
  font-family: 'Tisa Pro';
  font-size: 20px;
  line-height: 28px;
`

const ContentBar = styled(Column)`
  flex: 1;
  padding: 70px;
  box-shadow: 0px 3px 3px rgba(0,0,0,0.16);
`

const SideBar = styled(Column)`
  display: none;

  display: flex;
  flex-direction: column;

  width: 373px;
  background-color: ${whiteShadow};

  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;

  box-shadow: 0px 3px 3px rgba(0,0,0,0.16);

  @media (min-width: 1025px) { /* desktop */
    display: flex;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const AuthorImage = styled.div`
  height: 481px;

  border-top-right-radius: 3px;

  background-size: cover !important;
  background-attachment: fixed;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
`

const Bio = styled.div`
  padding: 15px;

  font-family: Lato;
  font-size: 14px;
  line-height: 18px;

  margin-bottom: 60px;
`

const SubTitle = styled.div`
  font-family: Lato;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  padding-left: 15px;
`

const FiledUnderLinkContainer = styled(Link)`
  display: flex;
  flex-direction: row;

  padding-left: 15px;

  font-family: Lato;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 0.02em;
  font-weight: 600;

  color: ${red};
`

const FiledUnderLink = ({children, to}) => <FiledUnderLinkContainer href={to}>
  <SVGArrow style={{width: 25, marginRight: 10}} color={red}/>
  {children}
</FiledUnderLinkContainer>

///

const Tags = styled.div`
  padding-left: 15px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  overflow: auto;
`

const Tag = styled.div`
  padding: 10px;

  font-family: Lato;
  font-size: 15px;
  line-height: 36px;
  letter-spacing: 0.22em;
  font-weight: 600;

  text-transform: uppercase;

  color: ${red};

  margin-right: 15px;
`

const BackTo = styled.div`

  position: absolute;
  right: 0;
  bottom: 0;

  width: 373px;

  padding-bottom: 54px;
`

const getFiledUnder = array => {
  let results = []

  array.map( ({name}) =>
    results.push({
      name,
      link: `/subthemes/${kebabCase(name)}`
    })
  )

  return results
}

const getTags = array => {
  let results = []

  results = array.map( ({name}) => name )

  return results
}

class Article extends React.Component {
  render() {
    const {data} = this.props

    const background = get(this, 'props.data.nodeArticle.relationships.field_main_image.localFile.childImageSharp.original.src')
    const title = get(this, 'props.data.nodeArticle.title')
    const author = get(this, 'props.data.nodeArticle.field_author.processed')
    const authorImage = get(this, 'props.data.nodeArticle.relationships.field_author_image.localFile.childImageSharp.original.src')
    const authorBio = get(this, 'props.data.nodeArticle.field_author_bio.processed')
    const text = get(this, 'props.data.nodeArticle.field_full_version.processed')

    const filedUnder = getFiledUnder(get(this, 'props.data.nodeArticle.relationships.field_belongs_to_subtheme'))
    const tags = getTags(get(this, 'props.data.nodeArticle.relationships.field_tags'))
    const backTo = filedUnder[0]

    console.log('Article', this.props)

    return (
      <Container>
        <MainImage background={background}/>
        <TextContainer>
          <TextInnerContainer>
            <ContentBar>
              <Title>{title}</Title>
              <Author>by {author}</Author>
              <Text dangerouslySetInnerHTML={{ __html: text}}/>
            </ContentBar>
            <SideBar>
              <AuthorImage background={authorImage}/>
              <Bio dangerouslySetInnerHTML={{ __html: authorBio }}/>
              <SubTitle>filed under:</SubTitle>
              {
                filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link}>{name}</FiledUnderLink>)
              }
              <SubTitle style={{marginTop: 90}}>explore:</SubTitle>
              <Tags>
                {
                  tags.map( name => <Tag>{name}</Tag>)
                }
              </Tags>
              <SubTitle style={{marginTop: 90}}>see also:</SubTitle>

              <BackTo>
                <SubTitle>back to:</SubTitle>
                <FiledUnderLink key="backTo" to={backTo.link}>{backTo.name}</FiledUnderLink>
              </BackTo>
            </SideBar>
          </TextInnerContainer>
        </TextContainer>
      </Container>
    )
  }
}

export default Article
