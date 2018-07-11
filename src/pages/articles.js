import React from 'react'
import styled from 'styled-components'
import './articles.css'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { graphql } from 'gatsby'

const GreyBackground = styled.div`
  background-color: rgba(103, 165, 195, 0.14901960784313725);
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999999;
  height: 100%;
  width:100%;
`
const IntroText = styled.div`
  font-weight: 300;
  font-size: 48px;
  line-height: 1.25;
  z-index:99999;
  padding: 60px 30px;
  margin-bottom: 60px;
  font-family: 'Lato';
  color: snow;
  // background-color: #2b2b2b;
  background-color: #323232;
  background-color: #25292b;
`
const ArticleTitle = styled.div`
  font-family: 'Lato';
  font-size:20px;
  font-weight: 400;
  color: #2b2b2b;
  letter-spacing: 0.03em;
  padding: 0px 30px 0 30px;
  line-height:1.25;
  margin-bottom: 7.5px;
`
const ArticleImage = styled.div`
  margin-bottom:30px;
  position: absolute;
  top: 0;
  bottom: 0;
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
`
const TopText = styled.div`
  width: 100%;
  text-align: center;
  padding: 36px 45px;
  top:0;
  background-color: #25292b;
  color: white;
`

const ArticleSummary = ({ data }) => {
  return (
    <Link style={{
      flexGrow: 0,
      flexShrink: 1,
      marginBottom: 30,
      flexBasis: '33%',
      textDecoration: 'none',
      color: 'inherit'
    }} to={`/articles/${kebabCase(data.title)}`}>
      <div className={"articleCard"}>
       
        <div style={{flex: '1 1 auto', position: 'relative', marginBottom:15}}>
          <ArticleImage
            background={
              data.relationships.field_main_image &&
              data.relationships.field_main_image.localFile.publicURL
            }
            className={"articleCardImage"}>
              {data.relationships.field_theme_image && data.relationships.field_theme_image.localFile.publicURL}
          </ArticleImage>
        </div>
        <div style={{paddingBottom:30}}>
          <ArticleTitle>
           {data.title}
          </ArticleTitle>
          <p style={{marginBottom:7.5, color:'#2b2b2b', fontFamily:'Lato', fontSize:14, letterSpacing:'0.04em', lineHeight:1.25, marginLeft:30, marginBottom:22.5}}>Article by {data.field_author && data.field_author.processed}</p>

          
          <div className="articleExcerpt">
            {data.field_article_summary && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.field_article_summary.processed,
                }}
              />

            )}
          </div>
        </div>
        {/* {data.relationships.field_belongs_to_subtheme ? (
        <ul>
          {data.relationships.field_belongs_to_subtheme.map(subTheme => (
            <ArticleSummary data={subTheme} />
          ))}
        </ul>
      ) : (
        <div>No subthemes</div>
      )} */}
      </div>
      </Link>
  )
}

export default ({ data }) => {

  return (
    <div>
      <TopText>          
         <h4 style={{marginBottom:0, display:'inline-block', verticalAlign:'middle'}}>articles</h4>
      </TopText>
      <IntroText dangerouslySetInnerHTML={{
        __html: data.taxonomyTermArticlesPage.description && data.taxonomyTermArticlesPage.description.processed,
      }} />
          
      <div className={"articles"}>
        <GreyBackground />
        
        {data.allNodeArticle.edges.map((edge, i) => (
          <ArticleSummary key={i} data={edge.node} />
        ))}
      </div>
    </div>
  )
}

export const query = graphql`
  query ArticlesQuery {
    taxonomyTermArticlesPage {
      description {
        processed
      }
    }
    allNodeArticle {
      edges {
        node {
          id
          title
          field_author {
            processed
          }
          field_medium_version {
            processed
          }
          field_article_summary {
            processed
          }
          relationships {
            field_main_image {
              id
              localFile {
                publicURL
              }
            }
            field_belongs_to_subtheme {
              id
              name
              relationships {
                field_belongs_to_theme {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`
