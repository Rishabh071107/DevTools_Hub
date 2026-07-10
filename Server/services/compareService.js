import {create} from 'jsondiffpatch'
import {parse} from  'jsonc-parser'


const diffInstance = create({
    textDiff: {minLength: 1},

});


function asJson(value) {
    const parsed = parse(value);
    if(parsed === undefined){
        throw new Error('Both values must be valid JSON.');
    }
    return parsed ; 
}

function summarizeDelta(delta){
    if(!delta || typeof delta !== 'object'){
        return 'No differences detected.';
    }
   
    const changes = Object.keys(delta).length;
    return `Detected ${changes} structural changes ${changes === 1 ? '' : 's'}.`;
}

export function compareJson(leftInput, rightInput){
    const left = asJson(leftInput);
    const right = asJson(rightInput);
    const delta = diffInstance.diff(left,right);

    return {
        delta,
        patch:null,
        summary: summarizeDelta(delta),
        tree: JSON.stringify(delta, null, 2),
    };
}