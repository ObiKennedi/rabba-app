"use client"

import { CardWrapper } from "../Card-wrapper";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation"
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPassword } from "@/actions/new-password";
import "./index.scss"

export const NewPasswordForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success)
                })
        })
    };

    return (
        <CardWrapper
            headerLabel={"Forgot Password?"}
            formWriteUp={"Set your new password to login into your account!"}
            hasBackLink
            backLinkTitle="Sign in"
            backLinkLabel={"Remembered your password?"}
            backLinkHref={"/sign-in"}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label htmlFor="password">Enter new password</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            placeholder="******"
                            disabled={isPending}
                        />
                        {errors.password && <small>{errors.password.message}</small>}
                    </div>
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <button type="submit" disabled={isPending}>
                    {isPending ? "Please wait..." : "Confirm"}
                </button>
            </form>
        </CardWrapper>
    )
}