import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  Link,
  SVGArrow,
  getCards,
} from '../'

import {
  black,
  white,
  whiteShadow,
  backgroundColor,
  red,
} from '../../colors'

const TICKER = 'ARTICLE'
const gradient = `linear-gradient(to bottom, #D9B0B0 0%, rgba(109,88,88,0.92) 100%)`
const gradient2 = `linear-gradient(to bottom, #2A495C 0%, rgba(29,69,59,0.92) 100%)`

const Container = styled.div`
  width: 100vw;
  
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const TopContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: auto;

  background: ${gradient};
`

const BottomContaniner = styled.div`
  position: relative;

  width: 100vw;
  margin-top: -100px;

  z-index: 2;

  background-color: ${black};
  background-image: ${gradient2};
`

const MainImage = styled.div`
  position: absolute;
  top: 222px;
  left: 60px;
  right: 60px;

  width: auto;
  height: 40vh;

  z-index: 2;

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
  z-index: 3;

  width: 80vw;
  margin-top: 50vh;

  @media (min-width: 1025px) { /* desktop */
    width: 1000px;
    margin-top: 70vh;
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
  height: auto !important;

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

  z-index: 10;

  background-color: ${white};
  border-bottom-left-radius: 3px;

  box-shadow: 0px 3px 3px rgba(0,0,0,0.16);
`

const SideBar = styled(Column)`
  position: relative;

  display: none !important;

  display: flex;
  flex-direction: column;

  width: 390px;
  background-color: ${whiteShadow};

  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;

  box-shadow: 0px 3px 3px rgba(0,0,0,0.16);

  @media (min-width: 1025px) { /* desktop */
    display: flex !important;
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

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;

  padding-bottom: 200px;
`

const Footer = styled(Row)`
  width: 100vw;
  height: 20vh;
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

const getRelatedContent = array => {
  const cards = {
    articles: [],
    clips: [],
    faqs: [],
  }

  array.forEach(item => {
    switch(item.__typename){
      case 'node__faq':
        cards.faqs.push(item)
        break
      case 'node__article':
        cards.articles.push(item)
        break
      case 'node__clip':
        cards.clips.push(item)
        break
      default:
        break;
    }
  })

  return getCards(cards)
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

    const relatedContent = getRelatedContent(get(this, 'props.data.nodeArticle.relationships.field_article_related_content'))
    
    console.log('Article', this.props)

    return (
      <Container>
        <TopContainer>
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
                    tags.map( (name, key) => <Tag key={key}>{name}</Tag>)
                  }
                </Tags>
                <SubTitle style={{marginTop: 90}}>see also:</SubTitle>

                <CardsContainer>
                  {
                    relatedContent
                  }
                </CardsContainer>

                <BackTo>
                  <SubTitle>back to:</SubTitle>
                  <FiledUnderLink key="backTo" to={backTo.link}>{backTo.name}</FiledUnderLink>
                </BackTo>
              </SideBar>
            </TextInnerContainer>
          </TextContainer>
        </TopContainer>
        <BottomContaniner>
          <Footer>
            hello
          </Footer>
        </BottomContaniner>
      </Container>
    )
  }
}

export default Article
