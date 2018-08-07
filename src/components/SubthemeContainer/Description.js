import React from 'react'
import styled from 'styled-components'

const Description = styled.div`
  font-family: 'Tisa Pro';
  font-size: 20px;
  line-height: 24px;
`;

export default props => <Description dangerouslySetInnerHTML={{ __html: props.children ? props.children.replace(new RegExp('p>', 'g'), 'span>'): null }} />;
