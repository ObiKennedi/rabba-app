"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "@/styles/dasboard/bottomNav.scss";

export const BottomNav = () => {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard", icon: "/Frame (7).png", label: "Dashboard" },
        { href: "/bills", icon: "/Frame (8).png", label: "Bills" },
        { href: "/deals", icon: "/Frame (8).png", label: "Deals" },
        { href: "/rewards", icon: "/Frame (9).png", label: "Rewards" },
        { href: "/me", icon: "/Frame (10).png", label: "Me" },
    ];

    return (
        <nav className="bottom-nav">
            <ul>
                {links.map((link) => (
                    <li
                        key={link.href}
                        className={pathname === link.href ? "active" : ""}
                    >
                        <Link href={link.href}>
                            <Image src={link.icon} alt={link.label} width={30} height={30} />
                            <span>{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

