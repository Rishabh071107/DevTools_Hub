    import express from 'express';
    import cors from 'cors';
    import dotenv from 'dotenv';
    import helmet from 'helmet';
    import morgan from 'morgan';
    import repairRoutes from './routes/repairRoutes.js'
    import formatterRoutes from './routes/formatterRoutes.js';
    import validatorRoutes from './routes/validatorRoutes.js';
    import compareRoutes from './routes/compareRoutes.js';
    import converterRoutes from './routes/converterRoutes.js';
    
    dotenv.config();

    const app = express();
    const port = process.env.PORT || 5000;

    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.json({limit: '5mb'}));

    app.get('/health',(_req,res) => {
        res.json({
            success: true,
            message: 'server is healthy',
            data : {status: 'ok'},
        });
    });


  app.get('/api/health',(_req,res) =>{
    res.json({
        success : true,
        message : 'api is healthy',
        data:{ status : 'ok'},
    })
  })
   
    app.use('/api', repairRoutes);
    app.use('/api', validatorRoutes);
    app.use('/api', compareRoutes);
    app.use('/api', converterRoutes);
    app.use('/api',formatterRoutes );

    app.listen(port, () =>{
        console.log(`server listening on port ${port}`);
    })