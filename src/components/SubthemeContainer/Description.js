import React from 'react'
import styled from 'styled-components'

const Description = styled.div`
  font-style: italic;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.25;
  margin-bottom: 15px;
`;

export default props => <Description dangerouslySetInnerHTML={{ __html: props.children ? props.children.replace(new RegExp('p>', 'g'), 'span>'): null }} />;
