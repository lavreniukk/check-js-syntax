import express from 'express';
import initRoutes from './routes/routes.js';

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
