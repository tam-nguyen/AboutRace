const React = require('react')
import AllClips, { Clip } from '../components/allClips.js'



export default ({ data }) => (
    <div>
      <h3>{data.nodeClip.title}</h3>
      <div style={{display: `table`}}>
        <Clip clip={data.nodeClip} />
      </div>
      <br/>
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