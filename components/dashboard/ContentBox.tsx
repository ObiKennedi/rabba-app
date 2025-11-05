"use client";
import Image from "next/image";
import "@/styles/dasboard/contentBox.scss";


export const ContentBox = () => {
    return (
        <div className="bills">
            <div className="bills1">
                <div className="textb"><p>Your Next Bills</p></div>
                <div className="billitem">
                    <div className="billitem1">
                        <div className="billi">
                            <div className="billimg"><Image src="/Frame (5).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>Electricity due in 2 days</p>
                                <p>Manual reminder</p>
                            </div>
                        </div>
                        <button>Pay now</button>
                    </div>
                    <div className="billitem1">
                        <div className="billi">
                            <div className="billimg"><Image src="/Frame (6).png" alt="avatar" width={20} height={20} /></div>
                            <div>
                                <p>Netflix due on 3rd October</p>
                                <p>Auto deduct</p>
                            </div>
                        </div>
                        <button className="view">View</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
