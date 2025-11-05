"use client"

import { CardWrapper } from "./CardWrapper"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { LoginButton } from "./LoginButton"
import { RegisterSchema } from "@/schema"

import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import "@/styles/auth/LoginForm.scss"
import z from "zod"
import { register } from "@/actions/register"
import { Eye, EyeOff } from "lucide-react"

export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    }

    return (
        <CardWrapper
            showBackLink
            showSocial
            headerLabel={"Create Account"}
            headerWriteUp={"Create your Rabba account with your email and registered phone number. Secure access starts with a quick verification code."}
            backLinkHref="/login"
            backLinkLabel="Sign in"
            backLinkWriteUp="I have a Rabba account"
        >
            <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="form-container">
                    <div className="input-container">
                        <label htmlFor="fullName">Full name</label>
                        <input
                            disabled={isPending}
                            type="text"
                            id="fullName"
                            placeholder="ex: John Olev Smith"
                            {...form.register("name")}
                        />
                        <div className="error-message">{form.formState.errors.name?.message}</div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="ex: example@mail.com"
                            {...form.register("email")}
                            disabled={isPending}
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
                                    <EyeOff size={20} strokeWidth={2}/>
                                ) : (
                                    <Eye size={20} strokeWidth={2}/>
                                )}
                            </span>
                        </div>
                        <div className="error-message">{form.formState.errors.password?.message}</div>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" />
                        <LoginButton destination="/policy">I agree to Rabba Terms & Privacy Policy</LoginButton>
                    </div>
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <button className={isPending ? "pending" : ""} disabled={isPending}>{isPending ? "Please wait ..." : "Sign up"}</button>
            </form>
        </CardWrapper>
    )
}