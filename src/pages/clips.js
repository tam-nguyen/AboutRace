import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import {
	AllClips, 
	Layout, 
	Filter
} from '../components'

const queryString = require('query-string');

const ClipsIntro = styled.div`
	font-size: 24px;
	margin-bottom: 60px;
	line-height: 1.5;
`

class Clips extends Component {
	constructor(props) {
	  super(props);
		const selected = 'all'

	  this.state = {
	  	selected
	  };
	}

	onSelected = selected => {
		let queryParams = queryString.parse(window.location.search)
		queryParams.episode = selected;
		// const search = `?` + queryString.stringify({ ...queryParams});

		// uncomment if you want to have url changed
		// history.pushState({}, window.document.title, search)

		this.setState({selected})
	}

	componentDidMount() {
		const queryParams = queryString.parse(window.location.search)
		const { episode } = queryParams;
		const selected = episode ? episode : 'all';

		this.setState({selected})
	}

	render() {
		const { selected } = this.state;
		const { data, location } = this.props;

		return (
			<Layout location={location}>
				<div className='darkwrapper'>
					<Filter selected={selected} onSelected={this.onSelected}/>
					<ClipsIntro>
						Various clips from the film featured here. Buy a copy of the film here.
					</ClipsIntro>
					<AllClips data={data} selected={selected}/>
				</div>
			</Layout>
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

