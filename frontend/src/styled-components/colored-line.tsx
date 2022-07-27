import React from 'react';

interface Props {
  color: string;
}

export const ColoredLine = ({ color }: Props) => (
  <hr
    style={{
      height: 0,
      width: '100%',
      borderBottom: `1px solid ${color}`,
    }}
  />
);
