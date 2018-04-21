const React = require('react')
const range = require('range')
const ReactFlex = require('react-flex')
require('react-flex/index.css')
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

class Card extends React.Component {
    render() {
        return (
        <div
            style={{
            display: 'inline-block',
            height: 200,
            width: 300,
            textAlign: 'center',
            border: '1px solid #dddddd',
            padding: 10,
            marginLeft: 50,
            verticalAlign: `top`,
            }}
            keys={this.props.key}
        >
            <Link to={`/articles/${kebabCase(this.props.title)}`}>{this.props.title}</Link>
            <p>{this.props.type}</p>
            {this.props.children}
        </div>
        )
    }
}

export default Card;

