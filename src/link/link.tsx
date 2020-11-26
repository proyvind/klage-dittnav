import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { device } from '../styled-components/media-queries';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

export interface KlageLinkProps {
    className?: string;
    href: string; // Sent as prop to the linkCreator function.
    children: React.ReactNode | React.ReactNode[];
    border?: boolean;
}

export const KlageLinkPanel = (props: KlageLinkProps) => (
    <LenkepanelBase href={props.href} className={props.className} border={props.border} linkCreator={RouterLink}>
        {props.children}
    </LenkepanelBase>
);

export const KlageFlexLinkPanel = styled(KlageLinkPanel)`
    flex-basis: 320px;
    flex-grow: 1;
    @media ${device.tablet} {
        flex-basis: 48%;
        flex-grow: 0;
    }
`;

const RouterLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link {...props} to={props.href ?? ''}>
        {props.children}
    </Link>
);

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    showIcon?: boolean;
}

export const ExternalLink = (props: ExternalLinkProps) => (
    <a {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
        {props.showIcon ? <ExternalLinkIcon /> : null}
    </a>
);
