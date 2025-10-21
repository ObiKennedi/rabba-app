"use client"

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    destination: string;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const LoginButton = ({
    children,
    destination,
    asChild,
    mode = "redirect"
}: LoginButtonProps) => {

    const router = useRouter();
    const onClick = () =>{
        router.push(destination)
    }

    if (mode==="modal") {
        return(
            <span>Todo: Implement modal</span>
        )
    }

    return (
        <span onClick={onClick} className="login-button">
            {children}
        </span>
    )
}