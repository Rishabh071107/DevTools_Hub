import { parse } from 'jsonc-parser';


const errorMessages = {
    1: 'Invalid symbol',
    2: 'Invalid Number format',
    3: 'property name expected here',
    4: 'value expected',
    5: 'colon expected',
    6: 'Comma expected',
    7: 'Closing brace expected',
    8: 'Closing bracket expected',
    9: 'End of file expected',
    10: 'Invalid comment token',
    11: 'Unexpected end of comment',
    12: 'Unexpected end of string template',
    13: 'Unexpected end of string',
    14: 'Invalid unicode',
    15: 'Invalid escape character',
    16: 'Invalid character',
}

function offsetToLineColumn(text , offset) {
    let line = 1;
    let column = 1 ;
    for ( let i=0 ; i < offset && i<text.length;i++){
       if(text[i] === '\n'){
        line++;
        column = 1 ;
       } 
       else if(text[i] !== '\r'){
        column++;
       }
    }
    return {line ,  column} ; 
}

export function validateJson(input) {
    const errors = [];
    const parsed = parse(input , errors);

    if(errors.length > 0) {
        const firstError = errors[0];
        const {line , column} = offsetToLineColumn(input, firstError?.offset ?? 0);
        const errorLabel = errorMessages[firstError?.error] ?? 'syntax error' ;

        return {
            isValid: false ,
            message: 'The provided JSON is invalid.',
            line,
            column,
            error : errorLabel,
        }
    }
      if (parsed === undefined) {
    return {
      isValid: false,
      message: 'The provided JSON is invalid.',
      line: 1,
      column: 1,
      error: 'Empty input',
    };
  }

  return {
    isValid: true,
    message: 'The provided JSON is valid.',
    line: null,
    column: null,
    error: null,
  };
}
