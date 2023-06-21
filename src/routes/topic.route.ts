import { Router } from 'express';
import { TopicController } from '@controllers/topic.controller';
import { CreateTopicDto } from '@dtos/topic.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class TopicRoute implements Routes {
  public path = '/topics';
  public router = Router();
  public topic = new TopicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:exam`, ValidationMiddleware(CreateTopicDto, 'body'), this.topic.createTopic);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateTopicDto, 'body', true), this.topic.updateTopic);
    this.router.delete(`${this.path}/:id(\\d+)`, this.topic.deleteTopic);
  }
}
