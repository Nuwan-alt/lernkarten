import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AuthService } from '@services/auth.service';

export class StrategyAuthController {
  public auth = Container.get(AuthService);


  public google_logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = req.user['email'];
      const { cookie, findUser } = await this.auth.strategy_login(email);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
  public facebook_logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = req.user['emails'][0]['value'];
      const { cookie, findUser } = await this.auth.strategy_login(email);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

}
