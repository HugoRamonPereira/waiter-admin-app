import express  from 'express';
import mongoose from 'mongoose';
import path from 'node:path';

import { router } from './router';

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port  = 3001;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port} ✅`);
    });
  })
  .catch(() => console.log('Error'));



