import React from 'react'
import styled from 'styled-components'
import './FAQs.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

const FAQTitle = styled.div`
    
`

const FAQSummary = ({ data }) => {
  console.log(data)
  return (
      <div className={"articleCard"}>
       
        <div className="articleExcerpt">
          { /* 
            We are not using it - delete this?

          data.field_medium_version && (
            <div
              dangerouslySetInnerHTML={{
                __html: data.field_medium_version.processed,
              }}
            />
          ) */}
          
          <FAQTitle>
            <Link to={`/faqs/${data.fields.slug}`}>
              {
                // if field_question_summary is filled use it,
                // if not - fallback to field_title (which is required)
                data.field_question_summary 
                  ? data.field_question_summary.processed
                  : data.field_title.processed
              }
            </Link>
          </FAQTitle>
          
        </div>
       
      </div>
  )
}

export default ({ data }) => (
  <div className={"articles"}>
    {data.allNodeFaq.edges.map((edge, i) => (
      <FAQSummary data={edge.node} />
    ))}
  </div>
)

export const query = graphql`
  query FAQsQuery {
    allNodeFaq {
        edges {
          node {
            fields {
              slug
            }
            field_title {
              processed
            }
            field_question_summary {
              processed
            }
          }
        }
      }
  }
`
