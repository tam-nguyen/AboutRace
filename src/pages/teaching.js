import React from 'react'
import styled from 'styled-components'
import { Link, push, graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { Overlay, OverlayHeader, OverlayBody }  from '../components/overlay'
import getCards from '../utils/getCards'
import Layout from "../components/layout"

const queryString = require('query-string');

const Wrapper = styled.div`
  max-width: 100%;
  background-color: gray;
`

const IntroText = styled.div`
  font-weight: 300;
  font-size: 48px;
  line-height: 1.25;
  z-index:99999;
  padding-top: 60px;
  margin: 0 45px;
  font-family: 'Lato';
`

const SubTitle = styled.h4`
  margin-bottom: 15px;
`

const closeHandler = () => push(`?`)

const CloseButton = styled.div`
  float: right;
  color: red;
  cursor: pointer;
  font-weight: bold;
`

export default ({ data, location }) => {

  const queryParams = queryString.parse(location.search)
  const { lesson } = queryParams;
  const lessonData = !lesson ? null : (data.allNodeLessonPlan.edges.filter( edge => edge.node.id === lesson)[0]).node

  return (
    <Layout location={location}>
      <Wrapper>
        <Overlay id="film-overlay" visible={!!lesson}>
          { 
            lessonData && 
            <OverlayBody>
              <OverlayHeader>
                <CloseButton onClick={closeHandler}>Close</CloseButton>
                <div>{lessonData.title}</div>
              </OverlayHeader>
              <div
                dangerouslySetInnerHTML={{
                  __html: lessonData.field_lesson_plan.processed,
                }}
              />
            </OverlayBody>
          }
        </Overlay>
        <IntroText>
          Teach topics from the film with specially curated lesson plans, handouts, articles, and interviews.
        </IntroText>

        <h2>Lesson Plans</h2>
        <div className="row" style={{padding: '0 30px'}}>
        {
          data.allNodeLessonPlan.edges.map((edge, i) => (
            <div className="articleCard" style={{padding:30}} key={`teaching-${i}`}>
              <h2>{edge.node.title}</h2>
              <div>
                <SubTitle>Subjects:</SubTitle>
                <p dangerouslySetInnerHTML={{ __html: edge.node.field_subjects && edge.node.field_subjects.processed }} />
              </div>
              <div>
                <SubTitle>Grade Levels:</SubTitle>
                <p dangerouslySetInnerHTML={{ __html: edge.node.field_grade_levels && edge.node.field_grade_levels.processed }} />
              </div>
              <div>
                <SubTitle>Overview:</SubTitle>
                <p dangerouslySetInnerHTML={{ __html: edge.node.field_lesson_summary && edge.node.field_lesson_summary.processed }} />
              </div>
              <div>
                <SubTitle>Objectives:</SubTitle>
                <p dangerouslySetInnerHTML={{ __html: edge.node.field_objectives && edge.node.field_objectives.processed }} />
              </div>
              <Link to={`?${queryString.stringify({ ...queryParams, lesson: edge.node.id })}`}>
                <button>
                  View lesson plan
                </button>
              </Link>
            </div>
          ))
        }
        </div>
        <h2>Articles</h2>
        {
          getCards({
            articles: data.allNodeArticle.edges.map(edge => edge.node),
          })
        }

        <h2>Interviews</h2>
        {
          getCards({
            interviews: data.allNodeInterview.edges.map(edge => edge.node),
          })
        }
     </Wrapper>
   </Layout>
  )
}

export const query = graphql`
  query TeachingQuery {
    allNodeLessonPlan {
      edges {
        node {
          id
          title
          field_activity{
            processed
          }
          field_overview {
            processed
          }
          field_subjects {
            processed
          }
          field_objectives {
            processed
          }
          field_copyright_a {
            processed
          }
          field_description {
            processed
          }
          field_lesson_plan {
            processed
          }
          field_grade_levels {
            processed
          }
          field_lesson_summary {
            processed
          }
          field_time_allotment {
            processed
          }
          field_lesson_plan_author {
            processed
          }
          field_less_plan_author_bio {
            processed
          }
        }
      }
    }
    allNodeArticle(filter: { field_include_in_the_teaching_se: { eq: true }}) {
      edges {
        node {
          ... ArticleFragment
        }
      }
    }
    allNodeInterview(filter: { field_include: { eq: true }}) {
      edges {
        node {
          ... InterviewFragment
        }
      }
    }
  }
`
