import React from 'react';

interface Props {
  className?: string;
}

export const MobilePhoneWithLawBook = (props: Props) => (
  <svg
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="51"
    fill="none"
    viewBox="0 0 35 51"
  >
    <path
      fill="#A0A0A0"
      fillRule="evenodd"
      d="M25.814 50.5H3.186C1.426 50.5 0 49.09 0 47.35V3.65C0 1.91 1.425.5 3.186.5h22.628C27.574.5 29 1.91 29 3.65v43.7c0 1.74-1.425 3.15-3.186 3.15z"
      clipRule="evenodd"
    ></path>
    <path fill="#fff" d="M0 0H25V40H0z" transform="translate(2 2.5)"></path>
    <path fill="#B5F1FF" d="M3 3H26V23H3z"></path>
    <path fill="#F1F1F1" fillRule="evenodd" d="M4 25.5h21v2H4v-2zM4 30.5h21v2H4v-2z" clipRule="evenodd"></path>
    <path fill="#6A6A6A" fillRule="evenodd" d="M17 46.5a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path>
    <path fill="#F1F1F1" d="M14.66 10h16.188l3.322 3.39v20.763H14.66V10z"></path>
    <path
      fill="#BA3A26"
      fillRule="evenodd"
      d="M33.741 12.966v20.836H15.956c-.673 0-1.22-.557-1.22-1.245 0-.687.547-1.244 1.22-1.244h15.808V10h-16.41C14.054 10 13 11.076 13 12.403v19.38C13 33.953 14.612 35 16.736 35H35V12.966h-1.259z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#FFD399"
      fillRule="evenodd"
      d="M20.157 15.932h6.126v.638c0 .957-.185 2.909-.516 3.73-.566 1.406-1.56 2.558-2.805 3.26-1.244-.702-2.239-1.854-2.805-3.26-.33-.821-.515-2.773-.515-3.73v-.638h.515zm7.786 9.746h-9.962v1.695h9.962v-1.695z"
      clipRule="evenodd"
    ></path>
  </svg>
);
