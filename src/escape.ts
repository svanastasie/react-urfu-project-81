export const escapeText = (value: string): string =>
    value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export const escapeAttribute = (value: string): string =>
    escapeText(value).replaceAll('"', '&quot;');
