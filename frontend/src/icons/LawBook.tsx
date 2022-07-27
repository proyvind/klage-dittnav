import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const LawBookSvg = (props: Props) => (
  <svg
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
    width="53"
    height="59"
    fill="none"
    viewBox="0 0 53 59"
  >
    <path fill="#E7E9E9" d="M4 0h38.998L51 8v49H4V0z"></path>
    <path
      fill="#BA3A26"
      fillRule="evenodd"
      d="M49.968 7v49.173H7.121a2.938 2.938 0 010-5.875h38.084V0H5.671A5.671 5.671 0 000 5.672V51.41C0 56.526 3.884 59 9 59h44V7h-3.032z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#FFD399"
      fillRule="evenodd"
      d="M17.243 14H32v1.505c0 2.259-.445 6.865-1.243 8.804-1.363 3.318-3.76 6.036-6.758 7.691-2.996-1.655-5.393-4.373-6.756-7.691C16.445 22.37 16 17.764 16 15.505V14h1.243zM36 37H12v4h24v-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const LawBook = styled(LawBookSvg)`
  width: 100px;
`;
