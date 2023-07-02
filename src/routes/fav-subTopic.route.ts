import { Router } from 'express';
import { User_SubTopicController } from '@/controllers/fav-subTopic.controller';
import { CreateUser_SubtopicDto } from '@/dtos/fav-subTopic.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { UserMiddleware } from '@middlewares/user.middleware';

export class Fav_SubTopicRoute implements Routes {
  public path = '/user-subtopics';
  public router = Router();
  public user_subTopic = new User_SubTopicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.post(`${this.path}`, ValidationMiddleware(CreateUser_SubtopicDto, 'body',true),UserMiddleware, this.user_subTopic.setSubTopicAsFavourite);
    this.router.delete(`${this.path}`,ValidationMiddleware(CreateUser_SubtopicDto, 'body',true),UserMiddleware, this.user_subTopic.removeSubTopicAsFavourite);
    this.router.get(`${this.path}/:id`,this.user_subTopic.getFavSubTopicsByUserId);

  }
}
