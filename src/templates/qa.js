import React from "react"
import styled from 'styled-components'
import { Overlay, OverlayHeader, OverlayTitle, OverlayFilter, OverlayBody }  from '../components/overlay'

import kebabCase from 'lodash/kebabCase'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

const queryString = require('query-string')

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const ArrowContainer = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  color: orange;
  align-items: center;
  text-decoration: none;
`

const ArrowButton = styled.div`
  font-size: 90px;
  line-height: 90px;
`

const ArrowTitle = styled.div`
`

class SingleQA extends React.Component {
  render() {
    const { data } = this.props;
    console.log(data)

    const { 
      allNodeFaq, 
      nodeFaq: {
        title, 
        field_question_summary, 
        fields: {
          slug
        }
      }
    } = data;

    const {totalCount} = allNodeFaq;

    let index = -1;

    allNodeFaq.edges.map( (edge, i) => {
      if(edge.node.fields.slug === slug)
        index = i
    })

    let previousSlug = null;
    let nextSlug = null;

    const isPreviousSlug = index > 0;
    const isNextSlug = index < (totalCount - 1);

    if( isPreviousSlug ){
      const edge = allNodeFaq.edges[index - 1];
      previousSlug = edge.node.fields.slug;
    }

    if( isNextSlug ){
      const edge = allNodeFaq.edges[index + 1];
      nextSlug = edge.node.fields.slug;
    }

    return (
    	<Row>
        {
          isPreviousSlug && <ArrowContainer to={`/qa/${previousSlug}`}>
            <ArrowButton>&#8249;</ArrowButton>
            <ArrowTitle>PREVIOUS</ArrowTitle>
          </ArrowContainer>
        }

	      <p style={{maxWidth:700, margin:'0 auto'}} dangerouslySetInnerHTML={{
					__html: field_question_summary 
							? field_question_summary.processed
							: `no summary (just so this doesn't cause build errors), title: ${title}`,
	            }}
	      />

        {
          isNextSlug && <ArrowContainer to={`/qa/${nextSlug}`}>
            <ArrowButton>&#8250;</ArrowButton>
            <ArrowTitle>NEXT</ArrowTitle>
          </ArrowContainer>
        }

      </Row>
    )
  }
}

export default SingleQA

export const faqQuery = graphql`
  query faqQuery($id: String) {

    allNodeFaq {
      totalCount
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }

    nodeFaq(id: { eq: $id }) {
  	  ...FullQAFragment
    }
  }
`
