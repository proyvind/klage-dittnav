import * as React from 'react';

export default function Cross(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} {...props}>
            <path
                fill="#FF0000"
                stroke="#FF0000"
                d="M13.414 12L23.707 1.706A.999.999 0 1022.293.293L12 10.586 1.707.293A.999.999 0 10.293 1.706L10.586 12 .293 22.293a.999.999 0 101.414 1.414L12 13.414l10.293 10.293a.997.997 0 001.414 0 .999.999 0 000-1.414L13.414 12z"
            />
        </svg>
    );
}
