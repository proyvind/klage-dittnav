import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '../language/use-language';
import { useGetLanguageTitlesQuery } from '../redux-api/titles';

interface Props {
  titleKey: string;
}

export const Title = ({ titleKey }: Props) => {
  const lang = useLanguage();
  const { data: titles, isLoading } = useGetLanguageTitlesQuery(lang);

  if (isLoading || typeof titles === 'undefined') {
    return <Placeholder />;
  }

  return <span>{titles[titleKey]}</span>;
};

const animation = keyframes`
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: -100% 0%;
  }
`;

const Placeholder = styled.span`
  display: inline-block;
  border-radius: 4px;
  width: 100%;
  height: 25px;
  background: #ccc;
  background: linear-gradient(90deg, #ccc 0%, #ccc 33%, #ddd 50%, #ccc 66%, #ccc 100%);
  background-size: 200% 100%;
  animation: ${animation} 1.25s linear infinite;
`;
