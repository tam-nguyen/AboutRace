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
            <h4>{this.props.type}</h4>
            {this.props.children}
            <Link to={`/${this.props.slug}s/${kebabCase(this.props.title)}`}>{this.props.title}</Link>
        </div>
        )
    }
}

const StyledCard = styled(Card)`
  display: inline-block;
  height: 400px;
  width: 300px;
  padding: 15px;
  border: solid thin darkgrey;
  background-color: lightgrey;
  border-radius: 12px;
  font-family: "ff-tisa-web-pro";
`;

export default StyledCard;

