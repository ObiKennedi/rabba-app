import { NextResponse } from "next/server";

export async function GET() {
    const ads = [
        { id: 1, imageUrl: "/Frame 22.png", link: "https://example.com/ad1" },
        { id: 2, imageUrl: "/logo.png", link: "https://example.com/ad2" },
        { id: 3, imageUrl: "/Ellipse 1.png", link: "https://example.com/ad3" },
    ];

    return NextResponse.json(ads);
}
