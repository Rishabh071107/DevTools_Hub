import {jsonrepair} from 'jsonrepair';


function countOccurences(text, value){
    let count = 0;
    let index = text.indexof(value);
    while(index !== -1){
        count += 1;
        index = text.indexOf(value, index+value.length);
    }
    return count ;

}

function getDepth(obj){
    if(obj === null || typeof obj !== 'object'){
        return 0;
    }

    let maxDepth = 0 ;
    for(const key in obj){
        if(Object.prototype.hasOwnProperty.call(obj,key)){
             maxDepth = Math.max(maxDepth,getDepth(obj[key]))

             
        }
    }
    return 1+ maxDepth;
}

function buildStatistics(input,repaireed,parsed){
    const lines = input.split(/\r?\n/).length;
    const characters = input.length;
 const keys = (repaired.match(/"([^"]+)"\s*:/g) || []).length;
  const objects = (repaired.match(/\{/g) || []).length;
  const arrays = (repaired.match(/\[/g) || []).length;
  const depth = getDepth(parsed);



return {
    characters,
    lines,
    keys,
    objects,
    arrays,
    depth,
}
}


function buildRepairSummary(input,repaired){
    const issues = [];

    if(input.includes("'")){
        issues.push('single quotes');
    }
    if(input.includes(',,')||input.includes(',]')||input.includes(',}')){
        issues.push('Duplicate or trailing commas');
    }
    if(!input.trim().startsWith('{')&&!input.trim().startsWith('[')){
        issues.push('Missing object or array wrapper');
    }
    if(input.includes(':')&& !input.includes('{')&& !input.includes('[')){
        issues.push('Missing braces');
    }
 const stripped = input.replace(/"[^"]*"/g, '');
  if (countOccurrences(input, '"') === 0 || /([a-zA-Z0-9_]+)\s*:/.test(stripped)) {
    issues.push('Missing quotes');
  }
  const confidence = Math.max(0.4, 1- Math.min(0.6, issues.length * 0.1));
  return {
    issues : issues.length ? issues : ['No obvious structural issues'],
    confidence: Number(confidence.toFixed(2)),
  };
}

export function repairJson(input) {
    const normalizedInput = typeof input === 'string'? input : '';
    const repairedValue = jsonrepair(normalizedInput);
    const parsed = JSON.parse(repairedValue);
    const formatted = JSON.stringify(parsed, null, 2);

    return {
        repaired: formatted,
        statistics: buildStatistics(normalizedInput, formatted, parsed),
        summary : buildRepairSummary(normalizedInput, formatted),

    };
}