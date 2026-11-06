import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import HexletCode from '../index.js';

const readFixture = (name: string): string =>
    readFileSync(new URL(`../__fixtures__/${name}`, import.meta.url), 'utf8')
        .replace(/>\s+</g, '><')
        .trim();

describe('HexletCode.formFor', () => {
    const template = { name: 'rob', job: 'hexlet', gender: 'm' };

    describe('form tag', () => {
        it('generates an empty form with the default action', () => {
            const form = HexletCode.formFor(template, {}, () => {});

            expect(form).toBe('<form action="#" method="post"></form>');
        });

        it('uses the url option as the form action', () => {
            const form = HexletCode.formFor(template, { url: '/users' }, () => {});

            expect(form).toBe('<form action="/users" method="post"></form>');
        });

        it('uses the method option', () => {
            const form = HexletCode.formFor(template, { method: 'get' }, () => {});

            expect(form).toBe('<form action="#" method="get"></form>');
        });
    });

    describe('input', () => {
        it('generates input and textarea fields', () => {
            const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
                f.input('name');
                f.input('job', { as: 'textarea' });
            });

            expect(form).toBe(readFixture('form-with-fields.html'));
        });

        it('adds extra attributes to the field', () => {
            const form = HexletCode.formFor(template, {}, (f) => {
                f.input('name', { class: 'user-input' });
                f.input('job');
            });

            expect(form).toBe(readFixture('form-with-attributes.html'));
        });

        it('uses default textarea attributes', () => {
            const form = HexletCode.formFor(template, {}, (f) =>
                f.input('job', { as: 'textarea' }),
            );

            expect(form).toBe(readFixture('form-with-textarea.html'));
        });

        it('overrides default textarea attributes', () => {
            const form = HexletCode.formFor(template, { url: '#' }, (f) =>
                f.input('job', { as: 'textarea', rows: 50, cols: 50 }),
            );

            expect(form).toBe(readFixture('form-with-textarea-override.html'));
        });

        it('throws if the field does not exist in the template', () => {
            expect(() =>
                HexletCode.formFor(template, { url: '/users' }, (f) => {
                    f.input('name');
                    f.input('age');
                }),
            ).toThrow("Field 'age' does not exist in the template.");
        });

        it('renders an empty value for null and undefined fields', () => {
            const form = HexletCode.formFor({ name: null, job: undefined }, {}, (f) => {
                f.input('name');
                f.input('job', { as: 'textarea' });
            });

            expect(form).toBe(
                '<form action="#" method="post">' +
                    '<label for="name">Name</label>' +
                    '<input name="name" type="text" value="">' +
                    '<label for="job">Job</label>' +
                    '<textarea cols="20" rows="40" name="job"></textarea>' +
                    '</form>',
            );
        });

        it('escapes field values', () => {
            const form = HexletCode.formFor({ bio: '</textarea><b>"hi"</b>' }, {}, (f) => {
                f.input('bio');
                f.input('bio', { as: 'textarea' });
            });

            expect(form).toContain('value="&lt;/textarea&gt;&lt;b&gt;&quot;hi&quot;&lt;/b&gt;"');
            expect(form).toContain('>&lt;/textarea&gt;&lt;b&gt;"hi"&lt;/b&gt;</textarea>');
        });
    });

    describe('submit', () => {
        it('generates a submit button with the default value', () => {
            const form = HexletCode.formFor(template, {}, (f) => {
                f.input('name');
                f.submit();
            });

            expect(form).toBe(
                '<form action="#" method="post">' +
                    '<label for="name">Name</label>' +
                    '<input name="name" type="text" value="rob">' +
                    '<input type="submit" value="Save">' +
                    '</form>',
            );
        });

        it('uses a custom submit button value', () => {
            const form = HexletCode.formFor(template, {}, (f) => {
                f.submit('Wow');
            });

            expect(form).toBe(
                '<form action="#" method="post">' + '<input type="submit" value="Wow">' + '</form>',
            );
        });
    });
});
