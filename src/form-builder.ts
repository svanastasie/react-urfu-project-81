import type { FormField, FormTemplate, InputOptions } from './types.js';

const toLabel = (name: string): string => `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

export class FormBuilder {
    private readonly formFields: FormField[] = [];

    constructor(private readonly template: FormTemplate) {}

    public get fields(): readonly FormField[] {
        return this.formFields;
    }

    public input(name: string, { as = 'input', ...attributes }: InputOptions = {}): void {
        this.formFields.push({
            kind: as,
            name,
            label: toLabel(name),
            value: this.getValue(name),
            attributes,
        });
    }

    public submit(text = 'Save'): void {
        this.formFields.push({ kind: 'submit', value: text });
    }

    private getValue(name: string): string {
        if (!Object.hasOwn(this.template, name)) {
            throw new Error(`Field '${name}' does not exist in the template.`);
        }

        const value = this.template[name];

        return value === null || value === undefined ? '' : String(value);
    }
}
