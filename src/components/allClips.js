import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

const ClipCard = styled.div`
	width: 300px;
	height:400px;
	background-color:white;
	float: left;
	margin-right:30px;
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
	cursor: pointer;
`
const ClipPoster = styled.div`
	height:200px;
	width:100%;
	background-color:red;
	background-size:cover;
	background-position: center;
    background-image: ${props => props.background ?  `url(${props.background})` : `none`};
`

const AllClips = ({ data }) =>  {
	console.log(data)
	return (
		<div>
			
			<ClipCard>
				<ClipPoster background={data.relationships.field_poster_image && data.relationships.field_poster_image.localFile.publicURL} >

				</ClipPoster>
				<div className="caption">
					{data.title}
				</div>
			</ClipCard>
		</div>
		)
}


export default ({ data }) => (
  <div>
    {data.allNodeClip.edges.map((edge, i) => (
      <AllClips data={edge.node} />
    ))}
  </div>
)


