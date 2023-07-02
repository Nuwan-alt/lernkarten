import { Router } from 'express';
import { CardController } from '@controllers/card.controller';
import { CreateCardDto } from '@dtos/card.dto';
import { CreateCustomCardDto } from '@dtos/customCard.dto';
import { GetCardDto } from '@dtos/getCards.dto';
import { CreateStageDto } from '@dtos/manageStageOfCard.dto';
import { CreateFavDto } from '@dtos/manageFavOfCard.dto';
import { CreateNotesDto } from '@dtos/manageNotesOfCard.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminMiddleware } from '@middlewares/admin.middleware';
import { UserMiddleware } from '@middlewares/user.middleware';

export class CardRoute implements Routes {
  public path = '/cards';
  public router = Router();
  public card = new CardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/stage`, ValidationMiddleware(CreateStageDto, 'body'),UserMiddleware, this.card.setCardStage);
    this.router.post(`${this.path}/fav`, ValidationMiddleware(CreateFavDto, 'body'),UserMiddleware, this.card.setCardFav);
    this.router.post(`${this.path}/notes`, ValidationMiddleware(CreateNotesDto, 'body'),UserMiddleware, this.card.setCardNotes);

    this.router.post(`${this.path}/custom/:subTopic`, ValidationMiddleware(CreateCustomCardDto, 'body'),UserMiddleware, this.card.createCustomCard);
    this.router.post(`${this.path}/:subTopic`, ValidationMiddleware(CreateCardDto, 'body'),AdminMiddleware, this.card.createCard);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateCardDto, 'body', true),AdminMiddleware, this.card.updateCard);
    this.router.delete(`${this.path}/:id(\\d+)`,AdminMiddleware, this.card.deleteCard);
    this.router.get(`${this.path}`,ValidationMiddleware(GetCardDto, 'body'), this.card.getCardById);

    
  }
}
