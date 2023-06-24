import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import { CreateUser_SubtopicDto } from '@/dtos/fav-subTopic.dto';
import { User_Subtopic } from '@/interfaces/fav-subTopic.interface';
import { User_SubTopicService } from '@/services/fav_subTopic.service';


export class User_SubTopicController {
  private user_subTopic = Container.get(User_SubTopicService);

  public setSubTopicAsFavourite = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("hello")
    // res.status(200).json({msg:'nice'});
    try {
      const favSubTopicData: CreateUser_SubtopicDto = req.body;
      const userSubTopicData: User_Subtopic = await this.user_subTopic.setSubTopicFavourite(favSubTopicData);

      res.status(200).json({ data: userSubTopicData});
    } catch (error) {
      next(error);
    }
  };

  public removeSubTopicAsFavourite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favSubTopicData: CreateUser_SubtopicDto = req.body;
      const userSubTopicData: User_Subtopic = await this.user_subTopic.removeSubTopicFavourite(favSubTopicData);

      res.status(200).json({ data: userSubTopicData, message: 'set as not favourite one'});
    } catch (error) {
      next(error);
    }
  };

  public getFavSubTopicsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const userSubTopicsData: User_Subtopic[] = await this.user_subTopic.getFavSubTopicByUserID(userId);

      res.status(200).json({ sub_topics: userSubTopicsData, message: 'Sub-Topics for this user'});
    } catch (error) {
      next(error);
    }
  };
}
