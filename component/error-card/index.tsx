import { CardWrapper } from "../Card-wrapper"

export const ErrorCard = () =>{
    return(
        <CardWrapper
            headerLabel="Error"
            formWriteUp="Opps, looks like something went wrong 😢😢"
            hasBackLink
            backLinkHref="/sign-in"
            backLinkTitle="Sign in"
            backLinkLabel="Return to"
        >
            <div></div>
        </CardWrapper>
    )
}