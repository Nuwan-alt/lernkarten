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

export class CardRoute implements Routes {
  public path = '/cards';
  public router = Router();
  public card = new CardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/stage`, ValidationMiddleware(CreateStageDto, 'body'), this.card.setCardStage);
    this.router.post(`${this.path}/fav`, ValidationMiddleware(CreateFavDto, 'body'), this.card.setCardFav);
    this.router.post(`${this.path}/notes`, ValidationMiddleware(CreateNotesDto, 'body'), this.card.setCardNotes);

    this.router.post(`${this.path}/custom/:subTopic`, ValidationMiddleware(CreateCustomCardDto, 'body'), this.card.createCustomCard);
    this.router.post(`${this.path}/:subTopic`, ValidationMiddleware(CreateCardDto, 'body'), this.card.createCard);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateCardDto, 'body', true), this.card.updateCard);
    this.router.delete(`${this.path}/:id(\\d+)`, this.card.deleteCard);
    this.router.get(`${this.path}`,ValidationMiddleware(GetCardDto, 'body'), this.card.getCardById);

    
  }
}
