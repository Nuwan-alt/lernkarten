import { Router } from 'express';
import { TopicController } from '@controllers/topic.controller';
import { CreateTopicDto } from '@dtos/topic.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminMiddleware } from '@middlewares/admin.middleware';

export class TopicRoute implements Routes {
  public path = '/topics';
  public router = Router();
  public topic = new TopicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.topic.getAllTopics);
    this.router.get(`${this.path}/:id`, this.topic.getAllSubTopicsOfATopic);
    this.router.post(`${this.path}/:exam`, ValidationMiddleware(CreateTopicDto, 'body'),AdminMiddleware, this.topic.createTopic);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateTopicDto, 'body', true),AdminMiddleware, this.topic.updateTopic);
    this.router.delete(`${this.path}/:id(\\d+)`,AdminMiddleware, this.topic.deleteTopic);
  }
}
