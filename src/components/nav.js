import React from "react"
import styled from 'styled-components'

const Nav = styled.div`
top: 30px;
right: 20px;
`
const NavItem = styled.div`
float: left;
margin-right: 30px;
`

class Navigation extends React.Component {
    render() {
        return(
            <Nav>
                <NavItem>The Film</NavItem>
                <NavItem>FAQs</NavItem>
            </Nav>
        )
    }
}

export default Navigation