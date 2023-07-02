import { Router } from 'express';
import { ArticleController } from '@controllers/article.controller';
import { CreateArticledDto } from '@dtos/article.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminMiddleware } from '@middlewares/admin.middleware';

export class ArticleRoute implements Routes {
  public path = '/articles';
  public router = Router();
  public article = new ArticleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateArticledDto, 'body'),AdminMiddleware, this.article.createArticle);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateArticledDto, 'body', true),AdminMiddleware, this.article.updateArticle);
    this.router.delete(`${this.path}/:id(\\d+)`,AdminMiddleware, this.article.deleteArticle);
  }
}
