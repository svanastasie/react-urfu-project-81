import { Tag } from './tag.js';

export type FormTemplate = Record<string, unknown>;

export interface FormOptions {
    url?: string;
}

const formFor = (
    _template: FormTemplate,
    options: FormOptions,
    _callback: (f: unknown) => void,
): string => {
    const { url = '#' } = options;

    return new Tag('form', { action: url, method: 'post' }).toString();
};

const HexletCode = { formFor };

export default HexletCode;
