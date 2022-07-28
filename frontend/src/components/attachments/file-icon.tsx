import { FileContent, Picture } from '@navikt/ds-icons';
import React from 'react';

interface FileIconProps {
  contentType: string;
}

export const FileIcon = ({ contentType }: FileIconProps) => {
  if (contentType.includes('image')) {
    return <Picture aria-hidden />;
  }

  return <FileContent aria-hidden />;
};
