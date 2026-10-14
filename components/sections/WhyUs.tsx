"use client";

import { useT } from "next-i18next/client";
import { Wallet, ShieldCheck, Package, Headphones } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const ITEMS = [
    { icon: Wallet, key: "i1" },
    { icon: ShieldCheck, key: "i2" },
    { icon: Package, key: "i3" },
    { icon: Headphones, key: "i4" },
];

export function WhyUs() {
    const { t } = useT("home");
    return (
        <section className="py-20 bg-background">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-14">
                    <span className="eyebrow">{t("why.eyebrow")}</span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-foreground">{t("why.title")}</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {ITEMS.map(({ icon: Icon, key }, i) => (
                        <Reveal key={key} delay={i * 100} className="h-full">
                            <div className="group h-full rounded-2xl bg-card p-8 text-center shadow-md ring-1 ring-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-foreground">{t(`why.${key}_title`)}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{t(`why.${key}_text`)}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
