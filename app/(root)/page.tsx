import React from "react" 
import { LoginButton } from "@/components/auth/LoginButton"

function Home (){
    return(
        <main>
            <div>Rabba</div>  
            <LoginButton destination="/login">
                <button>Get started</button>
            </LoginButton>
        </main>
    )
}

export default Home