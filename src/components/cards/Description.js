import React from 'react'
import styled from 'styled-components'

const Description = styled.div`
  font-family: 'Quicksand';
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
`;

export default props => <Description dangerouslySetInnerHTML={{ __html: props.children ? props.children.replace(new RegExp('p>', 'g'), 'span>'): null }} />;
