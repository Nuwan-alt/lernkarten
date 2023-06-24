import { Service } from 'typedi';
import { DB } from '@database';
import { CreateTopicDto } from '@dtos/topic.dto';
import { HttpException } from '@/exceptions/httpException';
import { Exam } from '@interfaces/exam.interface';
import { Topic } from '@interfaces/topic.interface';
import { SubTopic } from '@/interfaces/subTopic.interface';

@Service()
export class TopicService {

  public async createTopic(examId:number, topicData: CreateTopicDto): Promise<Topic> {
    const findExam: Exam = await DB.Exams.findOne({ where: { id: examId} });
    if (!findExam) throw new HttpException(409, `There is no exam for this id : ${examId}`);
    
    const findTopic: Topic = await DB.Topics.findOne({ where: { title: topicData.title} });
    if (findTopic) throw new HttpException(409, `Title : ${topicData.title} already exists`);

    const createTopicData: Topic = await DB.Topics.create({...topicData, exam_id:examId});
    return createTopicData;
  }

  public async updateTopic(topicId: number, topicData: CreateTopicDto): Promise<Topic> {
    const findTopic: Topic = await DB.Topics.findByPk(topicId);
    if (!findTopic) throw new HttpException(409, "Topic doesn't exist");

    await DB.Topics.update(topicData, { where: { id: topicId } });

    const updateTopic: Topic = await DB.Topics.findByPk(topicId);
    return updateTopic;
  }

  public async deleteTopic(topicId: number): Promise<Topic> {
    const findTopic: Topic = await DB.Topics.findByPk(topicId);
    if (!findTopic) throw new HttpException(409, "Topic doesn't exist");

    await DB.Topics.destroy({ where: { id: topicId } });

    return findTopic;
  }

  public async getAllTopics(): Promise<Topic[]> {
    
    const allTopics: Topic[] = await DB.Topics.findAll({attributes:['id','title']});
    if (!allTopics) throw new HttpException(409, "Topics not found");
    return allTopics;
  }

  public async getAllSubTopicsOfATopic(topicId:number): Promise<SubTopic[]> {
    
    const allSubTopics: SubTopic[] = await DB.SubTopics.findAll({where:{topic_id:topicId},attributes:['id','title']});
    if (!allSubTopics) throw new HttpException(409, "SubTopics not found");

    return allSubTopics;
  }
}
