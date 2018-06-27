import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import AllClips from '../components/allClips.js'


const ClipsIntro = styled.div
`
	font-size:24px;
	margin-bottom:60px;
	line-height:1.5;
`

const Row = styled.div
`
	display: flex;
	flex-direction: row;
	padding: 10px;
	color: white;
`

const Element = styled.div
`
	cursor: pointer;
	margin-left: 10px;
	font-weight: ${props => props.selected ?  `bold` : `normal`};
`

class Filter extends Component {
	render() {
		const {selected, onSelected} = this.props;
		return (
			<Row>
				Sort by:&nbsp;
				<Element
					selected={selected === 'all'}
					onClick={() => onSelected('all')}
				>
					All
				</Element>
				<Element
					selected={selected === '1'}
					onClick={() => onSelected('1')}
				>
					Episode One
				</Element>
				<Element
					selected={selected === '2'}
					onClick={() => onSelected('2')}
				>
					Episode Two
				</Element>
				<Element
					selected={selected === '3'}
					onClick={() => onSelected('3')}
				>
					Episode Three
				</Element>
			</Row>
		)
	}
}///

class Clips extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	selected: 'all'
	  };
	}

	onSelected = selected => {
		this.setState({selected})
	}

	render() {
		const { selected } = this.state;
		const { data } = this.props;

		return (
			<div className='darkwrapper'>
				<Filter selected={selected} onSelected={this.onSelected}/>
				<ClipsIntro>
					Various clips from the film featured here. Buy a copy of the film here.
				</ClipsIntro>
				<AllClips data={data} selected={selected}/>
			</div>
		)
	}
}

export default Clips;

export const query = graphql`
  query ClipsQuery {
    allNodeClip {
		  edges {
		    node {
		      field_episode
		      title
		    	field_title_of_clip {
		        processed
		      }
		       relationships {
		        field_poster_image {
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

