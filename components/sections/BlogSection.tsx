import Link from "next/link";
import { getT } from "next-i18next/server";
import { localizedHref } from "@/lib/utils";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogListItem } from "@/types";

export async function BlogSection({ posts, lng }: { posts: BlogListItem[]; lng: string }) {
    const { t } = await getT("home", { lng });
    if (posts.length === 0) return null;
    return (
        <section className="py-20 bg-background">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <span className="eyebrow">{t("blog.eyebrow")}</span>
                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-foreground">{t("blog.title")}</h2>
                    </div>
                    <Link
                        href={localizedHref(lng, "/blog")}
                        className="rounded-full border-2 border-primary px-6 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                        {t("blog.view_all")}
                    </Link>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.slice(0, 3).map((post) => (
                        <BlogCard key={post.id} post={post} lng={lng} readMore={t("blog.read_more")} minRead={t("blog.min_read")} />
                    ))}
                </div>
            </div>
        </section>
    );
}
