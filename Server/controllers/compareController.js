import {compareJson} from '../services/compareService.js';

export function compareController(req,res) {
    try {
        const {left,right} = req.body;

        if(typeof left !== 'string' || typeof right !== 'string' || !left.trim() || !right.trim()) {
            return res.status(400).json({
                success : false,
                message: 'Both left and right JSON inputs are required.',
                data: {},
            });
        }
        const result = compareJson(left,right);

        return res.json({
            success:true,
            message:'json comparison completed.',
            data: result,
    });
    } catch(error){
        return res.status(400).json({
            success: false,
            message: 'unable to compare the provided JSON.',
            data: {error: error.message},
        });
    }
}