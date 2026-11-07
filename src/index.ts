import { FormBuilder } from './form-builder.js';
import { renderForm } from './render.js';
import type { FormTemplate } from './types.js';

export type {
    Form,
    FormField,
    FormTemplate,
    InputField,
    InputOptions,
    SubmitField,
} from './types.js';
export { FormBuilder } from './form-builder.js';
export { renderForm } from './render.js';

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

    return renderForm({ action: url, method, fields: builder.fields });
};

const HexletCode = { formFor };

export default HexletCode;
