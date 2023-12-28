import checkSyntaxRoutes from './checkSyntaxRoutes.js';
import fileRoutes from './fileRoutes.js';

const initRoutes = (app) => {
    app.use('/check', checkSyntaxRoutes);
    app.use('/file', fileRoutes);
}

export default initRoutes;