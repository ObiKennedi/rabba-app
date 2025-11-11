"use client";

import { useState, useEffect} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "@/styles/dasboard/ads.scss";

interface Ad {
    id: number;
    imageUrl: string;
    link?: string;
}

const AdsCarousel = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [current, setCurrent] = useState(0);
    const interval = 4000;

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await fetch("/api/user/ads");
                if (!res.ok) throw new Error("Failed to fetch ads");
                const data = await res.json();
                setAds(data);
            } catch (error) {
                console.error("Error loading ads:", error);
            }
        };

        fetchAds();
    }, []);

    useEffect(() => {
        if (ads.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % ads.length);
        }, interval);
        return () => clearInterval(timer);
    }, [ads, interval]);

    if (ads.length === 0) {
        return <div></div>;
    }

    const ad = ads[current];

    return (
        <div className="carousel">
            <AnimatePresence mode="wait">
                <motion.div
                    key={ad.id}
                    className="slide"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.6 }}
                >
                    {ad.link ? (
                        <a href={ad.link} target="_blank" rel="noopener noreferrer">
                            <Image
                                src={ad.imageUrl}
                                alt={`Ad ${ad.id}`}
                                width={355}
                                height={171}
                                className="image"
                                priority
                            />
                        </a>
                    ) : (
                        <Image
                            src={ad.imageUrl}
                            alt={`Ad ${ad.id}`}
                            width={355}
                            height={171}
                            className="image"
                            priority
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="dots">
                {ads.map((_, i) => (
                    <button
                        key={i}
                        className={`dot ${i === current ? "active" : ""}`}
                        onClick={() => setCurrent(i)}
                    />
                ))}
            </div>
        </div>
    );
};
export default AdsCarousel;

