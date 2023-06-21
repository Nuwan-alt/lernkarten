import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateTopicDto } from '@dtos/topic.dto';
import { Topic } from '@interfaces/topic.interface';
import { TopicService } from '@services/topic.service';

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
}
