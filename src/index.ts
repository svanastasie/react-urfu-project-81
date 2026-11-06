import { FormBuilder, type FormTemplate } from './form-builder.js';
import { Tag } from './tag.js';

export type { FormTemplate, InputOptions } from './form-builder.js';
export { FormBuilder } from './form-builder.js';

export interface FormOptions {
    url?: string;
    method?: string;
}

const formFor = (
    template: FormTemplate,
    options: FormOptions,
    callback: (f: FormBuilder) => void,
): string => {
    const { url = '#', method = 'post' } = options;
    const builder = new FormBuilder(template);

    callback(builder);

    return new Tag('form', { action: url, method }, builder.toString()).toString();
};

const HexletCode = { formFor };

export default HexletCode;
