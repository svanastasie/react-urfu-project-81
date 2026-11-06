import { escapeAttribute } from './escape.js';

export type TagAttributes = Record<string, string | number | boolean | null | undefined>;

export class Tag {
    private static readonly singleTags = new Set([
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
    ]);

    constructor(
        public tagName: string,
        public attributes: TagAttributes = {},
        public textContent: string = '',
    ) {}

    public toString(): string {
        const isSingle = Tag.singleTags.has(this.tagName.toLowerCase());
        const attrs = this.buildAttributes();
        const openTag = `<${this.tagName}${attrs ? ' ' + attrs : ''}>`;
        return isSingle ? openTag : `${openTag}${this.textContent}</${this.tagName}>`;
    }

    private buildAttributes(): string {
        return Object.entries(this.attributes)
            .flatMap(([key, value]) => {
                if (value === null || value === undefined || value === false) {
                    return [];
                }
                return value === true ? [key] : [`${key}="${escapeAttribute(String(value))}"`];
            })
            .join(' ');
    }
}
