import { RepresentationService } from './../services/representation.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const RepresentationController = (app: Application) => {

    const representationRouter: Router = express.Router();
    const representationService = new RepresentationService();

    representationRouter.get('/', async (req: Request, res: Response) => {
        res.send(await representationService.getAll());
    });

    representationRouter.get('/forMember', async (req: Request, res: Response) => {
        res.send(await representationService.getForAllMember());
    });

    representationRouter.post('/', async (req: Request, res: Response) => {
        const representation = req.body;
        res.send(await representationService.create(representation));
    });

    representationRouter.put('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const comment = req.body;
        representationService.update(comment, id);
        res.send(comment);
    });

    representationRouter.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        representationService.delete(id);
    });

    app.use('/representations', representationRouter);
};
