import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateCardDto } from '@dtos/card.dto';
import { Card } from '@interfaces/card.interface';
import { CardService } from '@services/card.service';

export class CardController {
  private card = Container.get(CardService);

  public createCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardData: Card = req.body;
      const subTopicId = Number(req.params.subTopic);
      const createCardData: Card = await this.card.createCard(subTopicId,cardData);

      res.status(201).json({ data: createCardData, message: 'created' });
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
}
