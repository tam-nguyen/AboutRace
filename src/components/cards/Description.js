import React from 'react'
import styled from 'styled-components'

const Description = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

export default props => <Description dangerouslySetInnerHTML={{ __html: props.children ? props.children.replace(new RegExp('p>', 'g'), 'span>'): null }} />;
