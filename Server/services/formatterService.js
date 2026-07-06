import { parse } from 'jsonc-parser';

export function formatJson(input, options = {}) {
    const { indent = 2, mode = 'pretty' } = options;
    const parsed = parse(input);
    if(parsed == undefined) {
        throw new Error('input is not valid JSON.');
    }if(mode === 'minify'){
        return JSON.stringify(parsed);

    }
  
    const spacing = (indent === 'tab' || indent === '\t') ? '\t' : ' '.repeat(Number(indent) || 2) ;
    return JSON.stringify(parsed, null, spacing);

}