import { Service } from 'typedi';
import { DB } from '@database';
import { HttpException } from '@/exceptions/httpException';
import { Exam } from '@interfaces/exam.interface';
import { Topic } from '@interfaces/topic.interface';
import { SubTopic } from '@interfaces/subTopic.interface';
import { TopicModel } from '@/models/topic.model';
import { Model } from 'sequelize';
import { SubTopicModel } from '@/models/subtopic.model';

@Service()
export class ContentService {

  public async getContent( ): Promise<any[]> { 
    
    const findAllExams: any[] = await DB.Exams.findAll({attributes: ['id','title'],include:[{model:TopicModel,attributes: ['id','title'], include:[{model:SubTopicModel,attributes: ['id','title']}]}]});
    // const findAllTopics: Topic[] = await DB.Topics.findAll();
    // const findAllSubTopics: SubTopic[] = await DB.SubTopics.findAll();

    // const contentMap = {};

    // for(const exam of  findAllExams){
    //     console.log(exam)
    // }

    return findAllExams;
  }

}
