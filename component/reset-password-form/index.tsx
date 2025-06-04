"use client"

import { CardWrapper } from "../Card-wrapper";
import { useState, useTransition } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/actions/reset";
import "./index.scss"

export const ResetPasswordForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            resetPassword(values)
                .then((data) => {
                    setError(data!.error);
                    setSuccess(data!.success)
                })
        })
    };

    return (
        <CardWrapper
            headerLabel={"Forget password?"}
            formWriteUp={"Reset your password"}
            hasBackLink
            backLinkTitle="Sign in"
            backLinkLabel={"Remembered your password?"}
            backLinkHref={"/sign-in"}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="ex: johndoe@example.mail"
                            disabled={isPending}
                        />
                        {errors.email && <small>{errors.email.message}</small>}
                    </div>
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <button type="submit" disabled={isPending}>
                    {isPending ? "Please wait..." : "Submit"}
                </button>
            </form>
        </CardWrapper>
    )
}