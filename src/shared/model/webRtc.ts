export const webRtcLocales = {
    en: 'English',
    ru: 'Русский',
    he: 'עִבְרִית',
    fr: 'français',
    hu: 'magyar',
    el: 'Ελληνικά',
    es: 'Español'
} as const;
export type webRtcLocale = keyof typeof webRtcLocales;