import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { getMediaUrl } from "@/lib/media";
import { localizedHref } from "@/lib/utils";
import type { BlogListItem } from "@/types";

export function formatDate(iso: string | null, lng: string) {
    if (!iso) return "";
    const locale = lng === "uz" ? "uz-UZ" : lng === "ru" ? "ru-RU" : "en-GB";
    return new Date(iso).toLocaleDateString(locale, { year: "numeric", month: "short", day: "2-digit" });
}

export function BlogCard({
    post,
    lng,
    readMore,
    minRead,
}: {
    post: BlogListItem;
    lng: string;
    readMore: string;
    minRead: string;
}) {
    const image = getMediaUrl(post.cover_image);
    const href = localizedHref(lng, `/blog/${post.slug}`);
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Link href={href} className="img-zoom relative block h-52 bg-muted overflow-hidden">
                {image && <img src={image} alt={post.title} className="h-full w-full object-cover" />}
            </Link>
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                    {post.published_at && (
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(post.published_at, lng)}
                        </span>
                    )}
                    {post.read_time_minutes ? (
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {post.read_time_minutes} {minRead}
                        </span>
                    ) : null}
                </div>
                <h3 className="mb-4 text-lg font-bold leading-snug text-foreground line-clamp-3 group-hover:text-primary transition-colors">
                    <Link href={href}>{post.title}</Link>
                </h3>
                <Link href={href} className="mt-auto text-sm font-semibold text-primary hover:text-accent transition-colors">
                    {readMore} →
                </Link>
            </div>
        </article>
    );
}
