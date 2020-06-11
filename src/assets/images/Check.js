import * as React from 'react';

export default function Check(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} {...props}>
            <path
                fill="none"
                stroke="#00FF00"
                d="M23.576.183a.998.998 0 00-1.393.241L7.367 21.453l-5.66-5.659a.999.999 0 10-1.414 1.414l6.5 6.5a1 1 0 001.524-.132l15.5-22a1 1 0 00-.241-1.393z"
            />
        </svg>
    );
}
