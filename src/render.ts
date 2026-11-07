import { escapeText } from './escape.js';
import { Tag } from './tag.js';
import type { Form, FormField } from './types.js';

const renderField = (field: FormField): string => {
    if (field.kind === 'submit') {
        return new Tag('input', { type: 'submit', value: field.value }).toString();
    }

    const { name, label, value, attributes } = field;
    const labelTag = new Tag('label', { for: name }, escapeText(label));
    const control =
        field.kind === 'textarea'
            ? new Tag('textarea', { cols: 20, rows: 40, name, ...attributes }, escapeText(value))
            : new Tag('input', { name, type: 'text', value, ...attributes });

    return `${labelTag}${control}`;
};

export const renderForm = ({ action, method, fields }: Form): string =>
    new Tag('form', { action, method }, fields.map(renderField).join('')).toString();
