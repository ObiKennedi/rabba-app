"use client";
import Image from "next/image";
import "@/styles/dasboard/contentBox.scss";

interface ServiceItem {
    id: number;
    title: string;
    icon: string;
    width: number;
    height: number;
}


export const Services = () => {
    const serviceItems: ServiceItem[] = [
        { id: 1, title: "Electricity", icon: "/Frame (18).png", width: 24, height: 24 },
        { id: 2, title: "TV", icon: "/Frame (19).png", width: 24, height: 24 },
        { id: 3, title: "Education", icon: "/Frame (20).png", width: 17, height: 18 },
        { id: 4, title: "Flight", icon: "/Frame (21).png", width: 24, height: 24 },
        { id: 5, title: "Insurance", icon: "/Frame (22).png", width: 24, height: 24 },
        { id: 6, title: "Water", icon: "/Frame (23).png", width: 24, height: 24 },
        { id: 7, title: "Transport", icon: "/Frame (24).png", width: 24, height: 24 },
        { id: 8, title: "Internet", icon: "/Frame (25).png", width: 24, height: 24 },
        { id: 9, title: "Sports", icon: "/Frame (26).png", width: 24, height: 24 },
        { id: 10, title: "More", icon: "/Group.png", width: 24, height: 24 },

    ];
    return (
        <div className="bills">
            <div className="bills1">
                <div className="textb"><p>Services</p></div>
                <div className="billitem">
                    <div className="billcontent">
                        {serviceItems.map((item) => (
                            <div key={item.id}>
                                <div>
                                    <Image src={item.icon} alt={item.title} width={item.width} height={item.height} />
                                </div>
                                <p>{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
