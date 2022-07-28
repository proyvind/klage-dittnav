import React from 'react';

interface Props {
  show: boolean;
  children: React.ReactNode;
}

export const Optional = ({ show, children }: Props) => (show ? <>{children}</> : null);
