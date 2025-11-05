import TopBar  from "@/components/dashboard/TopBar";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { ContentBox } from "@/components/dashboard/ContentBox";
import {Services} from "@/components/dashboard/Services";
import styles from "@/styles/dasboard/dashboard.module.scss";
import Image from "next/image";


export default function DashboardPage() {
    return (
        <main className={styles.dashboard}>
            <TopBar />
            <ContentBox />
            <Services />
            <Image src="/Frame 22.png" alt="avatar" width={399} height={171} />
            <BottomNav />
        </main>
    );
}