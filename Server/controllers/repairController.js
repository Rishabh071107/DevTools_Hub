import { repairJson } from '../services/repairService.js';

export function repairController(req , res){
    try{
        const { input } = req.body;

        if(typeof input !== 'string' || !input.trim()) {
             return res.status(400).json({
                success: false,
                message: 'A non empty JSON input is required.',
                data: {},
             });
        }
        const result = repairJson(input);

        return res.json({
            success: true,
            message: 'JSON repaired successfully',
            data: result,
        });
    } catch(error){
        return res.status(400).json({
            success: false,
            message: 'Unable to repair the provided JSON',
            data: {error: error.message},
        });
    }
}