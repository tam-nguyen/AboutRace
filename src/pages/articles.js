import React from 'react'
import styled from 'styled-components'
import './articles.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'



// const ContentNodeComponent = ({ data }) => <li>{data.name}</li>

// const SubThemeComponent = ({ data }) => (
//   <li>
//     Subtheme: <strong>{data.name}</strong> <code>{data.id}</code>
//     {/* {data.relationships.field_belongs_to_theme ? (
//       <ul>
//         {data.relationships.field_belongs_to_theme.map(article => (
//           <ContentNodeComponent data={article} />
//         ))}
//       </ul>
//     ) : (
//       <span style={{ color: 'red' }}> (no articles)</span>
//     )} */}
//   </li>
// )


// .card:nth-child(odd) .card__image {
//   /* flexbox can change order of rendered elements*/
//   order: 2;
// }
const GreyBackground = styled.div`
  background-color: #f7f7f7;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999999;
  height: 100%;
  width:100%;
`
const IntroText = styled.div`
  font-weight: 200;
  font-size: 18px;
  line-height: 1.75;
  letter-spacing: 0.02em;
  z-index:99999;
  max-width: 800px;
  margin: 60px auto;
  margin-top: 155px;
  text-align: center;
`
const ArticleTitle = styled.div`
  font-family: 'Lato';
  font-size:30px;
  font-weight: 700;
  color: black;
  padding: 0px 30px 0 30px;
  line-height:1.25;
  margin-bottom: 15px;
`
const ArticleImage = styled.div`
  margin-bottom:15px;
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
`

const ArticleSummary = ({ data }) => {
  console.log(data)
  return (
    <Link style={{
      flexGrow: 0,
      flexShrink: 1,
      marginBottom: 30,
      flexBasis: '50%',
      textDecoration: 'none',
      color: 'inherit'
    }} to={`/articles/${kebabCase(data.title)}`}>
      <div className={"articleCard"}>
       
        
        <ArticleImage
            background={
              data.relationships.field_main_image &&
              data.relationships.field_main_image.localFile.publicURL
            }
            className={"articleCardImage"}>
              {data.relationships.field_theme_image && data.relationships.field_theme_image.localFile.publicURL}
          </ArticleImage>
          <ArticleTitle>
           {data.title}
          </ArticleTitle>
          
          
          <div className="articleExcerpt">
            {data.field_article_summary && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.field_article_summary.processed,
                }}
              />

            )}
          </div>
          <h4 style={{marginBottom:0, marginLeft:30, lineHeight:3}}>By {data.field_author && data.field_author.processed}</h4>

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

export default ({ data }) => (
  <div className={"articles"}>
    <GreyBackground />
    <IntroText>
    Need some introductory text here introducing the 'articles' as originally part of the 2004 film, suggesting their content may be dated, and that they are not intended to represent a comprehensive collection of views on race, so much as a sampling of voices... (etc.)
    </IntroText>
    {data.allNodeArticle.edges.map((edge, i) => (
      <ArticleSummary data={edge.node} />
    ))}
  </div>
)

export const query = graphql`
  query ArticlesQuery {
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
