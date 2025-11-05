"use client";

import Image from "next/image";
import { useState } from "react";
import "@/styles/dasboard/bills.scss"



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

function HereComponent() {
    return (
        <div className="bills-content">
            <div className="tab-content">
                <div className="tab-content1">
                    <div className="tab-content2">
                        <div className="tab-contentimg"><Image src="/Frame (5).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>Electricity</p>
                                <p>Paid Sep 5, 2025 2:35 AM</p>
                            </div>
                    </div>
                    <p>2500</p>
                </div>
                <div className="tab-content1">
                    <div className="tab-content2">
                        <div className="tab-contentimg"><Image src="/Frame (6).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>DSTV</p>
                                <p>Paid Sep 4, 2025 4:50 PM</p>
                            </div>
                    </div>
                    <p>2500</p>
                </div>
                <div className="tab-content1">
                    <div className="tab-content2">
                        <div className="tab-contentimg"><Image src="/Frame (5).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>Electricity</p>
                                <p>Paid Sep 5, 2025 2:35 AM</p>
                            </div>
                    </div>
                    <p>2500</p>
                </div>
                <div className="tab-content1">
                    <div className="tab-content2">
                        <div className="tab-contentimg"><Image src="/Frame (6).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>DSTV</p>
                                <p>Paid Sep 4, 2025 4:50 PM</p>
                            </div>
                    </div>
                    <p>2500</p>
                </div>
                
            </div>
        </div>
        
    );
}

function PendingComponent() {
    return (
        <div className="bills-content">
            <div className="tab-content">
                <div className="tab-content1">
                    <div className="tab-content2">
                        <div className="tab-contentimg"><Image src="/Frame (5).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>Electricity</p>
                                <p className="sub">2 days overdue</p>
                                <p className="sub">Manual reminder</p>
                            </div>
                    </div>
                    <button>Pay now</button>
                </div>
                <div className="tab-content1">
                    <div className="tab-content2">
                        <div className="tab-contentimg"><Image src="/Frame (6).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>DSTV</p>
                                <p className="sub">2 days overdue</p>
                                <p className="sub">Manual reminder</p>
                            </div>
                    </div>
                    <button>Pay now</button>
                </div>
                <div className="tab-content1">
                    <div className="tab-content2">
                        <div className="tab-contentimg"><Image src="/Frame (5).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>Electricity</p>
                                <p className="sub">2 days overdue</p>
                                <p className="sub">Manual reminder</p>
                            </div>
                    </div>
                    <button>Pay now</button>
                </div>
                <div className="tab-content1">
                    <div className="tab-content2">
                        <div className="tab-contentimg"><Image src="/Frame (6).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>DSTV</p>
                                <p className="sub">5 days overdue</p>
                                <p className="sub">Manual reminder</p>
                            </div>
                    </div>
                    <button>Pay now</button>
                </div>
            </div>
        </div>
    );
}

function HistoryComponent() {
    return (
        <div className="history">
            <div className="history1">
                <div className="history2">
                    <p>All Categories</p>
                    <div className="tab-contentimg"><Image src="/Frame (14).png" alt="avatar" width={20} height={20} /></div>
                </div>
                <div className="history2">
                    <select name="" id="">
                        <option value="" disabled selected hidden>All Status</option>
                        <option value="">dstv</option>
                        <option value="">dstv</option>
                        <option value="">dstv</option>
                    </select>
                </div>
            </div>
            <div className="bills-content">
                <div className="tab-content">
                    <div className="tab-content1">
                        <div className="tab-content2">
                            <div className="tab-contentimg"><Image src="/Frame (5).png" alt="avatar" width={20} height={20} /></div>
                                <div>
                                    <p>DSTV</p>
                                    <p>Paid Sep 5, 2025 2:35 AM</p>
                                </div>
                        </div>
                        <p>2500</p>
                    </div>
                    <div className="tab-content1">
                        <div className="tab-content2">
                            <div className="tab-contentimg"><Image src="/Frame (6).png" alt="avatar" width={20} height={20} /></div>
                                <div>
                                    <p>DSTV</p>
                                    <p className="sub">Failed Sep 4, 2025 2:00 PM</p>
                                    <p className="sub">Insufficient funds</p>
                                </div>
                        </div>
                        <p className="sub">2500</p>
                    </div>
                    <div className="tab-content1">
                        <div className="tab-content2">
                            <div className="tab-contentimg"><Image src="/Frame (5).png" alt="avatar" width={20} height={20} /></div>
                                <div>
                                    <p>DSTV</p>
                                    <p className="sub1">Reversed Sep 3, 2025 1:52 PM</p>
                                </div>
                        </div>
                        <p className="sub">2500</p>
                    </div>
                    <div className="tab-content1">
                        <div className="tab-content2">
                            <div className="tab-contentimg"><Image src="/Frame (5).png" alt="avatar" width={20} height={20} /></div>
                                <div>
                                    <p>DSTV</p>
                                    <p>Paid Sep 5, 2025 2:35 AM</p>
                                </div>
                        </div>
                        <p>2500</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
