import { i18n } from '@lingui/core';
import {  webRtcLocales } from '../../model/webRtc';

export class LocaleLoader {
  constructor() {
    Object.keys(webRtcLocales).forEach((locale) => {
      i18n.loadLocaleData(locale, {});
    });
  }

  setLocale = async (locale: string) => {
    locale=locale.substring(0,2);
    const { messages } = await import(
      /* webpackChunkName: "i18n-[index]" */ 
      `@lingui/loader!../../../phonedo_i18n/src/${locale}.po`
    );
    i18n.load(locale, messages);
    i18n.activate(locale);
  };
}
