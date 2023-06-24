import { Service } from 'typedi';
import { DB } from '@database';
import { CreateSubTopicDto } from '@dtos/subtopic.dto';
import { CreateUser_SubtopicDto } from '@/dtos/fav-subTopic.dto';
import { HttpException } from '@/exceptions/httpException';
import { SubTopic } from '@interfaces/subTopic.interface';
import { Topic } from '@interfaces/topic.interface';
import { Card } from '@/interfaces/card.interface';
import { User_Subtopic } from '@/interfaces/fav-subTopic.interface';
import { User } from '@/interfaces/users.interface';
import { where } from 'sequelize';

@Service() 
export class SubTopicService {

  public async createSubTopic(topicId:number, subTopicData: CreateSubTopicDto): Promise<SubTopic> {
    const findTopic: Topic = await DB.Topics.findOne({ where: { id: topicId} });
    if (!findTopic) throw new HttpException(409, `There is no topic for this id : ${topicId}`);
    
    const findSubTopic: SubTopic = await DB.SubTopics.findOne({ where: { title: subTopicData.title} });
    if (findSubTopic) throw new HttpException(409, `SubTopic : ${subTopicData.title} already exists`);

    const createSubTopicData: SubTopic = await DB.SubTopics.create({...subTopicData, topic_id:topicId});
    return createSubTopicData;
  }

  public async updateSubTopic(subTopicId: number, subTopicData: CreateSubTopicDto): Promise<SubTopic> {
    const findSubTopic: SubTopic = await DB.SubTopics.findByPk(subTopicId);
    if (!findSubTopic) throw new HttpException(409, "SubTopic doesn't exist");

    await DB.SubTopics.update(subTopicData, { where: { id: subTopicId } });

    const updateSubTopic: SubTopic = await DB.SubTopics.findByPk(subTopicId);
    return updateSubTopic;
  }

  public async deleteSubTopic(subTopicId: number): Promise<SubTopic> {
    const findSubTopic: SubTopic = await DB.SubTopics.findByPk(subTopicId);
    if (!findSubTopic) throw new HttpException(409, "Topic doesn't exist");

    await DB.SubTopics.destroy({ where: { id: subTopicId } });

    return findSubTopic;
  }

  public async getAllSubTopics(): Promise<SubTopic[]> {
    
    const allSubTopics: SubTopic[] = await DB.SubTopics.findAll({attributes:['id','title']});
    if (!allSubTopics) throw new HttpException(409, "SubTopics not found");
    return allSubTopics;
  }

  public async getAllCardsOfASubTopic(subTopicId:number): Promise<Card[]> {
    
    const allCards: Card[] = await DB.Cards.findAll({where:{subtopic_id:subTopicId},attributes:['id']});
    if (!allCards) throw new HttpException(409, "Cards not found");

    return allCards;
  }

  


}
