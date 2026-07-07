import {parse as parseJson} from 'jsonc-parser';
import { load , dump } from 'js-yaml';
import {js2xml , xml2js} from 'xml-js';
import {parse as parseCsv} from 'csv-parse/sync';


function parseInput(input, fromFormat) {
    if(fromFormat === 'json'){
        const parsedValue = parseJson(input);
        if(parsedValue === undefined) {
            throw new Error ('JSON input is invalid');
        }
        return parsedValue;
    }

    if(fromFormat === 'yaml'){
        return load (input);
    }
   if(fromFormat === 'xml'){
    return xml2js(input, {compact: true, nativeType: true , ignoreComment: true});
   }
   if(fromFormat === 'csv'){
    const records = parseCsv(input, {columns: true , skip_empty_lines: true});
    return records;
   }
    throw new Error('unsupported source format.');
}

function toCsv(value) {
    if(Array.isArray(value)){
        if (value.length === 0){
            return '';
        }
        const headers = object.keys(value[0]);
        const rows = value.map((row) => headers.map((header) => row[header] ?? '').join(','));
        return [headers.join(','), ...rows].join('\n');
    }

    if(value && typeof value === 'object' ){
        const entries = object.entries(value);
        return entries.map(([key, val]) => `${key},${string(val)}`).join('\n');
    }
    return String(Value);
}


function convertValue(value, toFormat){
    if(toFormat === 'json'){
        return JSON.stringify(value , null , 2);
    }

    if(toFormat ==='yaml'){
         return dump(value);
    }

    if(toFormat === 'xml'){
        const xmlObj = (typeof value === 'object' && value !== null && !Array.isArray(value) && object.keys(value).length === 1) ? value : {root : value};
        return js2xml(xmlObj, { compact: true, spaces : 2 });
    }

    if(toFormat === 'csv'){
        return toCsv(value);
    }

    throw new Error ('unsupported target format.');
}

 export function convertContent(input, fromFormat, toFormat){
    const parsedValue = parseInput(input, fromFormat);
    const result = convertValue(parsedValue , toFormat);
    return { output: result};
 }