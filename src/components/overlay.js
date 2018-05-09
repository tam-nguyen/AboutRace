const React = require('react')
import styled, { css } from 'styled-components'
import getScrollBarWidth from '../utils/scrollbar-width'

class UnstyledOverlay extends React.Component {
  componentDidMount() {
    this.onVisibleChange(this.props.visible)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.onVisibleChange(nextProps.visible)
    }
  }

  onVisibleChange(visible) {
    if (visible) {
      document.body.classList.add('modal-open')
      document.body.style.paddingRight = `${getScrollBarWidth()}px`
      window.dispatchEvent(new CustomEvent('modal', { detail: { open: true, scrollBarWidth: getScrollBarWidth() } }))
    } else {
      document.body.classList.remove('modal-open')
      document.body.style.paddingRight = ``
      window.dispatchEvent(new CustomEvent('modal', { detail: { open: false, scrollBarWidth: 0 } }))
    }
  }

  render() {
    const { children, ...restOfProps } = this.props
    return (
      <div {...restOfProps}>
        {children}
      </div>
    )
  }
}

const Overlay = styled(UnstyledOverlay)`
  background-color: #FFFFE0;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index:999999999999999999999999;
  opacity: 0;
  display: none;

  ${props => props.blue && css`
    background-color: #f1efefdb;
  `}

  ${props => props.visible && css`
    opacity: 1;
    display: inline;
  `}
`

export default Overlay