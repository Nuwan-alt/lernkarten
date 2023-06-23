import { Router } from 'express';
import { CardController } from '@controllers/card.controller';
import { CreateCardDto } from '@dtos/card.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class CardRoute implements Routes {
  public path = '/cards';
  public router = Router();
  public card = new CardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:subTopic`, ValidationMiddleware(CreateCardDto, 'body'), this.card.createCard);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateCardDto, 'body', true), this.card.updateCard);
    this.router.delete(`${this.path}/:id(\\d+)`, this.card.deleteCard);
  }
}
