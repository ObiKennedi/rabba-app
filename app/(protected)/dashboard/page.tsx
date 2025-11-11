import TopBar  from "@/components/dashboard/TopBar";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { ContentBox } from "@/components/dashboard/ContentBox";
import {Services} from "@/components/dashboard/Services";
import Ads from "@/components/dashboard/Ads";
import styles from "@/styles/dasboard/dashboard.module.scss";


export default function DashboardPage() {
    return (
        <main className={styles.dashboard}>
            <TopBar />
            <ContentBox />
            <Services />
            <Ads />
            <BottomNav />
        </main>
    );
}