import React from 'react';
import { styled } from 'styled-components';

interface Props {
  className?: string;
}

const DocumentSvg = (props: Props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
      fill="#99C3FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27 29.6286V77.8669C27 79.5972 28.338 81 29.9892 81H70.0125C71.662 81 73 79.5972 73 77.8669V22.1331C73 20.4028 71.662 19 70.0125 19H38.0741L27 29.6286Z"
      fill="#F1F1F1"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.0741 19V26.4022C38.0741 28.1844 36.6497 29.6286 34.892 29.6286H27L38.0741 19Z"
      fill="#C9C9C9"
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M35.5185 42.0286H64.4815V39.3714H35.5185V42.0286Z" fill="#6A6A6A" />
    <path fillRule="evenodd" clipRule="evenodd" d="M35.5185 48.2286H64.4815V45.5714H35.5185V48.2286Z" fill="#6A6A6A" />
    <path fillRule="evenodd" clipRule="evenodd" d="M35.5185 54.4286H64.4815V51.7714H35.5185V54.4286Z" fill="#6A6A6A" />
    <path fillRule="evenodd" clipRule="evenodd" d="M35.5185 60.6286H64.4815V57.9714H35.5185V60.6286Z" fill="#6A6A6A" />
    <path fillRule="evenodd" clipRule="evenodd" d="M35.5185 66.8286H64.4815V64.1714H35.5185V66.8286Z" fill="#6A6A6A" />
    <path fillRule="evenodd" clipRule="evenodd" d="M35.5185 35.8286H64.4815V33.1714H35.5185V35.8286Z" fill="#6A6A6A" />
  </svg>
);

export const Document = styled(DocumentSvg)`
  width: 100px;
`;
