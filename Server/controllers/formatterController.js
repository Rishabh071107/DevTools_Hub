import { formatJson }  from '../services/formatterService.js';


export function formatterController(req,res) {
    try{
        const { input, indent = 2 , mode = 'pretty'} = req.body;

        if(typeof input !== 'string' || !input.trim()){
            return res.status(400).json({
                success: false,
                message: 'A non empty json input is required.',
                data: {},
            });
        }
        const formatted = formatJson(input , { indent, mode});

        return res.json({
            success: true,
            message: 'JSON formatted successfully.',
            data: {formatted},
        });
    } catch(error){
        return res.status(400).json({
            success: false,
            message: 'unable to format the provided json',
            data: {error: error.message},
        });
    }
}