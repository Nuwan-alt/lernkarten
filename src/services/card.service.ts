import { Service } from 'typedi';
import { DB } from '@database';
import { CreateCardDto } from '@dtos/card.dto';
import { CreateFavDto } from '@dtos/manageFavOfCard.dto';
import { CreateNotesDto } from '@dtos/manageNotesOfCard.dto';
import { CreateStageDto } from '@dtos/manageStageOfCard.dto';
import { CreateCustomCardDto } from '@dtos/customCard.dto';
import { GetCardDto } from '@dtos/getCards.dto';
import { HttpException } from '@/exceptions/httpException';
import { SubTopic } from '@interfaces/subTopic.interface';
import { Card } from '@interfaces/card.interface';
import { User_Card } from '@interfaces/user-card.interface';
import { CustomCard } from '@interfaces/customCard.interface';
import { User } from '@/interfaces/users.interface';
import { where } from 'sequelize';

@Service() 
export class CardService {

  public async createCard(subTopicId:number, cardData: CreateCardDto): Promise<Card> {
    const findSubTopic: SubTopic = await DB.SubTopics.findOne({ where: { id: subTopicId} });
    if (!findSubTopic) throw new HttpException(409, `There is no sub-topic for this id : ${subTopicId}`);

    const createCatdData: Card = await DB.Cards.create({...cardData, subtopic_id:subTopicId, isCustom:false});
    return createCatdData;
  }

  public async createCustomCard(subTopicId:number, cardData: CreateCustomCardDto): Promise<Card> {
    const findSubTopic: SubTopic = await DB.SubTopics.findOne({ where: { id: subTopicId} });
    if (!findSubTopic) throw new HttpException(409, `There is no sub-topic for this id : ${subTopicId}`);

    const user: User = await DB.Users.findByPk(cardData.user_id);
    if (!user) throw new HttpException(409, `User doesn't exists`);

    const createdCarddData: Card = await DB.Cards.create({subtopic_id:subTopicId,question:cardData.question, answer:cardData.answer, isCustom:true});
    const customCard = await DB.CustomCard.create({user_id:cardData.user_id, card_id:createdCarddData.id})
    return createdCarddData;
  }

  public async updateCard(cardId: number, cardData: CreateCardDto): Promise<Card> {
    const findCard: Card = await DB.Cards.findByPk(cardId);
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    await DB.Cards.update(cardData, { where: { id: cardId } });

    const updateCardData: Card = await DB.Cards.findByPk(cardId);
    return updateCardData;
  }
  public async updateCustomCard(cardId: number, cardData: CreateCardDto): Promise<Card> {
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
  public async deleteCustomCard(cardId: number): Promise<Card> {
    const findCard: Card = await DB.Cards.findByPk(cardId);
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    await DB.Cards.destroy({ where: { id: cardId } });

    return findCard;
  }

  public async getCardById(cardData: GetCardDto): Promise<Card> {

    const findCard: Card = await DB.Cards.findByPk(cardData.card_id);
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    if(findCard.isCustom){
      const findCustomCard: CustomCard = await DB.CustomCard.findOne({where:{card_id:findCard.id}});
      if(findCustomCard.user_id != cardData.user_id){
        throw new HttpException(409, "This is a custom card and not belongs to this user.");
      }
    }
    return findCard;
  }

  public async setStage(stageData: CreateStageDto): Promise<User_Card> {

    const findCard: Card = await DB.Cards.findByPk(stageData.card_id);
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    const finduser: User = await DB.Users.findByPk(stageData.user_id);
    if (!finduser) throw new HttpException(409, "User doesn't exist");

    const user_card = await DB.User_Card.findOne({where:{user_id:stageData.user_id, card_id:stageData.card_id}})

    if(!user_card){
      await DB.User_Card.create({...stageData, isFavourite:false, notes:""})
    }else{
      await DB.User_Card.update({stage:stageData.stage},{where:{user_id:stageData.user_id, card_id:stageData.card_id}})
    }

    const updatedData:User_Card = await DB.User_Card.findOne({where:{user_id:stageData.user_id, card_id:stageData.card_id}})

    return updatedData;
  }

  public async setFavourite(favData: CreateFavDto): Promise<User_Card> {

    const findCard: Card = await DB.Cards.findByPk(favData.card_id); 
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    const finduser: User = await DB.Users.findByPk(favData.user_id);
    if (!finduser) throw new HttpException(409, "User doesn't exist");

    const user_card = await DB.User_Card.findOne({where:{user_id:favData.user_id, card_id:favData.card_id}})

    if(!user_card){
      await DB.User_Card.create({...favData, stage:0, notes:""})
    }else{
      await DB.User_Card.update({isFavourite:favData.isFavourite},{where:{user_id:favData.user_id, card_id:favData.card_id}})
    }

    const updatedData:User_Card = await DB.User_Card.findOne({where:{user_id:favData.user_id, card_id:favData.card_id}})

    return updatedData;
  }

  public async setNotes(noteData: CreateNotesDto): Promise<User_Card> {

    const findCard: Card = await DB.Cards.findByPk(noteData.card_id); 
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    const finduser: User = await DB.Users.findByPk(noteData.user_id);
    if (!finduser) throw new HttpException(409, "User doesn't exist");

    const user_card = await DB.User_Card.findOne({where:{user_id:noteData.user_id, card_id:noteData.card_id}})

    if(!user_card){
      await DB.User_Card.create({...noteData, stage:0, isFavourite:false})
    }else{
      await DB.User_Card.update({notes:noteData.notes},{where:{user_id:noteData.user_id, card_id:noteData.card_id}})
    }

    const updatedData:User_Card = await DB.User_Card.findOne({where:{user_id:noteData.user_id, card_id:noteData.card_id}})

    return updatedData;
  }


}
