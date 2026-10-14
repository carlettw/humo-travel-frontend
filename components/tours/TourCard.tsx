"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useT } from "next-i18next/client";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { getMediaUrl } from "@/lib/media";
import { localizedText, localizedHref, formatPrice } from "@/lib/utils";
import type { Tour } from "@/types";
import { TourImagePlaceholder } from "@/components/tours/TourImagePlaceholder";

export function TourCard({ tour, viewLabel }: { tour: Tour; viewLabel: string }) {
    const params = useParams<{ lng: string }>();
    const lng = params.lng ?? "en";
    const { t } = useT("home");
    const imageUrl = getMediaUrl(tour.cover_image ?? tour.images?.[0]);

    const title = localizedText(tour.title, lng);
    const shortDescription = localizedText(tour.short_description, lng);
    const countryName = tour.countries?.[0] ? localizedText(tour.countries[0].name, lng) : "";

    const duration = tour.duration_days
        ? `${tour.duration_days} ${t("popular.days_short")}${
              tour.duration_nights ? ` ${tour.duration_nights} ${t("popular.nights_short")}` : ""
          }`
        : "";

    return (
        <Link
            href={localizedHref(lng, `/tours/${tour.slug}`)}
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="img-zoom relative h-56 bg-muted overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
                ) : (
                    <TourImagePlaceholder className="h-full w-full" />
                )}
                {duration && (
                    <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow">
                        <Clock className="h-3.5 w-3.5" />
                        {duration}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 text-lg font-extrabold text-primary">
                    {formatPrice(tour.price, tour.currency)}
                </div>
                <h3 className="mb-2 text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
                {shortDescription && (
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{shortDescription}</p>
                )}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    {countryName ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {countryName}
                        </span>
                    ) : (
                        <span />
                    )}
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        {viewLabel}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
