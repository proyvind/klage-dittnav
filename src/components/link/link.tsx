import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';

export interface KlageLinkProps {
    className?: string;
    href: string; // Sent as prop to the linkCreator function.
    children: React.ReactNode | React.ReactNode[];
    border?: boolean;
}

const KlageLinkPanel = (props: KlageLinkProps) => (
    <LenkepanelBase href={props.href} className={props.className} border={props.border} linkCreator={RouterLink}>
        {props.children}
    </LenkepanelBase>
);

const RouterLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link {...props} to={props.href ?? ''}>
        {props.children}
    </Link>
);

export default KlageLinkPanel;
