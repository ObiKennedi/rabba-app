import { CardWrapper } from "./CardWrapper"
import { FormError } from "../FormError"

export const AuthErrorCard = () => {
    return (
        <CardWrapper
            headerLabel={"Error"}
            headerWriteUp={"Opps something's wrong"}
            showBackLink
            backLinkHref="/login"
            backLinkLabel="Login"
            backLinkWriteUp="Back to"
        >
            <FormError message=" "/>
        </CardWrapper>
    )
}