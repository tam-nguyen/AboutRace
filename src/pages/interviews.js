import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Layout from "../components/layout"

const GreyBackground = styled.div`
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
  padding: 15px 45px 60px 45px;
  margin-bottom: 60px;
  font-family: 'Lato';
  color: snow;
  background-color: #25292b;
`

const InterviewCard = styled.div`
  position: relative;
  overflow:hidden;
`

const InterviewTitle = styled.div`
  margin-bottom: 11.25px;
  font-size:20px;
  font-family:'Lato';
  z-index:99999;
  line-height:1;
  color: inherit;
  font-weight: 700;
`

const InterviewExcerpt = styled.div`
  line-height: 1.5;
  font-weight: 500;
  opacity: 0.9;
  font-size: 14px;
  & > p {
    margin-bottom: 7.5px;
  }
`

const InterviewImage = styled.div`
  background-color:red;
  border-radius: 50%;
  height: 145px;
  width: 145px;
  margin-bottom: 15px;
  background-position: center;
  background-size:cover;
  background-image: ${props => props.background ? `url(${props.background})` : `none`};
`

const InterviewMain = styled.div`
`

const AllInterviews = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 45px;
`

const TopText = styled.div`
  width: 100%;
  text-align: center;
  padding: 36px 45px;
  top:0;
  background-color: #25292b;
  color: white;
`

const InterviewSummary = ({ data }) => {
  return (
    <Link style={{
      flexGrow: 0,
      flexShrink: 1,
      marginBottom: 60,
      flexBasis: 'calc(25% - 30px)',
      textDecoration: 'none',
      color: 'inherit'
    }} to={`/interviews/${kebabCase(data.title)}`}>
      <InterviewCard>
        <InterviewImage background={
          data.relationships.field_interviewee &&
          data.relationships.field_interviewee.localFile.publicURL
        } />
        <InterviewMain>   
             <InterviewTitle>
              <div style={{
                      fontSize:14,
                      fontWeight:600,
                      letterSpacing:'0.04em',
                      marginBottom:7.5}}>
                      Interview with
              </div>{data.field_interviewee_name.processed}</InterviewTitle>
             <InterviewExcerpt 
              dangerouslySetInnerHTML={{
                    __html: data.field_interview_summary && data.field_interview_summary.processed,
              }} />
              <Link style={{fontFamily:'Lato', textDecoration:'none', color:'#5599B4', fontSize:13, letterSpacing:'0.04em', fontWeight:700}} to={`/interviews/${kebabCase(data.title)}`}>Read interview</Link>
             {/* <AuthorBioText>
                <AuthorBio data={data}> </AuthorBio>
             </AuthorBioText> */}
          {/* {data.relationships.field_belongs_to_subtheme ? (
          <ul>
            {data.relationships.field_belongs_to_subtheme.map(subTheme => (
              <InterviewSummary data={subTheme} />
            ))}
          </ul>
        ) : (
          <div>No subthemes</div>
        )} */}
        </InterviewMain>
      </InterviewCard>
    </Link>
  )
}

export default ({ data, location }) => (
  <Layout location={location}>
    <TopText>          
      <h4 style={{marginBottom:0, display:'inline-block', verticalAlign:'middle'}}>interviews</h4>
    </TopText>
    <IntroText dangerouslySetInnerHTML={{
                  __html: data.taxonomyTermInterviewsPage.description && data.taxonomyTermInterviewsPage.description.processed,
                }} />
    <div className={"interviews"}>
    <GreyBackground />
  
      <AllInterviews>
        {data.allNodeInterview.edges.map((edge, i) => (
          <InterviewSummary data={edge.node} />
        ))}
      </AllInterviews>
    </div>
  </Layout>
)

export const query = graphql`
  query InterviewsQuery {
    taxonomyTermInterviewsPage {
      id
      description {
        processed
      }
    }
    allNodeInterview {
        edges {
          node {
            title
            field_key_quote {
              processed
            }
            field_interview_summary {
              processed
            }
            field_interviewee_name {
              processed
            }
            field_interviewee_bio {
              processed
            }
            field_full_length_version {
              processed
            }
            relationships {
              field_interviewee {
                localFile {
                  publicURL
                }
              }
            }
          }
        }
      }
  }
`
