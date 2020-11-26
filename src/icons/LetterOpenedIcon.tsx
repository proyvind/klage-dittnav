import React from 'react';

interface Props {
    className?: string;
}

function LetterOpened(props: Props) {
    return (
        <svg
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 67 67"
            role="presentation"
        >
            <path
                fill="#194D62"
                fillRule="evenodd"
                d="M5.28 30.382l.274-7.923L36.39 4.855c.83-.56 2.008-.383 2.635.398l24.264 25.92-2.465 9.347-30.161 11.2L5.28 30.382z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#E7E9E9"
                fillRule="evenodd"
                d="M54.091 53.288L7.817 46.303c-.319-.048-.54-.327-.496-.618l4.344-28.78c.044-.293.338-.492.657-.444l46.274 6.985c.317.048.538.325.494.618l-4.344 28.78c-.044.29-.338.492-.655.444z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#78706A"
                fillRule="evenodd"
                d="M19.135 30.289l28.868 4.357.29-1.925-28.867-4.358-.29 1.926zM18.409 35.102l28.867 4.357.29-1.925L18.7 33.177l-.29 1.925zM17.682 39.916l28.868 4.357.29-1.925-28.867-4.358-.291 1.925zM16.956 44.728l28.867 4.357.29-1.925-28.867-4.357-.29 1.925z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#669DB4"
                fillRule="evenodd"
                d="M2.344 58.276l46.288 6.987c1.187.179-43.059-42.929-43.059-42.929l-5.072 33.6c-.168 1.114.657 2.163 1.843 2.342z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#669DB4"
                fillRule="evenodd"
                d="M55.785 66.342L9.496 59.355C8.311 59.176 63.308 31.05 63.308 31.05l-5.072 33.6c-.168 1.113-1.266 1.872-2.451 1.693z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export default LetterOpened;
