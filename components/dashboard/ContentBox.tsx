"use client";
import Image from "next/image";
import "@/styles/dasboard/contentBox.scss";

interface Content {
    id: number;
    name: string;
    dueInfo: string;
    reminderType: string;
    icon: string;
    buttonLabel: string;
    buttonStyle?: string; 
}

export const ContentBox = () => {
    const contents: Content[] = [
        {
            id: 1,
            name: "Electricity",
            dueInfo: "due in 2 days",
            reminderType: "Manual reminder",
            icon: "/Frame (5).png",
            buttonLabel: "Pay now",
        },
        {
            id: 2,
            name: "Netflix",
            dueInfo: "due on 3rd October",
            reminderType: "Auto deduct",
            icon: "/Frame (6).png",
            buttonLabel: "View",
            buttonStyle: "view",
        },
    ];

    if (contents.length === 0) {
        return (
        <div className="bills">
            <div className="bills1">
            <div className="textb">
                <p>Your Next Bills</p>
            </div>
            <div className="empty-state">
                <Image src="/Frame (27).png" alt="No bills" width={100} height={100} />
                <p>You currently have no upcoming bills. Add one to get started!</p>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="bills">
        <div className="bills1">
            <div className="textb">
            <p>Your Next Bills</p>
            </div>

            <div className="billitem">
            {contents.map((contenti) => (
                <div className="billitem1" key={contenti.id}>
                <div className="billi">
                    <div className="billimg">
                    <Image src={contenti.icon} alt={contenti.name} width={20} height={20} />
                    </div>
                    <div>
                    <p>{contenti.name} {contenti.dueInfo}</p>
                    <p>{contenti.reminderType}</p>
                    </div>
                </div>
                <button className={contenti.buttonStyle ? contenti.buttonStyle : ""}>
                    {contenti.buttonLabel}
                </button>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};
