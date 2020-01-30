import express, { Router, Request, Response, Application } from 'express';
import { UserService } from '../services/user.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const UserController = (app: Application) => {

    const userRouter: Router = express.Router();
    const userService = new UserService();

    userRouter.get('/', async (req: Request, res: Response) => {
        res.send(await userService.getAll());
    });

    userRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        res.send(await userService.getById(id));
    });

    userRouter.post('/', async (req: Request, res: Response) => {
        const user = req.body;
        res.send(await userService.create(user));
    });

    // userRouter.put('/:id', (req: Request, res: Response) => {
    //     const id = parseInt(req.params.id, 10);
    //     const comment = req.body;
    //     // console.log(comment);
    //     userService.update(comment, id);
    //     res.send(comment);
    // });

    userRouter.post('/representation', async (req: Request, res: Response) => {
        const userId = parseInt(req.body.userId, 10);
        const representationId = parseInt(req.body.representationId, 10);
        res.send(await userService.addRepresentationToUser(userId, representationId));
      });

    app.use('/users', userRouter);
};
