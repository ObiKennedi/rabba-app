"use client"

import { FormHeader } from "./FormHeader";
import { GoogleAuthButton } from "./GoogleAuthButton";
import "@/styles/auth/CardWrapper.scss"

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    headerWriteUp: string;
    showBackLink?: boolean;
    backLinkHref?: string;
    backLinkWriteUp?: string;
    backLinkLabel?: string;
    showSocial?: boolean;
}

export const CardWrapper = (
    {
        children,
        headerLabel,
        headerWriteUp,
        showBackLink,
        backLinkHref,
        backLinkWriteUp,
        backLinkLabel,
        showSocial
    }:CardWrapperProps
) =>{
    return(
        <div className="card-wrapper">
            <FormHeader
                label={headerLabel}
                writeup={headerWriteUp}
            />
            {showSocial && (
                <GoogleAuthButton/>
            )}
            <div>{children}</div>
            {showBackLink && (
                <footer>{backLinkWriteUp} <a href={backLinkHref}>{backLinkLabel}</a></footer>
            )}
        </div>
    )
}