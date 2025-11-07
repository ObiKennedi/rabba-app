//for the history section the transcations that were reversed will use class of sub1 for the text colour the completed transcation which are the ones in the active will be normal as shown in the active section while the failed ones will use class of sub as shown in the pending section only that the pay noew button will change to the price of the bill.

"use client";

import Image from "next/image";
import { useState } from "react";
import "@/styles/dasboard/bills.scss"


interface Bill {
    id: number;
    name: string;
    icon: string;
    amount: number;
    date?: string;
    status?: string;
    substatus?: string;
}

export default function Bills() {
    const [activeTab, setActiveTab] = useState("here");

    return (
        <main className="bills-page">
            <nav className="bills-nav">
                <ul>
                    <li
                        className={activeTab === "here" ? "active" : ""}
                        onClick={() => setActiveTab("here")}
                    >
                        Active
                    </li>
                    <li
                        className={activeTab === "pending" ? "active" : ""}
                        onClick={() => setActiveTab("pending")}
                    >
                        Pending
                    </li>
                    <li
                        className={activeTab === "history" ? "active" : ""}
                        onClick={() => setActiveTab("history")}
                    >
                        History
                    </li>
                </ul>
            </nav>

            {activeTab === "here" && <HereComponent />}
            {activeTab === "pending" && <PendingComponent />}
            {activeTab === "history" && <HistoryComponent />}
        </main>
    );
}

function EmptyState({ message, image }: { message: string; image: string }) {
    return (
        <div className="empty-state">
            <Image src={image} alt="Empty illustration" width={140} height={140} />
            <p>{message}</p>
        </div>
    );
}

function HereComponent() {
    const bills: Bill[] = [
        {
            id: 1,
            name: "Electricity",
            icon: "/Frame (5).png",
            amount: 2500,
            date: "Sep 5, 2025 2:35 AM",
        },
        {
            id: 2,
            name: "DSTV",
            icon: "/Frame (6).png",
            amount: 4800,
            date: "Sep 4, 2025 4:50 PM",
        },
    ]; 

    if (bills.length === 0) {
        return (
            <EmptyState
                image="/Frame (27).png" 
                message="There is no active bill on Rabba yet. Start transacting today"
            />
        );
    }
    return (
        <div className="bills-content">
            <div className="tab-content">
                {bills.map((bill) => (
                    <div className="tab-content1" key={bill.id}>
                        <div className="tab-content2">
                            <div className="tab-contentimg">
                                <Image src={bill.icon} alt={bill.name} width={20} height={20} />
                            </div>
                            <div>
                                <p>{bill.name}</p>
                                <p>Paid {bill.date}</p>
                            </div>
                        </div>
                        <p>{bill.amount.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
        
    );
}

function PendingComponent() {
    const pendingBills: Bill[] = [
        {
            id: 1,
            name: "Electricity",
            icon: "/Frame (5).png",
            amount: 3500,
            status: "2 days overdue",
            substatus: "Manual reminder",
        },
        {
            id: 2,
            name: "DSTV",
            icon: "/Frame (6).png",
            amount: 4800,
            status: "5 days overdue",
            substatus: "Manual reminder",
        },
    ]; 

    if (pendingBills.length === 0) {
        return (
            <EmptyState
                image="/Frame (27).png"
                message="There is no pending bill on Rabba yet. Start transacting today"
            />
        );
    }
    return (
        <div className="bills-content">
            <div className="tab-content">
                {pendingBills.map((bill) => (
                    <div className="tab-content1" key={bill.id}>
                        <div className="tab-content2">
                            <div className="tab-contentimg">
                                <Image src={bill.icon} alt={bill.name} width={20} height={20} />
                            </div>
                            <div>
                                <p>{bill.name}</p>
                                <p className="sub">{bill.status}</p>
                                <p className="sub">{bill.substatus}</p>
                            </div>
                        </div>
                        <button>Pay now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function HistoryComponent() {
    const historyBills: Bill[] = [
        {
            id: 1,
            name: "DSTV",
            icon: "/Frame (6).png",
            amount: 4800,
            status: "Paid Sep 3, 2025 4:00 PM",
        },
        {
            id: 2,
            name: "Electricity",
            icon: "/Frame (5).png",
            amount: 2500,
            status: "Failed Sep 2, 2025 3:15 PM (Insufficient funds)",
        },
        {
            id: 3,
            name: "Airtime",
            icon: "/Frame (3).png",
            amount: 1200,
            status: "Reversed Sep 1, 2025 12:30 PM",
        },
        {
            id: 4,
            name: "Electricity",
            icon: "/Frame (5).png",
            amount: 3500,
            status: "2 days overdue",
            substatus: "Manual reminder",
        },
    ]; 

    if (historyBills.length === 0) {
        return (
            <EmptyState
                image="/Frame (27).png"
                message="You have no history with Rabba yet. Don’t worry, start a transaction to get that solved"
            />
        )
    }
    const getStatusClass = (status: string): string => {
        if (status.toLowerCase().includes("failed")) return "sub";
        if (status.toLowerCase().includes("reversed")) return "sub1";
        if (status.toLowerCase().includes("overdue")) return "sub";
        return "";
    };
    return (
        <div className="history">
            <div className="history1">
                <div className="history2">
                    <p>All Categories</p>
                    <div className="tab-contentimg"><Image src="/Frame (14).png" alt="avatar" width={20} height={20} /></div>
                </div>
                <div className="history2">
                    <select name="status" id="">
                        <option value="" disabled selected hidden>All Status</option>
                        <option value="today">Today</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>
            <div className="bills-content">
                <div className="tab-content">
                    {historyBills.map((bill) => {
                        const statusClass = getStatusClass(bill.status!);
                        return (
                            <div className="tab-content1" key={bill.id}>
                                <div className="tab-content2">
                                    <div className="tab-contentimg">
                                        <Image
                                            src={bill.icon}
                                            alt={bill.name}
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div>
                                        <p>{bill.name}</p>
                                        <p className={statusClass}>{bill.status}</p>
                                        {bill.substatus && (
                                            <p className={statusClass}>{bill.substatus}</p>
                                        )}
                                    </div>
                                </div>

                                <p className={statusClass}>
                                    {bill.amount.toLocaleString()}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
            
        </div>
    );
}
