import { describe, expect, it } from 'vitest';
import { FormBuilder } from '../form-builder.js';

describe('FormBuilder', () => {
    const template = { name: 'rob', job: 'hexlet' };

    it('collects the form structure without any HTML', () => {
        const builder = new FormBuilder(template);

        builder.input('name', { class: 'user-input' });
        builder.input('job', { as: 'textarea' });
        builder.submit();

        expect(builder.fields).toEqual([
            {
                kind: 'input',
                name: 'name',
                label: 'Name',
                value: 'rob',
                attributes: { class: 'user-input' },
            },
            { kind: 'textarea', name: 'job', label: 'Job', value: 'hexlet', attributes: {} },
            { kind: 'submit', value: 'Save' },
        ]);
    });

    it('does not add a field if it does not exist in the template', () => {
        const builder = new FormBuilder(template);

        expect(() => builder.input('age')).toThrow("Field 'age' does not exist in the template.");
        expect(builder.fields).toEqual([]);
    });
});
