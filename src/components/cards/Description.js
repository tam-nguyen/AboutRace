import React from 'react'
import styled from 'styled-components'

const Description = styled.div`
  font-family: 'Quicksand';
  font-size: 15px;
  line-height: 21px;
  color: white;
`;

export default props => <Description dangerouslySetInnerHTML={{ __html: props.children ? props.children.replace(new RegExp('p>', 'g'), 'span>'): null }} />;
