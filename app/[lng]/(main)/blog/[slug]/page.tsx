import Link from "next/link";
import { notFound } from "next/navigation";
import { getT } from "next-i18next/server";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogBySlug } from "@/lib/api";
import { getMediaUrl } from "@/lib/media";
import { localizedHref } from "@/lib/utils";
import { formatDate } from "@/components/blog/BlogCard";
import type { BlogDetail } from "@/types";

export const dynamic = "force-dynamic";

/** Admin yozgan HTML'dan xavfli teglar va hodisa atributlarini olib tashlaydi */
function sanitize(html: string): string {
    return html
        .replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
        .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
        .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, "$1=$2#$2");
}

export default async function BlogDetailPage({ params }: { params: Promise<{ lng: string; slug: string }> }) {
    const { lng, slug } = await params;
    const { t } = await getT("home", { lng });

    let post: BlogDetail | null = null;
    try {
        post = await getBlogBySlug(slug, lng);
    } catch {
        post = null;
    }
    if (!post) notFound();

    const image = getMediaUrl(post.cover_image);
    const content = typeof post.content === "string" ? post.content : "";
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);

    return (
        <article className="pt-28 pb-20 bg-background min-h-screen">
            <div className="mx-auto max-w-3xl px-4">
                <Link
                    href={localizedHref(lng, "/blog")}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("blog.back")}
                </Link>

                <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">{post.title}</h1>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                    {post.published_at && (
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.published_at, lng)}
                        </span>
                    )}
                    {post.read_time_minutes ? (
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {post.read_time_minutes} {t("blog.min_read")}
                        </span>
                    ) : null}
                </div>

                {image && (
                    <img src={image} alt={post.title} className="mt-8 w-full rounded-2xl object-cover max-h-[28rem] shadow-lg" />
                )}

                {isHtml ? (
                    <div
                        className="mt-8 text-base leading-8 text-foreground/90 [&_p]:mb-5 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_img]:rounded-xl [&_img]:my-6"
                        dangerouslySetInnerHTML={{ __html: sanitize(content) }}
                    />
                ) : (
                    <div className="mt-8 whitespace-pre-line text-base leading-8 text-foreground/90">{content}</div>
                )}
            </div>
        </article>
    );
}
