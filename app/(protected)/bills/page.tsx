"use client";

import Image from "next/image";
import { BottomNav } from "@/components/dashboard/BottomNav";
import {ContentBox} from "@/components/dashboard/ContentBox";
import Bills from "@/components/dashboard/Bills"
import styles from "@/styles/dasboard/dashboard.module.scss";
import { useRouter } from "next/navigation";


export default function BillsPage() {
    const router = useRouter();
    const handleBack = () => {
        router.push("/dashboard");
    };
    return (
        <main className={styles.bill} >
            <div className={styles.navtop}>
                <div onClick={handleBack} style={{cursor: "pointer"}}>
                    <Image src="/Frame (11).png" alt="backarrow" width={24} height={24} />
                </div>
                <h3>Bills</h3>
                <div><Image src="/Frame (12).png" alt="searchicon" width={24} height={24} /></div>
            </div>
            <ContentBox />
            <Bills />
            <BottomNav />
        </main>
    );
}