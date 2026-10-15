"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalizedHref } from "@/hooks/use-localized-href";
import { HeroSearch } from "./HeroSearch";

const SLIDE_COUNT = 6;
const ROTATE_INTERVAL = 6000;

export function Hero() {
    const { t } = useT("home");
    const withLocale = useLocalizedHref();
    const [index, setIndex] = useState(0);

    const goTo = useCallback((next: number) => {
        setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
    }, []);

    useEffect(() => {
        const id = setInterval(() => setIndex((prev) => (prev + 1) % SLIDE_COUNT), ROTATE_INTERVAL);
        return () => clearInterval(id);
    }, [index]);

    return (
        <section className="relative min-h-[100svh] flex flex-col text-white">
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src="/images/hero_image.jpg"
                    alt="Humo Travel"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[50%_38%] animate-kenburns"
                />
                <div className="absolute inset-0 bg-linear-to-b from-primary/70 via-black/45 to-black/70" />
            </div>

            {/* prev / next */}
            <button
                type="button"
                aria-label="Oldingi"
                onClick={() => goTo(index - 1)}
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                type="button"
                aria-label="Keyingi"
                onClick={() => goTo(index + 1)}
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            <div className="relative z-10 flex-1 flex items-center justify-center pt-28 pb-6 px-4">
                <div key={index} className="max-w-3xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="inline-block rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-medium">
                        {t("hero.eyebrow")}
                    </span>
                    <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight min-h-[2.4em] line-clamp-3">
                        {t(`hero.slide_${index + 1}_title`)}
                    </h1>
                    <p className="mt-4 text-base md:text-xl text-white/85 max-w-2xl mx-auto min-h-14 line-clamp-2">
                        {t(`hero.slide_${index + 1}_subtitle`)}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href={withLocale("/tours")}
                            className="rounded-full bg-accent text-accent-foreground px-8 py-3.5 font-bold shadow-lg hover:brightness-110 hover:-translate-y-0.5 transition-all"
                        >
                            {t("hero.cta_primary")}
                        </Link>
                        <Link
                            href={withLocale("/contact")}
                            className="rounded-full border-2 border-white px-8 py-3.5 font-bold hover:bg-white hover:text-primary transition-colors"
                        >
                            {t("hero.cta_secondary")}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 px-4 pb-10">
                <div className="flex gap-2">
                    {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`${i + 1}-slayd`}
                            onClick={() => goTo(i)}
                            className={cn(
                                "h-2.5 rounded-full transition-all duration-500 cursor-pointer",
                                i === index ? "w-8 bg-accent" : "w-2.5 bg-white/50 hover:bg-white"
                            )}
                        />
                    ))}
                </div>
                <div className="w-full max-w-xl">
                    <HeroSearch />
                </div>
            </div>
        </section>
    );
}
