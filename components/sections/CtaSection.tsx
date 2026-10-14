import { getT } from "next-i18next/server";
import { Phone, MapPin, Mail } from "lucide-react";
import { siteConfig, getLocalizedSiteField } from "@/lib/site-config";

export async function CtaSection({ lng }: { lng: string }) {
    const { t } = await getT("home", { lng });
    const items = [
        { icon: Phone, value: siteConfig.contact.phone, label: t("cta.phone"), href: "tel:" + siteConfig.contact.phone.replace(/\s+/g, "") },
        { icon: MapPin, value: getLocalizedSiteField(siteConfig.contact.address, lng), label: t("cta.office") },
        { icon: Mail, value: siteConfig.contact.email, label: t("cta.email"), href: "mailto:" + siteConfig.contact.email },
    ];
    return (
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="relative mx-auto max-w-5xl px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold">{t("cta.title")}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">{t("cta.subtitle")}</p>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {items.map(({ icon: Icon, value, label, href }) => {
                        const inner = (
                            <div className="h-full rounded-2xl bg-white/10 p-6 backdrop-blur ring-1 ring-white/20 hover:bg-white/20 transition-colors">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold break-words">{value}</h3>
                                <p className="mt-1 text-sm text-primary-foreground/70">{label}</p>
                            </div>
                        );
                        return href ? (
                            <a key={label} href={href} className="block">{inner}</a>
                        ) : (
                            <div key={label}>{inner}</div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
