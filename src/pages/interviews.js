import React from 'react'
import styled from 'styled-components'
import './interviews.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

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
const InterviewCard = styled.div`
  background-color: white;
  padding: 30px;
  height: 100%;
  -webkit-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  -moz-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  transition: all .3s;
  &:hover {
    -webkit-box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.78);
    -moz-box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.78);
    box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.78);
    transition: all .3s;
  }
`
const InterviewTitle = styled.div`
  margin-bottom: 30px;
  font-size:30px;
  line-height:1.25;
  z-index:99999;
  line-height:1;
  color: inherit;
`
const AuthorBioText = styled.div`
  line-height: 1.5;
  font-weight:500;
  opacity:0.9;
  font-style: italic;
  font-size: 17px;
`

const InterviewImage = styled.div`
  background-color:red;
  display: inline-block;
  width:192px;
  height: 192px;
  margin-top: 15px;
  margin-bottom:22.5px;
  border-radius: 50%;
  background-position: center;
  background-size:cover;
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
`
const InterviewMain = styled.div`

`
const AllInterviews = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 60px;
`

const AuthorBio = ({ data }) => (
  <div
  dangerouslySetInnerHTML={{
    __html: data.field_interview_summary && data.field_interview_summary.processed,
  }}
  />
)
const InterviewSummary = ({ data }) => {
  return (
    <Link style={{
      flexGrow: 0,
      flexShrink: 1,
      marginBottom: 60,
      flexBasis: '30%',
      textDecoration: 'none',
      color: 'inherit'
    }} to={`/interviews/${kebabCase(data.title)}`}>
      <InterviewCard>
        <InterviewImage background={
          data.relationships.field_interviewee &&
          data.relationships.field_interviewee.localFile.publicURL
        } />
        <InterviewMain>
          <div className="interviewExcerpt">
            {/* {data.field_medium_version && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.field_interview_summary.processed,
                }}
              />
              
            )}
             */}



            
             <InterviewTitle><h4 style={{marginBottom:7.5}}>Interview with</h4>{data.field_interviewee_name.processed}</InterviewTitle>
             <AuthorBioText>
                <AuthorBio data={data}> </AuthorBio>
             </AuthorBioText>
            </div>
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

export default ({ data }) => (
  <div className={"interviews"}>
  <GreyBackground />
  <IntroText>
    Need some introductory text here introducing the 'interviews' as originally part of the 2004 film, suggesting their content may be dated, and that they are not intended to represent a comprehensive collection of views on race, so much as a sampling of voices... (etc.)
  </IntroText>
    <AllInterviews>
      {data.allNodeInterview.edges.map((edge, i) => (
        <InterviewSummary data={edge.node} />
      ))}
    </AllInterviews>
  </div>
)

export const query = graphql`
  query InterviewsQuery {
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
