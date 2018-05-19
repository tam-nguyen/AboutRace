import React from 'react'
import styled from 'styled-components'
import './interviews.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

const InterviewCard = styled.div`
  width: 45%;
  height: 400px;
  margin: 2.5%;
  position: relative;
  float: left;
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
  margin-bottom: 45px;
  font-size:30px;
  line-height:1.25;
  position: relative;
  z-index:99999;
  line-height:1;
  color: inherit;
`
const AuthorBioText = styled.div`
  width: 300px;
  height: auto;
 
  font-size: 14px;
  line-height: 1.5;
  font-weight:500;
  opacity:0.9;
`

const InterviewImage = styled.div`
  background-color:red;
  width:33%;
  height:100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-position: center;
  background-size:cover;
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
`
const InterviewMain = styled.div`
  position: absolute;
  left: 33%;
  height: 100%;
  padding: 30px;
`
const AuthorBio = ({ data }) => (
  <div style={{fontFamily: 'Lato'}}>{data.field_interviewee_bio.processed}</div>
)
const InterviewSummary = ({ data }) => {
  console.log(data)
  return (
    <Link to={`/interviews/${kebabCase(data.title)}`}>
      <InterviewCard>
        <InterviewImage background={
          data.relationships.field_interviewee &&
          data.relationships.field_interviewee.localFile.publicURL
        } />
        <InterviewMain>
         
          <div className="interviewExcerpt">
            {data.field_medium_version && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.field_medium_version.processed,
                }}
              />
              
            )}
            



            
             <InterviewTitle><h4 style={{marginBottom:15}}>Interview with</h4>{data.field_interviewee_name.processed}</InterviewTitle>
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
  <div className={"interviews wrapper"}>
    {data.allNodeInterview.edges.map((edge, i) => (
      <InterviewSummary data={edge.node} />
    ))}
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
