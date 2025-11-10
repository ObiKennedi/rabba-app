"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import "@/styles/dasboard/TopBar.scss";

interface UserData {
    name: string;
    balance: number;
    image: string | null;
}

interface ActionItem {
    id: number;
    title: string;
    icon: string;
    width: number;
    height: number;
}

const TopBar = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isChanged, setIsChanged] = useState(false);
    const [greeting, setGreeting] = useState("Hello");

    const actionItems: ActionItem[] = [
        { id: 1, title: "Data", icon: "/Frame (3).png", width: 24, height: 24 },
        { id: 2, title: "Airtime", icon: "/Frame (17).png", width: 24, height: 24 },
        { id: 3, title: "R2R", icon: "/nigeria-naira-icon 1.png", width: 17, height: 18 },
        { id: 4, title: "Airtime to cash", icon: "/Frame (3).png", width: 24, height: 24 },
        { id: 5, title: "Utilities", icon: "/Frame (4).png", width: 24, height: 24 },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get<UserData>("/api/user/balance");
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();

        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting("Good morning");
        } else if (hour < 18) {
            setGreeting("Good afternoon");
        } else {
            setGreeting("Good evening");
        }

        const savedState = localStorage.getItem("isBalanceHidden");
        if (savedState !== null) {
            setIsChanged(savedState === "true");
        }

    }, []);
    useEffect(() => {
        localStorage.setItem("isBalanceHidden", String(isChanged));
    }, [isChanged]);

    const defaultBalImg = "/Frame (1).png";
    const changedBalImg = "/Frame (2).png";
    const defaultAvatar = "/default1.jpeg";

    const userAvatar = 
        userData?.image && userData.image.trim() !== "" ? userData.image : defaultAvatar;

    return (
        <div className="profile">
            <div className="details">
                <div className="details1">
                    <Image src={userAvatar} alt="avatar" width={44} height={44} />
                    <div className="details2">
                        <p>{greeting},</p>
                        <p>{userData?.name || "Loading..."}</p>
                    </div>
                </div>
                <Image src="/Frame.png" alt="bell" width={24} height={24} />
            </div>

            <div className="balance">
                <div className="bal">
                    <p>Rabba balance</p>
                    <Image
                        src={isChanged ? changedBalImg : defaultBalImg}
                        alt="balance icon"
                        width={20}
                        height={20}
                        onClick={() => setIsChanged(!isChanged)}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                <h2>
                    &#8358;{" "}
                    <span>
                        {isChanged
                            ? "*****"
                            : userData?.balance != null
                                ? userData.balance.toLocaleString()
                                : "0.00"}
                    </span>
                </h2>
                <button>Fund account</button>
            </div>

            <div className="items">
                {actionItems.map((item) => (
                    <div key={item.id}>
                        <div>
                            <Image
                                src={item.icon}
                                alt={item.title}
                                width={item.width}
                                height={item.height}
                            />
                        </div>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopBar;
