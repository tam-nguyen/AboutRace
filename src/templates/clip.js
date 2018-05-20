const React = require('react')
import AllClips, { Clip } from '../components/allClips.js'
import styled from 'styled-components'
import Link from 'gatsby-link'

const ChosenClipCard = styled.div`
  height: 414px;
  width: 720px;
  margin-bottom: 30px;
  margin-right: 30px;
  display: inline-block;
  vertical-align:top;
`
const ChosenClipCaption = styled.div`
  font-size: 24px;
  font-family: 'Lato';
  font-weight: 400;
  line-height:1.25;
  display: inline-block;
  padding-bottom: 30px;
`
const Chosen = styled.div`
  background-color:white;
  -webkit-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  -moz-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  margin-bottom: 30px;
  padding: 30px;
  display: flex;
`

export const ChosenClip = ({ clip, link }) =>  {
	return (
		<Chosen>
			<ChosenClipCard>
			<iframe width='720px' height='100%' src={`${clip.field_external_video_url && clip.field_external_video_url.uri}?title=0&byline=0&portrait=0`} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>			 
			</ChosenClipCard>
     <ChosenClipCaption> {clip.title}</ChosenClipCaption>
  
		</Chosen>
		)
}

export default ({ data }) => (
    <div className='wrapper'>
      <ChosenClip clip={data.nodeClip} />
      
      <AllClips data={data}/>
    </div>
  )

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