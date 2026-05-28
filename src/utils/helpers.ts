/**
 * @description Creates a navigation guard that adds a locale to the query if it is not present.
 */
export function createStickyLocale(fallbackLocale: string = 'en') {
  return function stickyLocale(to: any, from: any, next: Function) {
      const toLocale = to.query.locale;
      const fromLocale = from.query.locale;

      const newLocale = toLocale ?? fromLocale ?? fallbackLocale;

      newLocale !== toLocale 
          ? next({ ...to, query: { ...to.query, locale: newLocale } })
          : next();
  };
}
