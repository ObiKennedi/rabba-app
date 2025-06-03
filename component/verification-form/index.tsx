"use client"

import { CardWrapper } from "../Card-wrapper"
import "./index.scss"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { NewVerification } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

export const VerificationForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token")
            return
        };

        NewVerification(token)
        .then((data)=>{
            setSuccess(data.success),
            setError(data.error)
        })
        .catch(() =>(
            setError("Something went wrong")
        ))
    }, [token]);

    useEffect(() => {
        onSubmit()
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Email verification"
            formWriteUp="Confirm your verification"
            hasBackLink
            backLinkTitle="Sign in"
            backLinkLabel={"Return to"}
            backLinkHref={"/sign-in"}
        >
            <div className="loader">
                {!success && !error &&(<BeatLoader />)}
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </CardWrapper>
    )
}