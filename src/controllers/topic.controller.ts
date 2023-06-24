import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateTopicDto } from '@dtos/topic.dto';
import { Topic } from '@interfaces/topic.interface';
import { TopicService } from '@services/topic.service';
import { SubTopic } from '@/interfaces/subTopic.interface';

export class TopicController {
  private topic = Container.get(TopicService);

  public createTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicData: CreateTopicDto = req.body;
      const examId = Number(req.params.exam);
      const createTopicData: Topic = await this.topic.createTopic(examId,topicData);

      res.status(201).json({ data: createTopicData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicId = Number(req.params.id);
      const topicData: CreateTopicDto = req.body;
      const updatedTopicData: Topic = await this.topic.updateTopic(topicId,topicData);

      res.status(200).json({ data: updatedTopicData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicId = Number(req.params.id);
      const deleteTopicData: Topic = await this.topic.deleteTopic(topicId);

      res.status(200).json({ data: deleteTopicData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getAllTopics = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const allTopicData: Topic[] = await this.topic.getAllTopics();

      res.status(200).json({ topics: allTopicData});
    } catch (error) {
      next(error);
    }
  };

  public getAllSubTopicsOfATopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicId = Number(req.params.id);
      const allSubTopicData: SubTopic[] = await this.topic.getAllSubTopicsOfATopic(topicId);

      res.status(200).json({ subtopics_for_the_topic: allSubTopicData});
    } catch (error) {
      next(error);
    }
  };
}
