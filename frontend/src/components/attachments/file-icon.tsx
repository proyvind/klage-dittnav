import { FileTextIcon, ImageIcon } from '@navikt/aksel-icons';
import React from 'react';

interface FileIconProps {
  contentType: string;
}

export const FileIcon = ({ contentType }: FileIconProps) => {
  if (contentType.includes('image')) {
    return <ImageIcon aria-hidden />;
  }

  return <FileTextIcon aria-hidden />;
};
