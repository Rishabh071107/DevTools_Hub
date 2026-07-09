import { validateJson } from '../services/validatorService.js'

export function validatorController(req , res) {
    try {
        const { input } = req.body ;

        if(typeof input !== 'string' || !input.trim()){
            return res.status(400).json({
                success: false,
                message: 'A non empty JSON input is required',
                data: {},
            });
        }
        const result = validateJson(input);

       return res.json({
        success: true,
        message: result.isValid ? 'JSON is valid.' : 'JSON is invalid.',
        data: result,
       });
    } catch(error){
        return res.status(400).json({
            success: false,
            message: 'Unable to validate the provided JSON.',
            data: { error: error.message },
        });
    }
}