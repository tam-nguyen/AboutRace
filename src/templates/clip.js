const React = require('react')
import AllClips, { Clip } from '../components/allClips.js'
import styled from 'styled-components'
import Link from 'gatsby-link'
import {
  getCards,
  QuickFactCard,
  FAQCard,
  ClipCard,
  ArticleCard
} from '../components/subtheme'


const ChosenClipCard = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  width: auto;
  margin-right: 30px;
`
const ChosenClipCaption = styled.div`
  font-size: 22px;
  font-weight: 400;
  line-height:1.25;
  display: inline-block;
  padding-bottom: 30px;
  color:#ffe4c1;
  letter-spacing: 0.02em;
`
const Chosen = styled.div`
  background-color:black;
  height:480px;
  margin-bottom: 60px;
  padding: 0px;
  position: relative;
  display: flex;
  align-items: center;
`

export const ChosenClip = ({ clip, link }) =>  {
  const src = `${clip.field_external_video_url && clip.field_external_video_url.uri}?title=0&byline=0&portrait=0`;

  /*
    webkitAllowFullScreen="true"
    mozAllowFullScreen="true"
  */

	return (
		<Chosen>
		  <ChosenClipCard>
			 <iframe 
        width='720px' 
        height='100%' 
        src={src} 
        frameBorder="0" 
        allowFullScreen="true"
      />
			</ChosenClipCard>
     <ChosenClipCaption> {clip.title}</ChosenClipCaption>
		</Chosen>
	)
}

class ClipTemplate extends React.Component {
  
  constructor(){
    super()
    this.state = {}
  }

  render() {
    const { data } = this.props

    return (
      <div className='darkwrapper'>
        <ChosenClip clip={data.nodeClip} />
        <div style={{ padding: 10, margin: 10, border: `1px solid black`}}>
          <button onClick={() => { this.setState({ teaching: false}) }}>
            All Content
          </button>
          <button onClick={() => { this.setState({ teaching: true}) }}>
            Teaching
          </button>
          {
            (data.nodeClip.relationships.field_re || [])
            .filter(node => (!this.state.teaching || node.field_include_in_the_teaching_se) )
            .map((node, i) => {
                if (node.__typename == `node__article`) {
                  return (
                    <ArticleCard
                      key={`article-${i}`}
                      i={i}
                      article={node}
                      relatedContent
                    />
                  )
                } else if (node.__typename == `node__faq`) {
                  return (
                    <FAQCard
                      key={`faqcard-${i}`}
                      i={i}
                      faq={node}
                    />
                  )
                } else if (node.__typename == `node__clip`) {
                  return (
                    <ClipCard
                      key={`clip-${i}`}
                      i={i}
                      clip={node}
                      playable
                    />
                  )
                }
              }
            )
          }
        </div>
        <h4 style={{color: '#ffe4c1', marginLeft: 30}}>All Clips</h4>
        <AllClips data={data}/>
      </div>
    )
  }
}

export default ClipTemplate;

export const clipQuery = graphql`
  query clipQuery($id: String) {
    nodeClip(id: { eq: $id }) {
      ...ClipFragment
    }
    allNodeClip {
      edges {
        node {
          ...ClipFragment
        }
      }
    }
}
`