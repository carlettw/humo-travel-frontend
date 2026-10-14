"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useT } from "next-i18next/client";
import { ArrowRight } from "lucide-react";
import { localizedHref } from "@/lib/utils";
import { TourCard } from "@/components/tours/TourCard";
import { Reveal } from "@/components/shared/Reveal";
import type { Tour } from "@/types";

export function PopularTours({ tours }: { tours: Tour[] }) {
    const { t } = useT("home");
    const params = useParams<{ lng: string }>();
    const lng = params.lng ?? "en";

    return (
        <section className="py-20 bg-muted/60">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <span className="eyebrow">{t("popular.eyebrow")}</span>
                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-foreground">
                            {t("popular.title")}
                        </h2>
                    </div>
                    <Link
                        href={localizedHref(lng, "/tours")}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                        {t("popular.view_all")}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {tours.slice(0, 6).map((tour, i) => (
                        <Reveal key={tour.id} delay={(i % 3) * 120} className="h-full">
                            <TourCard tour={tour} viewLabel={t("popular.view")} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
