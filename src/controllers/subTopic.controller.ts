import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateSubTopicDto } from '@dtos/subtopic.dto';
import { CreateUser_SubtopicDto } from '@/dtos/fav-subTopic.dto';
import { SubTopic } from '@interfaces/subTopic.interface';
import { SubTopicService } from '@services/subtopic.service';
import { Card } from '@/interfaces/card.interface';
import { User_Subtopic } from '@/interfaces/fav-subTopic.interface';

export class SubTopicController {
  private subtopic = Container.get(SubTopicService);

  public createSubTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subTopicData: CreateSubTopicDto = req.body;
      const topicId = Number(req.params.topic);
      const createSubTopicData: SubTopic = await this.subtopic.createSubTopic(topicId,subTopicData);

      res.status(201).json({ data: createSubTopicData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subTopicId = Number(req.params.id);
      const subTopicData: CreateSubTopicDto = req.body;
      const updatedSubTopicData: SubTopic = await this.subtopic.updateSubTopic(subTopicId,subTopicData);

      res.status(200).json({ data: updatedSubTopicData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSubTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subTopicId = Number(req.params.id);
      const deleteSubTopicData: SubTopic = await this.subtopic.deleteSubTopic(subTopicId);

      res.status(200).json({ data: deleteSubTopicData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getAllSubTopics = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const allSubTopicData: SubTopic[] = await this.subtopic.getAllSubTopics();

      res.status(200).json({ sub_topics: allSubTopicData});
    } catch (error) {
      next(error);
    }
  };

  public getAllCardsOfASubTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subTopicId = Number(req.params.id);
      const allCardData: Card[] = await this.subtopic.getAllCardsOfASubTopic(subTopicId);

      res.status(200).json({ subtopics_for_the_topic: allCardData});
    } catch (error) {
      next(error);
    }
  };

  
}
