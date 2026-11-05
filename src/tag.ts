export type TagAttribute = Record<string, string | number | boolean | null | undefined>;

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
        public attributes: TagAttribute = {},
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
            .filter(([, value]) => value !== null && value !== undefined)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
    }
}
