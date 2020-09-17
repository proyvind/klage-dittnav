import React from 'react';

interface Props {
    color: string;
}

export const ColoredLine = ({ color }: Props) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);
