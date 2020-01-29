import { AuthService } from './../services/auth.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const AuthController = (app: Application) => {

  const authRouter: Router = express.Router();
  const authService = new AuthService();

  authRouter.post('/signup', async (req: Request, res: Response) => {
    const user = req.body;
    try {
      await authService.signup(user);
      res.sendStatus(204);
    } catch (error) {
        res.status(409).send('Erreur lors de l\'inscription');
      }
  });

  authRouter.post('/signin', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const { token, user } = await authService.signIn(email, password);
      res.set('access-control-expose-headers', 'JWT_TOKEN');
      res.set('JWT_TOKEN', token);
      res.send(user);
    } catch (error) {
      if (error.message === 'NOT ACTIVE') {
        res.status(409).send('Le compte n\'est pas activé.');
      } else {
        res.status(400).send('L\'email ou le mot de passe est erroné');
      }
    }
  });

  app.use('/auth', authRouter);
};
