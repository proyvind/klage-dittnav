import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props extends PlaceholderProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export const TextLoader = ({ children, isLoading, ...size }: Props) =>
  isLoading ? <Placeholder {...size} /> : <span>{children}</span>;

const animation = keyframes`
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: -100% 0%;
  }
`;

interface PlaceholderProps {
  $minWidth?: string;
  $height?: string;
}

const Placeholder = styled.span<PlaceholderProps>`
  display: inline-block;
  border-radius: 4px;
  width: 100%;
  min-width: ${({ $minWidth }) => $minWidth ?? 'inherit'};
  height: ${({ $height }) => $height ?? '1em'};
  background: #ccc;
  background: linear-gradient(90deg, #ccc 0%, #ccc 33%, #ddd 50%, #ccc 66%, #ccc 100%);
  background-size: 200% 100%;
  animation: ${animation} 1.25s linear infinite;
`;
