import Image from "next/image";
import "./globals.scss"

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main>
                <div>
                    <Image
                        src={"/images/mobile-dashboard.png"}
                        width={500}
                        height={1000}
                        alt="dashboard"
                    />
                </div>
                <div>{children}</div>
            </main>
        </>
    );
}