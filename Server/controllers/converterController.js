import {convertContent} from '../services/converterService.js';

export function convertController(req, res) {
    try{
        const {input, fromFormat , toFormat} = req.body;

        if(typeof input !== 'string' || !input.trim()){
            return res.status(400).json({
                success: false,
                message: 'Input content is required.',
                data: {},
            });
        }

        if(!fromFormat || !toFormat){
            return res.status(400).json({
                success: false,
                message: 'souurce and target formats are required.',
                data: {},
            });
        }
        const result = convertContent(input, fromFormat, toFormat);
        return res.json({
            success: true ,
            message:  'content converted successfully.',
            data: result,
        });
    }  catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'conversion failed.',
            data: {},
        });
    }
}