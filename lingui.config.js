module.exports = {
  locales: ['en', 'ru', 'es', 'fr', 'el', 'hu', 'he'],
  catalogs: [
    {
      path: 'src/phonedo_i18n/src/{locale}',
      include: ['src']
    }
  ],
  format: 'po',
  sourceLocale: 'en'
};
