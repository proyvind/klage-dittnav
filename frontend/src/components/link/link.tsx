import { Link, LinkProps } from '@navikt/ds-react';
import React from 'react';
import { ExtLink } from '@app/icons/external-link';
import { Optional } from '../optional/optional';

interface ExternalLinkProps extends Omit<LinkProps, 'target' | 'rel' | 'style'> {
  openInSameWindow?: boolean;
  inline?: boolean;
}

export const ExternalLink = ({ openInSameWindow = false, inline = false, children, ...props }: ExternalLinkProps) => (
  <Link
    {...props}
    target={openInSameWindow ? '_self' : '_blank'}
    rel="noopener noreferrer"
    style={{ display: inline ? 'inline' : undefined }}
  >
    {children}
    <Optional show={openInSameWindow}>
      <ExtLink />
    </Optional>
  </Link>
);
