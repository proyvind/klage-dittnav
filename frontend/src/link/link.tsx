import { Link } from '@navikt/ds-react';
import React from 'react';
import { ExternalLinkIcon } from '../icons/ExternalLinkIcon';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  openInNewWindow?: boolean;
  inline?: boolean;
}

export const ExternalLink = ({ openInNewWindow = false, inline = false, children, ...props }: ExternalLinkProps) => (
  <Link
    {...props}
    target={openInNewWindow ? '_blank' : '_self'}
    rel="noopener noreferrer"
    style={{ display: inline ? 'inline' : undefined }}
  >
    {children}
    {openInNewWindow ? <ExternalLinkIcon /> : null}
  </Link>
);
