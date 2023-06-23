import { Service } from 'typedi';
import { DB } from '@database';
import { CreateCardDto } from '@dtos/card.dto';
import { HttpException } from '@/exceptions/httpException';
import { SubTopic } from '@interfaces/subTopic.interface';
import { Card } from '@interfaces/card.interface';

@Service() 
export class CardService {

  public async createCard(subTopicId:number, cardData: CreateCardDto): Promise<Card> {
    const findSubTopic: SubTopic = await DB.SubTopics.findOne({ where: { id: subTopicId} });
    if (!findSubTopic) throw new HttpException(409, `There is no sub-topic for this id : ${subTopicId}`);
    
    // const findCard: Card = await DB.Cards.findOne({ where: { question: cardData.question} });
    // if (findCard) throw new HttpException(409, `Card for : ${cardData.question} already exists`);

    const createCatdData: Card = await DB.Cards.create({...cardData, subtopic_id:subTopicId});
    return createCatdData;
  }

  public async updateCard(cardId: number, cardData: CreateCardDto): Promise<Card> {
    const findCard: Card = await DB.Cards.findByPk(cardId);
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    await DB.Cards.update(cardData, { where: { id: cardId } });

    const updateCardData: Card = await DB.Cards.findByPk(cardId);
    return updateCardData;
  }

  public async deleteCard(cardId: number): Promise<Card> {
    const findCard: Card = await DB.Cards.findByPk(cardId);
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    await DB.Cards.destroy({ where: { id: cardId } });

    return findCard;
  }
}
