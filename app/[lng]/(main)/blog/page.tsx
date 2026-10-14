import { getT } from "next-i18next/server";
import { getBlogs } from "@/lib/api";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogListItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: { params: Promise<{ lng: string }> }) {
    const { lng } = await params;
    const { t } = await getT("home", { lng });

    let posts: BlogListItem[] = [];
    try {
        const res = await getBlogs(lng);
        posts = Array.isArray(res) ? res : [];
    } catch {
        posts = [];
    }

    return (
        <div className="pt-28 pb-20 bg-muted/40 min-h-screen">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-12">
                    <span className="eyebrow">{t("blog.eyebrow")}</span>
                    <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-foreground">{t("blog.page_title")}</h1>
                </div>
                {posts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-20">{t("blog.empty")}</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post} lng={lng} readMore={t("blog.read_more")} minRead={t("blog.min_read")} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
