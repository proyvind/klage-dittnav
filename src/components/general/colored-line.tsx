import React from 'react';

export const ColoredLine = ({ color }: any) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);
