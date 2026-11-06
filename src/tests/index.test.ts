import { describe, expect, it } from 'vitest';
import HexletCode from '../index.js';

describe('HexletCode.formFor', () => {
    const template = { name: 'rob', job: 'hexlet', gender: 'm' };

    it('generates an empty form with the default action', () => {
        const form = HexletCode.formFor(template, {}, () => {});

        expect(form).toBe('<form action="#" method="post"></form>');
    });

    it('uses the url option as the form action', () => {
        const form = HexletCode.formFor(template, { url: '/users' }, () => {});

        expect(form).toBe('<form action="/users" method="post"></form>');
    });
});
