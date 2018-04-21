const React = require('react')
const range = require('range')
const ReactFlex = require('react-flex')
require('react-flex/index.css')
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

import styled from 'styled-components';

class Card extends React.Component {
    render() {
        return (
        <div className={this.props.className}>
            <Link to={`/${this.props.slug}s/${kebabCase(this.props.title)}`}>{this.props.title}</Link>
            <p>{this.props.type}</p>
            {this.props.children}
        </div>
        )
    }
}

const StyledCard = styled(Card)`
  display: inline-block;
  height: 200px;
  min-width: 200px;
  max-width: 400px;
  text-align: center;
  border: 1px solid #dddddd;
  padding: 10px;
  margin-left: 50px;
`;

export default StyledCard;

