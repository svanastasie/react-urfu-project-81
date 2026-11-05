import { describe, expect, it } from 'vitest';
import { Tag } from '../src/tag.js';

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
});
