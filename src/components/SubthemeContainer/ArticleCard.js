import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
  
import Card from '../Card'

import Description from './Description'
import Overlay from './Overlay'
import OrangeButton from './OrangeButton'

const Container = styled(Card)`
  height: 441px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ArticleCardImage = styled.div`
  height: 100%;
  flex: 1 1 auto;
  width: 100%;
  background-color: grey;
  background-position: contain;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${ props => props.background ? `url(${props.background})` : null };
`

const ArticleTitle = styled.div`
  font-family: 'Lato';
  font-size: 30px;
  font-weight: 400;
  color: #2b2b2b;
  letter-spacing: 0.03em;
  padding: 0px 30px 0 0px;
  line-height:1.25;
  margin-bottom: 15px;
`

const InnerContainer = styled.div`
  padding: 30px;
`

const Author = styled.h4`
  margin-bottom: 15px;
`

export class ArticleCard extends React.Component {
  render() {
    const { article, i, style = {}, onOpen } = this.props
    const link = `/articles/${kebabCase(article.title)}`

    const background = article.relationships.field_main_image.localFile.publicURL;
    const description = article.field_short_version ? `"${article.field_short_version.processed}"` : null;
    const author = article.field_author && article.field_author.processed;

    const overlay = <Overlay>
      <Author>Article by {author}</Author>
      <ArticleTitle style={{color:'white'}}>{article.title}</ArticleTitle>
      <Description>{description}</Description>
      <OrangeButton>Read more</OrangeButton>
    </Overlay>

    return (
      <Container
        title={article.title}
        type="Article"
        slug="article"
        changed={article.changed}
        onClick={ () => onOpen(link)}
        overlay={overlay}
      >
      <ArticleCardImage background={background} />
      {article.field_short_version && (
        <InnerContainer>
          <Author>Article by {author}</Author>
          <ArticleTitle>{article.title}</ArticleTitle>
          <Description>{description}</Description>
        </InnerContainer>
      )}
      </Container>
    )
  }
}

export default ArticleCard;
