import { FaGoogle } from "react-icons/fa"
import "@/styles/auth/GoogleAuthButton.scss"

export const GoogleAuthButton = () =>{
    return(
        <button>
            <FaGoogle/>
            Continue with Google
        </button>
    )
}