import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
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

export const ExternalKlageLinkPanel = (props: KlageLinkProps) => (
    <LenkepanelBase
        href={props.href}
        className={props.className}
        border={props.border}
        linkCreator={ExternalRouterLink}
    >
        {props.children}
    </LenkepanelBase>
);

const LinkPanelStyle = css`
    flex-basis: 320px;
    flex-grow: 1;
    color: #3e3832;
    @media ${device.tablet} {
        flex-basis: 48%;
        flex-grow: 0;
    }
`;

export const BaseRouterLink = styled(Link)`
    color: #0067c5;

    :hover {
        text-decoration: none;
    }

    :focus {
        text-decoration: none;
        color: white;
        background-color: #254b6d;
    }
`;

export const BaseLink = styled.a`
    color: #0067c5;

    :hover {
        text-decoration: none;
    }

    :focus {
        text-decoration: none;
        color: white;
        background-color: #254b6d;
        > ${ExternalLinkIcon} {
            fill: white;
        }
    }
`;
export const KlageFlexLinkPanel = styled(KlageLinkPanel)`
    ${LinkPanelStyle}
`;

export const ExternalKlageFlexLinkPanel = styled(ExternalKlageLinkPanel)`
    ${LinkPanelStyle}
`;

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    showIcon?: boolean;
}

export const ExternalLink = (props: ExternalLinkProps) => (
    <BaseLink {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
        {props.showIcon ? <ExternalLinkIcon /> : null}
    </BaseLink>
);

const RouterLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link {...props} to={props.href ?? ''}>
        {props.children}
    </Link>
);

export const ExternalRouterLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
    </a>
);
