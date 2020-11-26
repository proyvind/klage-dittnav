import React from 'react';
import styled from 'styled-components/macro';

interface Props {
    className?: string;
}

function ExternalLinkIcon(props: Props) {
    return (
        <svg
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            role="presentation"
        >
            <path
                fill="#0067C5"
                fillRule="evenodd"
                d="M8 2.667V4H1.333v10.667H12V8h1.333v8H0V2.667h8zM16 0v6h-1.333V2.276l-7.772 7.771-.942-.942 7.77-7.772H10V0h6z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export default styled(ExternalLinkIcon)`
    width: 16px;
    height: 1.25em;
    margin-left: 4px;
    vertical-align: top;
    fill: #0067c5;
    stroke: #0067c5;
`;
