import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const ExternalLinkSvg = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="presentation">
    <path d="M8 2.667V4H1.333v10.667H12V8h1.333v8H0V2.667h8zM16 0v6h-1.333V2.276l-7.772 7.771-.942-.942 7.77-7.772H10V0h6z" />
  </svg>
);

export const ExtLink = styled(ExternalLinkSvg)`
  width: 16px;
  height: 1.25em;
  margin-left: 4px;
  vertical-align: top;
  fill: #0067c5;
`;
