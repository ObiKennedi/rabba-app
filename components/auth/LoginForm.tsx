"use client"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schema"

import { LoginButton } from "./LoginButton"
import { CardWrapper } from "./CardWrapper"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"

import { login } from "@/actions/login"

import { Eye, EyeOff } from "lucide-react"
import "@/styles/auth/LoginForm.scss"

export const LoginForm = () => {

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Wrong provider, continue google" : ""

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [showPassword, setShowPassword] = useState(false)
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Log in to your Account"
            headerWriteUp="Welcome back! Use your phone number or sign in with Google to get back to paying bills on Rabba."
            showSocial
            showBackLink
            backLinkHref="/register"
            backLinkLabel="Sign up"
            backLinkWriteUp="I am first timer"
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="form">
                <div className="form-container">
                    <div className="input-container">
                        <label htmlFor="email">Email Address</label>
                        <input
                            disabled={isPending}
                            id="email"
                            placeholder="example@mail.com"
                            type="email"
                            {...form.register("email")}
                        />
                        <div className="error-message">{form.formState.errors.email?.message}</div>
                    </div>
                    <div className="input-container password-container">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                disabled={isPending}
                                id="password"
                                placeholder="******"
                                type={showPassword ? "text" : "password"}
                                {...form.register("password")}
                            />
                            <span
                                className="toggle-eye"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} strokeWidth={2} />
                                ) : (
                                    <Eye size={20} strokeWidth={2} />
                                )}
                            </span>
                        </div>
                        <div className="error-message">{form.formState.errors.password?.message}</div>
                    </div>
                    <LoginButton destination="/reset-password">Forgot Password ?</LoginButton>
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <button
                    className={isPending ? "pending" : ""}
                    disabled={isPending}
                >{isPending ? "Please wait ..." : "Login"}</button>
            </form>
        </CardWrapper>
    )
}