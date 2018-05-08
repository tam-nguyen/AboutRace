const React = require('react')
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import getScrollBarWidth from '../utils/scrollbar-width'

class Portal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    document.body.appendChild(this.el)
    document.body.classList.add('modal-open')
    document.body.style.paddingRight = `${getScrollBarWidth()}px`
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
    document.body.classList.remove('modal-open')
    document.body.style.paddingRight = ''
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default Portal
