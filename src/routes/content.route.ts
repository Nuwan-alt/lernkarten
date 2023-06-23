import { Router } from 'express';
import { ContentController } from '@controllers/content.controller'
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class ContentRoute implements Routes {
  public path = '/content';
  public router = Router();
  public content = new ContentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,this.content.getAllContent);
    
  }
}
