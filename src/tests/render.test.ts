import { describe, expect, it } from 'vitest';
import { renderForm } from '../render.js';

describe('renderForm', () => {
    it('renders a form from a hand-written structure', () => {
        const html = renderForm({
            action: '/users',
            method: 'get',
            fields: [
                { kind: 'input', name: 'email', label: 'Email', value: 'a@b.c', attributes: {} },
                { kind: 'submit', value: 'Go' },
            ],
        });

        expect(html).toBe(
            '<form method="get" action="/users">' +
                '<label for="email">Email</label>' +
                '<input name="email" type="text" value="a@b.c">' +
                '<input type="submit" value="Go">' +
                '</form>',
        );
    });
});
