/*Copyright (C) 2024 European Union

 __

Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the

European Commission – subsequent versions of the EUPL (the “Licence”);

You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:

*

https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

*

Unless required by applicable law or agreed to in writing, software distributed under

the Licence is distributed on an “AS IS” basis, WITHOUT WARRANTIES OR CONDITIONS

OF ANY KIND, either express or implied. See the Licence for the specific language

governing permissions and limitations under the Licence.*/
import { cloneDeep } from 'lodash';
import { i18n } from '@/main';
import type { SelectObject } from '@/components/health-data/application/commonTypes';

export const getSafeHref = (href: string | Node) => {
  if (typeof href !== 'string' || !href) {
    return ''; // or return null, depending on how you want to handle invalid inputs
  }

  // Check if the URL is external (starts with http:// or https://)
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  // If it's an external URL, ensure it’s safe
  if (isExternal) {
    // Sanitize the URL to remove any harmful content
    return DOMPurify.sanitize(href); // Ensure URL is sanitized
  }

  // Otherwise, return the URL as it is (local URLs can be trusted)
  return href;
};

/** Generates a unique ID. */
export const generateUniqueID = (() => {
  if (crypto?.randomUUID) return () => crypto.randomUUID();

  // Fallbacks for local development and non-secure environments
  if (crypto?.getRandomValues) {
    return () =>
      Array.from(crypto.getRandomValues(new Uint32Array(10)), (n) => n.toString(36)).join('-');
  }
  return () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
})();

/**
 * Retrieves the localized text for the given input based on the current locale.
 * If the localized text is not available for the current locale, it falls back to English.
 * @param input - A single string or an object mapping locale codes to strings, e.g. { en: "Hello world", fr: "Bonjour le monde" }.
 * @returns The localized text or an empty string if not found.
 */
export function getLocaleText(input: Record<string, string> | string | undefined): string {
  if (!input) return '';
  if (typeof input === 'string') return input;
  return input[i18n.global.locale.value] ?? input.en ?? '';
}

/**
 * Returns a list of supported languages for a select input.
 * @param omit - An optional Set of locale codes to omit from the result.
 * @returns An array of SelectObject representing the supported languages.
 */
export function getSupportedLanguagesForSelect(omit?: Set<string>): SelectObject[] {
  const userLocale = i18n.global.locale.value;
  const displayNames = new Intl.DisplayNames(userLocale, { type: 'language' });
  const availableLocales = omit
    ? i18n.global.availableLocales.filter((locale) => !omit.has(locale))
    : i18n.global.availableLocales;
  return availableLocales
    .map((locale) => ({ key: locale, value: displayNames.of(locale) ?? locale }))
    .sort((a, b) => a.value.localeCompare(b.value, userLocale));
}

/**
 * Returns a list of supported languages for a dropdown select input.
 * @param omit - An optional Set of locale codes to omit from the result.
 * @returns An array of objects with value and label properties representing the supported languages.
 */
export function getSupportedLanguagesForDropdown(omit?: Set<string>) {
  const userLocale = i18n.global.locale.value;
  const displayNames = new Intl.DisplayNames(userLocale, { type: 'language' });
  const availableLocales = omit
    ? i18n.global.availableLocales.filter((locale) => !omit.has(locale))
    : i18n.global.availableLocales;
  return availableLocales
    .map((locale) => ({ value: locale, label: displayNames.of(locale) ?? locale }))
    .sort((a, b) => a.label.localeCompare(b.label, userLocale));
}

/**
 * A utility function to get the entries of an object as an array of key-value pairs.
 * This is a type-safe version of Object.entries that ensures the entries are typed correctly.
 * @param obj - The object to get entries from.
 * @template T - The type of the object.
 * @returns An array of key-value pairs representing the entries of the object.
 */
export function getTypedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * A utility function to get the keys of an object as an array of its keys.
 * This is a type-safe version of Object.keys that ensures the keys are typed correctly.
 * @param obj - The object to get keys from.
 * @template T - The type of the object.
 * @returns An array of keys of the object, typed as (keyof T)[]
 */
export function getTypedKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Deep clones an object and prunes it by removing undefined values and empty strings.
 * @param obj - The object to clone and prune.
 * @param omitIfLast - Optional keys to omit from the result if they are the only keys left in an object.
 * @returns The cloned and pruned object or undefined if the result is empty.
 */
export function cloneDeepAndPrune<T>(obj: T, ...omitIfLast: string[]): T | undefined {
  return pruneDeep(cloneDeep(obj), new Set(omitIfLast));
}

/**
 * Recursively prunes an object, removing undefined values and empty strings.
 * @param obj - The object to prune.
 * @param omitIfLast - An optional set of keys to omit from the result if they are the only keys left in an object.
 * @returns The pruned object or undefined if the result is empty.
 */
export function pruneDeep<T>(obj: T, omitIfLast: Set<string> = new Set()): T | undefined {
  if (obj == null) return undefined;

  // Recurse into each entry and drop undefined
  if (Array.isArray(obj)) {
    const arr = obj
      .map((item) => pruneDeep(item, omitIfLast))
      .filter((x): x is NonNullable<typeof x> => x !== undefined);
    return arr.length ? (arr as never) : undefined;
  }

  if (typeof obj === 'object') {
    const out = {} as T & object;
    for (const [k, v] of getTypedEntries(obj)) {
      const pruned = pruneDeep(v, omitIfLast);
      if (pruned !== undefined) out[k] = pruned;
    }

    // Drop the object if it is empty after pruning
    const keys = Object.keys(out);
    if (keys.length === 0) return undefined;

    // Drop the object if the only keys remaining are the ones to omit
    if (shouldOmit(keys, omitIfLast)) return undefined;

    return out as T;
  }

  // Drop empty strings
  if (obj === '') return undefined;

  // Keep everything else (numbers, booleans, non-empty strings)
  return obj;
}

/**
 * Evaluates whether a set of keys should be omitted based on a provided list.
 * @param keys - The keys to evaluate.
 * @param omitIfLast - An Set of keys to omit if they are the only keys present.
 * @returns True if keys is a subset of omit, false otherwise.
 */
function shouldOmit(keys: string[], omitIfLast: Set<string>): boolean {
  if (omitIfLast.size === 0 || keys.length > omitIfLast.size) return false;
  return keys.every((key) => omitIfLast.has(key));
}
