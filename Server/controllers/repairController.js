import { repairJson } from '../services/repairService.js';
 

export function repairController(requestAnimationFrame,res){
    try{
        const {input} = req.body ;

        if(typeof input !== 'string' || !input.trim()){
            return res.status(400).json({
                success: false,
                message: 'A non empty json is reuqired.',
                data: {},
            });
        }

        const result = repairJson(input);
        
        return res.json({
            success: true,
            message: 'JSON repaired successfully.',
            data: result,
        });
    }  catch(error){
        return res.status(400).json({
            success: false,
            message: 'unable to repair the provided JSON.',
            data: {error: error.message},
        });
    }
}