import { LoginForm } from "@/components/auth/LoginForm"
import React from "react"
import { Suspense } from "react"

function Login (){
    return(
        <Suspense>
            <LoginForm/>
        </Suspense>
    )
}

export default Login