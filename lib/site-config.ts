export const siteConfig = {
    logo: {
        src: "/images/logo.png",
        alt: "HumoTravel",
        useImage: false,
        name: "Humo",
        nameHighlight: "Travel",
        initials: "HT",
    },

    description: {
        uz: "Humo Travel — sayohatni tashvishsiz va esda qolarli qiladigan kompaniya. Tayyor turlar, mehmonxona, transport va gid xizmatlari bir joyda.",
        ru: "Humo Travel — компания, которая делает путешествия беззаботными и запоминающимися. Готовые туры, отели, транспорт и гиды в одном месте.",
        en: "Humo Travel makes trips carefree and memorable. Ready-made tours, hotels, transport and guides, all in one place.",
    },

    companyName: {
        uz: "Humo Travel sayohat kompaniyasi",
        ru: "Туристическая компания Humo Travel",
        en: "Humo Travel",
    },

    operator: {
        name: "Humo Travel Team",
    },

    contact: {
        email: "humotravel01@gmail.com",
        phone: "+998 97 897 97 22",
        phoneSecondary: "",
        address: {
            uz: "Samarqand, O'zbekiston",
            ru: "Самарканд, Узбекистан",
            en: "Samarkand, Uzbekistan",
        },
    },

    social: {
        instagram: "https://instagram.com/humo_travel",
        facebook: "",
        telegram: "https://t.me/humo_travell",
        youtube: "",
        tiktok: "",
        whatsapp: "https://wa.me/998978979722",
    },
};

export type SiteConfig = typeof siteConfig;
export type SupportedLocale = "uz" | "ru" | "en";

export function getLocalizedSiteField(
    field: Record<SupportedLocale, string>,
    lng: string
): string {
    return field[lng as SupportedLocale] ?? field.uz;
}