import type { TagAttributes } from './tag.js';

export type FormTemplate = Record<string, unknown>;

export interface InputOptions {
    as?: 'input' | 'textarea';
    label?: string;
    labelHtml?: TagAttributes;
    [attribute: string]: TagAttributes[string] | TagAttributes;
}

export interface InputField {
    kind: 'input' | 'textarea';
    name: string;
    label: string;
    labelAttributes: TagAttributes;
    value: string;
    attributes: TagAttributes;
}

export interface SubmitField {
    kind: 'submit';
    value: string;
}

export type FormField = InputField | SubmitField;

export interface Form {
    action: string;
    method: string;
    fields: readonly FormField[];
}
