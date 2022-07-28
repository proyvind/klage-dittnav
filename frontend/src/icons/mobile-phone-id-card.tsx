import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const MobilePhoneIdCardSvg = (props: Props) => (
  <svg
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="51"
    fill="none"
    viewBox="0 0 44 51"
  >
    <path
      fill="#B7B1A9"
      fillRule="evenodd"
      d="M25.814 50.5H3.186C1.426 50.5 0 49.09 0 47.35V3.65C0 1.91 1.425.5 3.186.5h22.628C27.574.5 29 1.91 29 3.65v43.7c0 1.74-1.425 3.15-3.186 3.15z"
      clipRule="evenodd"
    />
    <path fill="#fff" d="M0 0H25V40H0z" transform="translate(2 2.5)" />
    <path fill="#C2EAF7" d="M3 3.5H26V16.5H3z" />
    <path
      fill="#E7E9E9"
      fillRule="evenodd"
      d="M4 20.5h21v2H4v-2zM4 25.5h21v2H4v-2zM4 30.5h21v2H4v-2z"
      clipRule="evenodd"
    />
    <path fill="#78706A" fillRule="evenodd" d="M17 46.5a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
    <path
      fill="#669DB4"
      d="M43.27 14.333H9.73a.73.73 0 00-.73.73v23.333c0 .402.327.729.73.729h5.832a.73.73 0 00.73-.73v-1.093c0-1.005.818-1.823 1.823-1.823 1.004 0 1.823.818 1.823 1.823v1.094c0 .402.326.729.729.729h11.666a.73.73 0 00.73-.73v-1.093c0-1.005.818-1.823 1.822-1.823 1.005 0 1.823.818 1.823 1.823v1.094c0 .402.327.729.73.729h5.833a.73.73 0 00.729-.73V15.063a.73.73 0 00-.73-.729z"
    />
    <path
      fill="#CDE7D8"
      fillRule="evenodd"
      d="M17.782 24.542c1.629 0 2.949-1.306 2.949-2.917 0-1.61-1.32-2.917-2.949-2.917-1.628 0-2.949 1.306-2.949 2.917 0 1.61 1.32 2.917 2.95 2.917zM23.712 31.833c0-3.221-2.64-5.833-5.898-5.833-3.257 0-5.897 2.612-5.897 5.833h11.795z"
      clipRule="evenodd"
    />
    <path
      fill="#3E3832"
      fillRule="evenodd"
      d="M27.097 30.375h11.931c.33 0 .597.326.597.73 0 .402-.267.728-.597.728H27.097c-.33 0-.597-.326-.597-.729 0-.402.267-.729.597-.729zM27.097 27.458h11.931c.33 0 .597.327.597.73 0 .402-.267.729-.597.729H27.097c-.33 0-.597-.327-.597-.73 0-.402.267-.729.597-.729zM27.097 24.541h11.931c.33 0 .597.327.597.73 0 .402-.267.729-.597.729H27.097c-.33 0-.597-.327-.597-.73 0-.402.267-.729.597-.729zM27.083 20.166h4.667c.322 0 .583.327.583.73 0 .402-.26.729-.583.729h-4.667c-.322 0-.583-.327-.583-.73 0-.402.261-.729.583-.729z"
      clipRule="evenodd"
    />
  </svg>
);

export const MobilePhoneIdCard = styled(MobilePhoneIdCardSvg)`
  width: 29px;
`;
