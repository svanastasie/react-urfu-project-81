import { escapeText } from './escape.js';
import { Tag, type TagAttributes } from './tag.js';

export type FormTemplate = Record<string, unknown>;

export interface InputOptions extends TagAttributes {
    as?: 'input' | 'textarea';
}

export class FormBuilder {
    private readonly fields: Tag[] = [];

    constructor(private readonly template: FormTemplate) {}

    public input(name: string, { as = 'input', ...attributes }: InputOptions = {}): void {
        if (!Object.hasOwn(this.template, name)) {
            throw new Error(`Field '${name}' does not exist in the template.`);
        }

        const rawValue = this.template[name];
        const value = rawValue === null || rawValue === undefined ? '' : String(rawValue);

        if (as === 'textarea') {
            this.fields.push(
                new Tag('textarea', { cols: 20, rows: 40, name, ...attributes }, escapeText(value)),
            );
            return;
        }

        this.fields.push(new Tag('input', { name, type: 'text', value, ...attributes }));
    }

    public toString(): string {
        return this.fields.join('');
    }
}
