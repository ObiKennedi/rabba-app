import "@/styles/auth/FormHeader.scss"

interface HeaderProps {
    label: string;
    writeup: string;
}

export const FormHeader = ({label, writeup}: HeaderProps) =>{
    return(
        <header>
            <h2>{label}</h2>
            <p>{writeup}</p>
        </header>
    )
}