import React from 'react'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import styled from 'styled-components'
import {ClipPoster} from '../components/allClips.js'

// const ContentNodeComponent = ({ data }) => (
//   <li>
//     <strong>{data.__typename}</strong>: {data.title}
//   </li>
// )

// const SubThemeComponent = ({ data }) => (
//   <li>
//     Subtheme: <strong>{data.name}</strong>
//     {data.relationships.contentNodes ? (
//       <ul>
//         {data.relationships.contentNodes.map(contentNode => (
//           <ContentNodeComponent data={contentNode} />
//         ))}
//       </ul>
//     ) : (
//       <span style={{ color: 'red' }}> (no contentNodes)</span>
//     )}
//   </li>
// )

// const TopArea = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 170px;
//   background-color:#3a3a3a;
// `

const HomeBackground = styled.div`
  // background-color: #151515;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999999;
  height: 100%;
  width:100%;
`

const HomeThemeImage = styled.div`
  height: 100%;
  color: white;
  background-position: center center;
  background-size: 100%;
  transition: all .5s;
  &:hover {
    background-size:125%;
    transition: all .5s;
  }
  background-image: ${props =>
                      props.background ? `url(${props.background})` : `none`};
`
const ThemeOverview = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  // transform: translateX(90%);
  width: 40%;
  // color: #25292b;
  color: white;
  font-size: 16px;
  font-weight: normal;
  font-family: 'Lato';
  padding: 60px;
  line-height: 1.5;
  letter-spacing: 0.011em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // background-color: rgb(197, 215, 224);
  background-color: rgba(37, 41, 43, 0.78);
  transition: all .3s;
  &:hover {
    // transform: translateX(-50%);
    transition: all .3s;
  }
`

// const SeriesComponent = ({ data }) => (
//   // <div>
//   //   <div style={{
//   //     // color:'white',
//   //     margin:'0 auto',
//   //     maxWidth:700
//   //   }}
//   //   dangerouslySetInnerHTML={{
//   //     __html: data.taxonomyTermTheSeries.field_original_statement_from_ex && data.taxonomyTermTheSeries.field_original_statement_from_ex.processed,
//   //   }}
//   //   />
//   //   <div style={{
//   //     // color:'white',
//   //     margin:'0 auto',
//   //     maxWidth:700
//   //   }}
//   //   dangerouslySetInnerHTML={{
//   //     __html: data.field_updated_statement_from_the && data.field_updated_statement_from_the.processed,
//   //   }}
//   //   />
//   // </div>
// )

const ThemeComponent = ({ data }) => (
  <div style={{
    borderRadius:45,
    width: '90%',
    marginLeft:'5%',
    height: '60vh',
    marginBottom: 60,
    marginRight: 0,
    display:'inline-block',
    verticalAlign:'top',
    position:'relative',
    overflow: 'hidden',
    boxShadow: 'rgba(39, 39, 39, 0.58) 0px 3px 57px 0px'
    }}
  >
    <Link style={{textDecoration:'none'}} to={`/themes/${kebabCase(data.name)}`}>
      <HomeThemeImage background={data.relationships.field_theme_image && data.relationships.field_theme_image.localFile.publicURL}>
       <div className='totalDimmer'>
        <ThemeOverview>
          <p style={{marginBottom:0}} dangerouslySetInnerHTML={{
                    __html: data.description && data.description.processed,
              }}  />
          </ThemeOverview>

        <h4 style={{marginBottom:7.5, letterSpacing:'0.2em', fontSize:18}}>Look closer:</h4>
        <span style={{
          fontFamily: 'Lato',
          fontSize:48,
          lineHeight:1,
          textAlign: 'left',
          letterSpacing: '0.011em'
        }}>{data.name}</span>
        </div>
      </HomeThemeImage>
    </Link>
 
    {/* {data.relationships.subthemes ? (
      <ul>
        {data.relationships.subthemes.map(subTheme => (
          <SubThemeComponent data={subTheme} />
        ))}
      </ul>
    ) : (
      <div>No subthemes</div>
    )} */}
  </div>
)

const TrailerClipWrapper = styled.div`
  max-width: 900px;
  margin: 90px auto 2em;
  position: relative;
  margin-bottom: 15px;

  &:before {
    content: '';
    display: block;
    padding-top: ${100 / 16 * 9}%;
  }

  iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

export default ({ data }) => (
  <div>
    <div style={{textAlign:'center', fontSize:96, lineHeight:1.5, fontFamily:'Lato', textTransform:'uppercase', letterSpacing:'0.04em', fontWeight:700}}>Race</div>
    <div style={{textAlign: 'center', fontFamily:'Lato', fontSize:60}}>The Power of an Illusion</div>
    <TrailerClipWrapper>
      <iframe width='720px' height='100%' src={`${data.trailerClip.field_external_video_url && data.trailerClip.field_external_video_url.uri}?title=0&byline=0&portrait=0`} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </TrailerClipWrapper>
    {/* <SeriesComponent data={data} /> */}
   
    <div className='wrapper'>
      <HomeBackground />
      <div style={{
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Lato',
      fontSize:36,
      fontWeight:300,
      letterSpacing: '0.04em',
      paddingTop:120,
      marginBottom: 75
    }}>Explore themes from the film:</div>
      {data.allTaxonomyTermThemes.edges.map(({ node }) => (
        <ThemeComponent data={node} />
      ))}
    </div>
  </div>
)

export const query = graphql`
  query IndexQuery {
    
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
          description {
            processed
          }
          relationships {
            field_theme_image {
              localFile {
                publicURL
              }
            }
            subthemes: backref_field_belongs_to_theme {
              name
              id
              relationships {
                contentNodes: backref_field_belongs_to_subtheme {
                  __typename
                  ... on node__article {
                    title
                  }
                  ... on node__faq {
                    title
                  }
                  ... on node__clip {
                    title
                  }
                  ... on node__quickfact {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
    trailerClip:nodeClip(id: { eq:"dda11171-b3eb-44b4-8fa2-06bd24f545b1" } ) {
      ...ClipFragment
    }
  }
`
