import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Layout
} from '../components'

class Index extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h1 style={{color: 'white'}}>Index</h1>
      </Layout>
    )
  }
}

export default Index
