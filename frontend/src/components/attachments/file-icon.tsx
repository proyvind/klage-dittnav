import { FileContent, Picture } from '@navikt/ds-icons';
import React from 'react';

export interface FileIconProps {
  contentType: string;
}

export const FileIcon = ({ contentType }: FileIconProps) => {
  if (contentType.includes('image')) {
    return <Picture />;
  }

  return <FileContent />;
};
