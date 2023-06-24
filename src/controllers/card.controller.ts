import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateCardDto } from '@dtos/card.dto';
import { CreateCustomCardDto } from '@dtos/customCard.dto';
import { Card } from '@interfaces/card.interface';
import { User_Card } from '@interfaces/user-card.interface';
import { CardService } from '@services/card.service';

export class CardController {
  private card = Container.get(CardService);

  public createCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardData: CreateCardDto = req.body;
      const subTopicId = Number(req.params.subTopic);
      const createCardData: Card = await this.card.createCard(subTopicId,cardData);

      res.status(201).json({ data: createCardData, message: 'card created' });
    } catch (error) {
      next(error);
    }
  };

  public createCustomCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardData: CreateCustomCardDto = req.body;
      const subTopicId = Number(req.params.subTopic);
      const createCardData: Card = await this.card.createCustomCard(subTopicId,cardData);

      res.status(201).json({ data: createCardData, message: 'custom-card created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.id);
      const cardData: CreateCardDto = req.body;
      const updatedCardData: Card = await this.card.updateCard(cardId,cardData);

      res.status(200).json({ data: updatedCardData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.id);
      const deleteCardData: Card = await this.card.deleteCard(cardId)

      res.status(200).json({ data: deleteCardData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getCardById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardData = req.body;
      const selectedCardData: Card = await this.card.getCardById(cardData);

      res.status(200).json({ card: selectedCardData });
    } catch (error) {
      next(error);
    }
  };

  public setCardStage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stageData = req.body;
      const selectedCardData: User_Card = await this.card.setStage(stageData);

      res.status(200).json({ data: selectedCardData, message: 'stage updated' });
    } catch (error) {
      next(error);
    }
  };

  public setCardFav = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favData = req.body;
      const selectedCardData: User_Card = await this.card.setFavourite(favData);

      res.status(200).json({ data: selectedCardData, message: 'favourite status updated' });
    } catch (error) {
      next(error);
    }
  };

  public setCardNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteData = req.body;
      const selectedCardData: User_Card = await this.card.setNotes(noteData);

      res.status(200).json({ data: selectedCardData, message: 'notes updated' });
    } catch (error) {
      next(error);
    }
  };

}
