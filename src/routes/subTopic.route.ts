import { Router } from 'express';
import { SubTopicController } from '@controllers/subTopic.controller';
import { CreateSubTopicDto } from '@dtos/subtopic.dto';
import { CreateUser_SubtopicDto } from '@/dtos/fav-subTopic.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminMiddleware } from '@middlewares/admin.middleware';

export class SubTopicRoute implements Routes {
  public path = '/sub-topics';
  public router = Router();
  public subTopic = new SubTopicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
    this.router.get(`${this.path}`, this.subTopic.getAllSubTopics);
    this.router.get(`${this.path}/:id`, this.subTopic.getAllCardsOfASubTopic);
    this.router.post(`${this.path}/:topic`, ValidationMiddleware(CreateSubTopicDto, 'body'),AdminMiddleware, this.subTopic.createSubTopic);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateSubTopicDto, 'body'),AdminMiddleware, this.subTopic.updateTopic);
    this.router.delete(`${this.path}/:id(\\d+)`, AdminMiddleware, this.subTopic.deleteSubTopic);
}
}
