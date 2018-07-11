import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Filter from '../components/Filter'
import { graphql } from 'gatsby'

const queryString = require('query-string');

const Title = styled.div`
    
`

const IntroText = styled.div`
  font-weight: 300;
  font-size: 48px;
  line-height: 1.25;
  z-index:99999;
  margin: 60px 45px;
  font-family: 'Lato';
`


const Summary = ({ data }) => {
  return (
      <div className={"articleCard"}>
       
        <div className="articleExcerpt">
          
          <Title>
            <Link to={`/qa/${data.fields.slug}`}>
              {
                data.field_question_summary 
                  ? data.field_question_summary.processed
                  : data.field_title.processed
              }
            </Link>
          </Title>
          
        </div>
       
      </div>
  )
}///

class QA extends Component {
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
    const search = `?` + queryString.stringify({ ...queryParams});

    window.history.pushState({}, window.document.title, search)

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
    const {data} = this.props;

    return (
      <div>
        <Filter color='black' selected={selected} onSelected={this.onSelected}/>
        <IntroText>
          The experts answer your questions about issues from the film.
          Does race have a biological basis? Has the idea of race always been with us? Why does race still matter?
        </IntroText>
        <div className={"articles"}>
        {
          data.allNodeFaq.edges.map((edge, i) =>
            <Summary key={`QA-${i}`} data={edge.node} />
          )
        }
        </div>
      </div>
    )
  }
}

// TODO: uncomment this once episode information is in the data
// data.allNodeFaq.edges.filter( el => selected === 'all' ? true : el.node.field_episode === parseInt(selected) ).map((edge, i) =>

export default QA;

export const query = graphql`
  query QAQuery {
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
