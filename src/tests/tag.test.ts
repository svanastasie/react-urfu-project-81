 import { describe, expect, it } from 'vitest';
import { Tag } from '../tag.js';

describe('Tag', () => {
    it('renders a tag with attributes and content', () => {
        const tag = new Tag('label', { for: 'name' }, 'Name');

        expect(tag.toString()).toBe('<label for="name">Name</label>');
    });

    it('renders a single tag without a closing tag', () => {
        const tag = new Tag('input', {
            name: 'name',
            type: 'text',
            value: 'rob',
        });

        expect(tag.toString()).toBe('<input name="name" type="text" value="rob">');
    });

    it('does not render null and undefined attributes', () => {
        const tag = new Tag('input', {
            name: 'name',
            disabled: null,
            value: undefined,
        });

        expect(tag.toString()).toBe('<input name="name">');
    });

    it('renders a tag without attributes', () => {
        expect(new Tag('div', {}, 'text').toString()).toBe('<div>text</div>');
    });

    it('renders true as a boolean attribute and omits false', () => {
        const tag = new Tag('input', { name: 'name', disabled: true, readonly: false });

        expect(tag.toString()).toBe('<input name="name" disabled>');
    });

    it('escapes special characters in attribute values', () => {
        const tag = new Tag('input', { value: '"><script>a&b</script>' });

        expect(tag.toString()).toBe(
            '<input value="&quot;&gt;&lt;script&gt;a&amp;b&lt;/script&gt;">',
        );
    });
});
