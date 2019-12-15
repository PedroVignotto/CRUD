import { Router } from 'express';

import DoctorController from './app/controllers/DoctorController';
import SpecialtyController from './app/controllers/SpecialtyController';

const routes = new Router();

routes.get('/doctors', DoctorController.index);
routes.get('/doctors/:id', DoctorController.show);
routes.post('/doctors/new', DoctorController.store);
routes.put('/doctors/edit/:id', DoctorController.update);
routes.delete('/doctors/delete/:id', DoctorController.delete);

routes.get('/specialties', SpecialtyController.index);

export default routes;
