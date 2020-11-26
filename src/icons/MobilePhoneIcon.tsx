import React from 'react';

interface Props {
    className?: string;
}

function MobilePhone(props: Props) {
    return (
        <svg
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 29 50"
            role="presentation"
        >
            <path
                fill="#B7B1A9"
                fillRule="evenodd"
                d="M25.814 50H3.186C1.426 50 0 48.59 0 46.85V3.15C0 1.41 1.425 0 3.186 0h22.628C27.574 0 29 1.41 29 3.15v43.7c0 1.74-1.425 3.15-3.186 3.15z"
                clipRule="evenodd"
            ></path>
            <path fill="#fff" d="M0 0H25V40H0z" transform="translate(2 2)"></path>
            <path fill="#C2EAF7" d="M3 3H26V16H3z"></path>
            <path
                fill="#E7E9E9"
                fillRule="evenodd"
                d="M4 20h21v2H4v-2zM4 25h21v2H4v-2zM4 30h21v2H4v-2z"
                clipRule="evenodd"
            ></path>
            <path fill="#78706A" fillRule="evenodd" d="M17 46a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path>
        </svg>
    );
}

export default MobilePhone;
