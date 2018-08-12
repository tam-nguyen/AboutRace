import React from "react"
import styled from 'styled-components'
import getCards from '../utils/getCards'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

const KeyQuote = styled.div`
  font-size: 60px;
  font-weight: 500;
  margin-bottom: 60px;
  padding: 162px 120px 138px 120px;
  width: 100%;
  line-height:1.25;
  // font-style: italic;
  text-align: center;
  border-bottom: solid thin lightgrey;
  font-family: "orpheuspro";
  background-color:#2b2b2b;
  color: snow;
`
const AuthorBioText = styled.div`
  width: 300px;
  height: auto;
  
  z-index: 9999999999;
  background-color: white;
  padding: 30px;
  font-size: 12px;
  line-height: 1.5;
  font-weight:500;
  opacity:0.9;
`
const InterviewTitle = styled.div`
  margin-bottom: 45px;
  font-size:60px;
  font-weight: 500;
  line-height:1.25;
  position: relative;
  line-height:1;
  font-family: "orpheuspro";

`
const InterviewColumn = styled.div`
  padding: 30px;
  top:-150px;
  background-color:white;
  position: relative;
  font-size: 17px;
  max-width: 760px;
  line-height: 1.75;
  margin-left: 30px !important;
`

const Overlay = styled.div`
  background-color: #FFFFE0;
  position: fixed;
  opacity: 0.8;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%
`

const Centered = styled.div`
  border: 1px solid #888888;
  opacity: 1;
  position: relative;
  top: 50%;
  width: 50%;
  padding: 20px;
  transform: translate(50%, -50%);
`
const AuthorImage = styled.div`
  height: 420px;
  width: 420px;
  border: solid thin lightgrey;
  border-radius: 50%;
  right:calc(55% - 200px);
  background-size: cover;
  background-position: center;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
  overflow:hidden;
`
const TopText = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px 45px;
  top:0;
  position: absolute;
  color: white;
`

const AuthorBio = ({ data }) => (
  <div style={{fontFamily: 'Lato'}}>{data.nodeInterview.field_interviewee_bio.processed}</div>
)

class QuickFactOverlay extends React.Component {
  render() {
    const { quickFact } = this.props

    if (!quickFact) { return null; }

    const quickClips = quickFact.relationships.field_related_content || [];

    const quickClipLinks = {
      articles: [],
      clips: [],
      faqs: [],
      quickFacts: []
    }

    quickClips.forEach(item => {
      if (item.__typename == `node__faq`) {
        quickClipLinks.faqs.push(item)
      } else if (item.__typename == `node__article`) {
        quickClipLinks.articles.push(item)
      } else if (item.__typename == `node__clip`) {
        quickClipLinks.clips.push(item)
      }
    })

    return (
      <Overlay>
        <Centered>
          <div onClick={this.props.closeHandler} style={{float: `right`, color: `red`}}>
            <b>Close</b>
          </div>
          <h3>{quickFact.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: quickFact.field_quickfact.processed,
            }}
          />
          {
            getCards(quickClipLinks).slice(0,2)
          }
        </Centered>
      </Overlay>
    )
  }
}

class SingleInterview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { data } = this.props

    return (
      <div className="row">
        <QuickFactOverlay
          quickFact={this.state.quickFact}
          closeHandler={() => this.setState({ quickFact: null })}
        />
        <TopText>
        <Link style={{color:'inherit'}} to="/interviews/">
          <img style={{height: 24, opacity:0.8, display:'inline-block', marginBottom:0, marginRight:15, verticalAlign:'middle'}} src={require('../assets/images/back-white.svg')} />
          <h4 style={{marginBottom:0, display:'inline-block', verticalAlign:'middle'}}>all interviews</h4>
        </Link>
        </TopText>
        
        <KeyQuote
              dangerouslySetInnerHTML={{
                __html: data.nodeInterview.field_key_quote.processed,
              }}
            />
          <InterviewColumn className="column">
            <InterviewTitle><h4 style={{marginBottom:15}}>Interview with</h4>{data.nodeInterview.field_interviewee_name.processed}</InterviewTitle>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.nodeInterview.field_full_length_version.processed,
                }}
              />
                <div style={{height: 200}}/>
                {
                  (data.nodeInterview.relationships.backref_field_related_content || []).map(quickFact => (
                      <div style={{ cursor: `pointer`, border: `1px solid #888888`, padding: 20}}>
                        <h3>{quickFact.title}</h3>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: quickFact.field_quickfact.processed,
                          }}
                          onClick={() => this.setState({ quickFact: quickFact })}
                        />
                      </div>
                    )
                  )
                }
          </InterviewColumn>
          <div className="column _25">
            <AuthorImage background={data.nodeInterview.relationships.field_interviewee && data.nodeInterview.relationships.field_interviewee.localFile.publicURL} />

            <AuthorBioText>
              <AuthorBio data={data}> </AuthorBio>
            </AuthorBioText>
          </div>
      </div>
    )
  }
}

export default SingleInterview

export const interviewsQuery = graphql`
  query interviewQuery($id: String) {
    nodeInterview(id: { eq: $id }) {
        title
        field_interviewee_name {
            processed
        }
        field_interviewee_bio {
            processed
        }
        field_key_quote {
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
`
